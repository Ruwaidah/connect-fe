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

export const getMessages = createAsyncThunk("GET_MESSAGES", async (_, thunkAPI) => {
  try {
    const res = await axiosWithAuth().get(
      `${import.meta.env.VITE_APP_URL}/auth/message/listmessages?userid=${localStorage.getItem("id")}`
    );
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Error");
  }
});

export const getMessagesBetweenTwoUsers = createAsyncThunk(
  "GET_MESSAGES_BETWEEN_TWO",
  async (friendId, thunkAPI) => {
    try {
      const res = await axiosWithAuth().get(
        `${import.meta.env.VITE_APP_URL}/auth/message?friendid=${friendId}&&userid=${localStorage.getItem("id")}`
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error");
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
    setActiveChat: (state, action) => {
      state.activeChatFriendId = action.payload ? String(action.payload) : null;
    },
    clearActiveChat: (state) => {
      state.activeChatFriendId = null;
    },

    addIncomingMessage: (state, action) => {
      const msg = { ...action.payload };
      const myId = Number(localStorage.getItem("id"));
      const friendId = String(msg.senderId === myId ? msg.receiverId : msg.senderId);

      if (!state.messages) state.messages = {};
      if (!state.messages[friendId]) {
        state.messages[friendId] = { friend: { id: Number(friendId) }, numberOfMsgUnread: 0, messages: [] };
      }

      const thread = state.messages[friendId];
      thread.messages ||= [];

      // dedupe
      if (msg.id && thread.messages.some((m) => m.id === msg.id)) return;

      const chatOpen = String(state.activeChatFriendId) === friendId;

      if (chatOpen && msg.receiverId === myId) {
        msg.isRead = true;
        thread.numberOfMsgUnread = 0;
      } else if (!chatOpen && msg.receiverId === myId && msg.isRead === false) {
        thread.numberOfMsgUnread = (thread.numberOfMsgUnread || 0) + 1;
        state.totalUnreadMsgs = (state.totalUnreadMsgs || 0) + 1;
      }

      thread.messages.push(msg);
    },

    markThreadRead: (state, action) => {
      const friendId = String(action.payload);
      if (state.messages?.[friendId]) {
        state.messages[friendId].numberOfMsgUnread = 0;
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
      .addCase(getMessagesBetweenTwoUsers.fulfilled, (state, action) => {
        state.isMessagesLoading = false;

        const friendId = String(action.payload.friend.id);

        if (!state.messages[friendId]) {
          state.messages[friendId] = {
            friend: action.payload.friend,
            numberOfMsgUnread: action.payload.numberOfMsgUnread || 0,
            messages: [],
          };
        }

        state.messages[friendId].friend = action.payload.friend;
        state.messages[friendId].messages = action.payload.messages || [];
        state.messages[friendId].numberOfMsgUnread = action.payload.numberOfMsgUnread || 0;
      })
      .addCase(getMessagesBetweenTwoUsers.rejected, (state, action) => {
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

export const { addIncomingMessage, setActiveChat, clearActiveChat, markThreadRead } =
  messagesSlice.actions;

export default messagesSlice.reducer;
