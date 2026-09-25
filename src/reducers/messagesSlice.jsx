import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialState = {
  messages: {},
  isMessagesLoading: false,
  isMessagesError: false,
  errorMessages: null,
  totalUnreadMsgs: 0,
  activeChatFriendId: null,
};

export const getMessages = createAsyncThunk(
  "GET_MESSAGES",
  async (_, thunkAPI) => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      return thunkAPI.rejectWithValue(
        "No authenticated user."
      );
    }

    try {
      const res = await axiosWithAuth().get(
        `${import.meta.env.VITE_APP_URL
        }/auth/message/listmessages?userid=${userId}`
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
        "Unable to load messages."
      );
    }
  }
);

export const getMessagesBetweenTwoUsers = createAsyncThunk(
  "GET_MESSAGES_BETWEEN_TWO",
  async (friendId, thunkAPI) => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      return thunkAPI.rejectWithValue(
        "No authenticated user."
      );
    }

    if (!friendId) {
      return thunkAPI.rejectWithValue(
        "A friend must be selected."
      );
    }

    try {
      const res = await axiosWithAuth().get(
        `${import.meta.env.VITE_APP_URL
        }/auth/message?friendid=${friendId}&userid=${userId}`
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
        "Unable to load conversation."
      );
    }
  }
);

export const messageRead = createAsyncThunk("OPEN_UNREAD_MESSAGES", async (payload, thunkAPI) => {
  try {
    await axiosWithAuth().put(
      `${import.meta.env.VITE_APP_URL}/auth/message/openmessages`,
      payload.data
    );
    return payload;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Error");
  }
});

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    friendshipAcceptedLive: (state, action) => {
      const { otherUserId } = action.payload;

      const thread =
        state.messages?.data?.[String(otherUserId)] ||
        state.messages?.[String(otherUserId)];

      if (thread) {
        thread.areFriend = true;
      }
    },

    friendshipDeletedLive: (state, action) => {
      const { otherUserId } = action.payload;

      const thread =
        state.messages?.data?.[String(otherUserId)] ||
        state.messages?.[String(otherUserId)];

      if (thread) {
        thread.areFriend = false;
      }
    },

    setActiveChat: (state, action) => {
      state.activeChatFriendId = action.payload ? String(action.payload) : null;
    },
    clearActiveChat: (state) => {
      state.activeChatFriendId = null;
    },

    addIncomingMessage: (state, action) => {
      const msg = { ...action.payload };
      const myId = Number(localStorage.getItem("id"));

      const friendId = String(
        Number(msg.senderId) === myId
          ? msg.receiverId
          : msg.senderId
      );

      if (!state.messages) {
        state.messages = {};
      }

      if (!state.messages[friendId]) {
        state.messages[friendId] = {
          friend: {
            id: Number(friendId),
          },
          numberOfMsgUnread: 0,
          messages: [],
        };
      }

      const thread = state.messages[friendId];

      if (!Array.isArray(thread.messages)) {
        thread.messages = [];
      }
      if (msg.clientId) {
        const optimisticIndex = thread.messages.findIndex(
          (message) =>
            message.clientId === msg.clientId ||
            message.id === `temporary-${msg.clientId}`
        );

        if (optimisticIndex !== -1) {
          thread.messages[optimisticIndex] = msg;
          return;
        }
      }
      if (
        msg.id &&
        thread.messages.some(
          (message) => String(message.id) === String(msg.id)
        )
      ) {
        return;
      }

      const chatOpen =
        String(state.activeChatFriendId) === friendId;

      if (
        chatOpen &&
        Number(msg.receiverId) === myId
      ) {
        msg.isRead = true;
        thread.numberOfMsgUnread = 0;
      } else if (
        !chatOpen &&
        Number(msg.receiverId) === myId &&
        msg.isRead === false
      ) {
        thread.numberOfMsgUnread =
          (thread.numberOfMsgUnread || 0) + 1;

        state.totalUnreadMsgs =
          (state.totalUnreadMsgs || 0) + 1;
      }

      thread.messages.push(msg);
    },

    markThreadRead: (state, action) => {
      const friendId = String(action.payload);
      if (state.messages?.[friendId]) {
        state.messages[friendId].numberOfMsgUnread = 0;
      }
    },

    userBlockedMessageLive: (state, action) => {
      const {
        blockerId,
        blockedId,
      } = action.payload;

      const currentUserId = Number(
        localStorage.getItem("id")
      );

      const otherUserId =
        currentUserId === Number(blockerId)
          ? Number(blockedId)
          : Number(blockerId);

      const friendId = String(
        otherUserId
      );

      if (state.messages?.[friendId]) {
        state.messages[friendId].blocked = true;
        state.messages[friendId].areFriend = false;
      }

      if (
        state.messages?.data?.[friendId]
      ) {
        state.messages.data[
          friendId
        ].blocked = true;

        state.messages.data[
          friendId
        ].areFriend = false;
      }
    },

    userUnblockedMessageLive: (state, action) => {
      const {
        blockerId,
        blockedId,
      } = action.payload;

      const currentUserId = Number(
        localStorage.getItem("id")
      );

      const otherUserId =
        currentUserId === Number(blockerId)
          ? Number(blockedId)
          : Number(blockerId);

      const friendId = String(otherUserId);

      if (state.messages?.[friendId]) {
        state.messages[friendId].blocked = false;
      }

      if (state.messages?.data?.[friendId]) {
        state.messages.data[
          friendId
        ].blocked = false;
      }
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.isMessagesLoading = true;
        state.isMessagesError = false;
        state.errorMessages = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload?.data || {};
        state.totalUnreadMsgs = action.payload?.totalUnreadMsgs || 0;
        state.isMessagesLoading = false;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isMessagesLoading = false;
        state.isMessagesError = true;
        state.errorMessages = action.payload;
      })

      .addCase(getMessagesBetweenTwoUsers.pending, (state) => {
        state.isMessagesLoading = true;
        state.isMessagesError = false;
        state.errorMessages = null;
      })
      .addCase(
        getMessagesBetweenTwoUsers.fulfilled,
        (state, action) => {

          console.log(action.payload, action.meta.arg)
          state.isMessagesLoading = false;

          const friendId = String(
            action.meta.arg
          );

          if (!state.messages[friendId]) {
            return;
          }

          state.messages[friendId].messages =
            action.payload?.messages || [];

          state.messages[friendId].areFriend =
            Boolean(action.payload?.areFriend);

          state.messages[friendId].blocked =
            Boolean(action.payload?.blocked);
        }
      )
      .addCase(getMessagesBetweenTwoUsers.rejected, (state, action) => {
        console.log("sdefs")
        state.isMessagesLoading = false;
        state.isMessagesError = true;
        state.errorMessages = action.payload;
      })

      .addCase(messageRead.fulfilled, (state, action) => {
        const myId = Number(localStorage.getItem("id"));
        const friendId = String(action.payload.data.friendId);
        const thread = state.messages?.[friendId];
        if (!thread) return;
        thread.numberOfMsgUnread = 0;
        if (Array.isArray(thread.messages)) {
          thread.messages = thread.messages.map((m) =>
            m.receiverId === myId ? { ...m, isRead: true } : m
          );
        }

        let total = 0;
        Object.values(state.messages || {}).forEach((t) => (total += t?.numberOfMsgUnread || 0));
        state.totalUnreadMsgs = total;
      });
  },
});

export const {
  friendshipAcceptedLive,
  friendshipDeletedLive,
  addIncomingMessage,
  setActiveChat,
  clearActiveChat,
  markThreadRead,
  userBlockedMessageLive,
  userUnblockedMessageLive
} =
  messagesSlice.actions;

export default messagesSlice.reducer;
