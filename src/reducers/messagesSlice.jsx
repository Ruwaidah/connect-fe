import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosWithAuth from "../utils/axiosWithAuth";
import { socket } from "../socket";

const initialState = {
  messages: [],
  livePrivateTexting: {},
  privateMsg: null,
  isMessagesLoading: false,
  isMessagesError: false,
  errorMessages: null,
  totalUnreadMsgs: 0,
};

// ************************** GET ALL MESSAGES ******************************
export const getMessages = createAsyncThunk(
  "GET_MESSAGES",
  async (thunkAPI) => {
    return await axiosWithAuth()
      .get(
        `${
          import.meta.env.VITE_APP_URL
        }/api/auth/message/listmessages?userid=${localStorage.getItem("id")}`
      )
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
  }
);

// *********************** GET ALL PRIVATE MESSAGE BETWEEN TWO USER *************************
export const getMessagesBetweenTwoUsers = createAsyncThunk(
  "GET_MESSAGES_BETWEEN_TWO",
  async (data, thunkAPI) => {
    return await axiosWithAuth()
      .get(
        `${
          import.meta.env.VITE_APP_URL
        }/api/auth/message?friendid=${data}&&userid=${localStorage.getItem(
          "id"
        )}`
      )
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
  }
);

// ************************** SEND PRIVATE MESSAGE ******************************
export const sendMessage = createAsyncThunk(
  "SEND_PRIVATE_MESSAGE",
  async (data, thunkAPI) => {
    return await axiosWithAuth()
      .post(`${import.meta.env.VITE_APP_URL}/api/auth/message`, data.data)
      .then((response) => ({ data: response.data, sender: data.sender }))
      .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
  }
);

// ************************** OPEN UNREAD MESSAGE ******************************
export const messageRead = createAsyncThunk(
  "OPEN_UNREAD_MESSAGES",
  async (data, thunkAPI) => {
    return await axiosWithAuth()
      .put(
        `${import.meta.env.VITE_APP_URL}/api/auth/message/openmessages`,
        data.data
      )
      .then((response) => data)
      .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    receivedMsg: (state, action) => {
      state.livePrivateTexting[action.payload.connectId] = action.payload;
      state.messages[action.payload.friend.id] = action.payload;
      state.privateMsg = action.payload;
      // if (data.payload.messages.length !== state.msgLength) {
      //   state.messagesList[data.payload.friend.id] = data.payload;
      //   state.totalUnreadMsgs = state.totalUnreadMsgs + 1;
      //   state.msgLength = data.payload.messages.length;
      // }
    },
  },
  extraReducers: (builder) => {
    // ************************** GET ALL MESSAGES ******************************
    builder.addCase(getMessages.pending, (state, action) => {
      state.messages = [];
      state.isMessagesLoading = true;
      state.isMessagesError = false;
      state.errorMessages = null;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload.data ? action.payload.data : {};
      state.totalUnreadMsgs = action.payload.totalUnreadMsgs;
      state.isMessagesLoading = false;
      state.isMessagesError = false;
      state.errorMessages = null;
    });
    builder.addCase(getMessages.rejected, (state, action) => {
      state.messages = [];
      state.isMessagesLoading = false;
      state.isMessagesError = true;
      state.errorMessages = action.payload;
    });

    // *********************** GET ALL PRIVATE MESSAGE BETWEEN TWO USER *************************
    builder.addCase(getMessagesBetweenTwoUsers.pending, (state, action) => {
      state.isMessagesLoading = true;
      state.errorMessages = null;
      state.isMessagesError = false;
    });
    builder.addCase(getMessagesBetweenTwoUsers.fulfilled, (state, action) => {
      state.isMessagesLoading = false;
      state.isMessagesError = false;
      state.errorMessages = null;
      state.privateMsg = action.payload;
    });
    builder.addCase(getMessagesBetweenTwoUsers.rejected, (state, action) => {
      state.isMessagesLoading = false;
      state.isMessagesError = true;
      state.errorMessages = action.payload;
    });

    // ************************** SEND PRIVATE MESSAGE ******************************
    builder.addCase(sendMessage.pending, (state, action) => {
      // state.isMessagesLoading = true;
      // state.isMessagesError = false;
      // state.errorMessages = null;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      socket.emit("SEND_MESSAGE", action.payload);
      state.isMessagesLoading = false;
      state.isMessagesError = false;
      state.errorMessages = null;
      // state.privateMsg = action.payload.data;
      state.privateMsg.messages = [
        ...state.privateMsg["messages"],
        action.payload.data,
      ];
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.isMessagesLoading = false;
      state.isMessagesError = true;
      state.errorMessages = action.payload;
    });

    // ************************** OPEN UNREAD MESSAGE ******************************
    builder.addCase(messageRead.fulfilled, (state, action) => {
      if (
        state.messages[action.payload.data.friendId] &&
        state.messages[action.payload.data.friendId].messages
      ) {
        state.totalUnreadMsgs =
          state.totalUnreadMsgs -
          state.messages[action.payload.data.friendId].numberOfMsgUnread;
        state.messages[action.payload.data.friendId].numberOfMsgUnread = 0;
      }
    });
  },
});

export const { receivedMsg } = messagesSlice.actions;

export default messagesSlice.reducer;
