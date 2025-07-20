import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialState = {
  messages: [],
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
      .then(response => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
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
      console.log(action.payload);
      state.isMessagesLoading = false;
      state.isMessagesError = false;
      state.errorMessages = null;
      state.privateMsg = action.payload
    });
    builder.addCase(getMessagesBetweenTwoUsers.rejected, (state, action) => {
      state.isMessagesLoading = false;
      state.isMessagesError = true;
      state.errorMessages = action.payload;
    });
  },
});

export default messagesSlice.reducer;
