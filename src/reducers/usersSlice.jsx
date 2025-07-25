import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { socket } from "../socket.jsx";
import axiosWithAuth from "../utils/axiosWithAuth.jsx";

const initialState = {
  isError: false,
  isLoading: false,
  isErrorMessage: null,
  isStartNewChat: false,
  isDeleteUser: false,

  isAuthLoading: false,
  isAuthError: false,
  errorMessage: null,
  user: null,

  // *************************** GET USER *******************************
  isGettingUserLoading: false,
  isGettingUserError: false,
  isGettingUserErrorMessage: null,

  // ************************** UPDATE USER ******************************
  isUpdateUserLoading: false,
  isUpdateUserError: false,
  isUpdateUserErrorMessage: null,
  isUsernameAvailable: null,
  updateUserImageMsgError: null,

  // **************************  RESET PASSWORD **************************
  isResetPasswordLoading: false,
  isResetPasswordError: false,
  isOtpLoading: false,
  isOtpError: false,
  otpErrorMessage: null,
  isOTPPage: false,
  isNewPassword: false,
  requestChangePasswordLoading: false,
  requestChangePasswordError: false,
  requestChangePasswordErrorMessage: null,
  requestChangePasswordPass: false,
  verifyEmail: null,

  // ************************** GET FRIENDS LIST **************************
  isGetFriendsLoading: false,
  isGetFriendsError: false,
  isGetFriendsErrorMessage: null,
  friendsList: [],

  // ************************** FIND NEW FRIEND ******************************
  findFriendLoading: false,
  findFriendError: false,
  findFriendErrorMessage: null,
  findFriend: null,

  // ************************************* SEND FRIEND REQUEST *************************************
  addingNewFriendLoading: false,
  addingNewFriendError: false,
  addingNewFriendErrorMessage: null,
};

// ************************** LOGIN AUTH WITH GOOGLE ******************************
export const loginWithGoogle = createAsyncThunk(
  "LOING_WITH_GOOGLE",
  async (data, thunkAPI) => {
    return await axios
      .post(`${import.meta.env.VITE_APP_URL}/api/users/google-login`, data)
      .then((response) => response.data)
      .catch((error) =>
        thunkAPI.rejectWithValue(
          error.rejectWithValue(error.response.data.message)
        )
      );
  }
);

// ************************** LOGIN AUTH ******************************
export const loginUser = createAsyncThunk(
  "LOGIN_USER",
  async (data, thunkAPI) => {
    return await axios
      .post(`${import.meta.env.VITE_APP_URL}/api/users/login`, data)
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
  }
);

// ************************** SIGNUP AUTH ******************************
export const signUp = createAsyncThunk("SIGN_UP", async (data, thunkAPI) => {
  return await axios
    .post(`${import.meta.env.VITE_APP_URL}/api/users/register`, data)
    .then((response) => response.data)
    .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
});

// *********************** RESET PASSWORD *************************
export const resetPassword = createAsyncThunk(
  "RESET_PASSWORD",
  async (data, thunkAPI) => {
    return await axios
      .post(
        `${import.meta.env.VITE_APP_URL}/api/users/send_recovery_email`,
        data
      )
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
  }
);

// ***************************** VERIFY OTP ********************************
export const checkOtp = createAsyncThunk(
  "VERIFY_NUMBERS_OTP",
  async (data, thunkAPI) => {
    const hashedOtp = localStorage.getItem("hashedOtp");
    return await axios
      .post(`${import.meta.env.VITE_APP_URL}/api/users/verify_otp`, {
        data,
        hashedOtp,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue(error.response.data.message);
      });
  }
);

// ***************************** REQUEST NEW PASSWORD ********************************
export const requestNewPassword = createAsyncThunk(
  "REQUEST_NEW_PASSWORD",
  async (data, thunkAPI) => {
    return await axios
      .post(`${import.meta.env.VITE_APP_URL}/api/users/change_password`, data)
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.response));
  }
);

// *************************** GET USER *******************************
export const getUser = createAsyncThunk("GET_USER", async (data, thunkAPI) => {
  return await axiosWithAuth()
    .get(
      `${import.meta.env.VITE_APP_URL}/api/users/getUser/${localStorage.getItem(
        "id"
      )}`
    )
    .then((response) => response.data)
    .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
});

// ************************** UPDATE USER ******************************
export const updateUser = createAsyncThunk(
  "UPDATE_USER",
  async (data, thunkAPI) => {
    return await axiosWithAuth()
      .put(
        `${import.meta.env.VITE_APP_URL}/${localStorage.getItem("id")}`,
        data
      )
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
  }
);

// ****************************** CHECK USERNAME AVAILABILITY ***********************************
export const checkUsername = createAsyncThunk(
  "CHECK_USERNAME_AVAILABILITY",
  async (data, thunkAPI) => {
    return await axiosWithAuth()
      .post(`${import.meta.env.VITE_APP_URL}/api/users/checkusername`, data)
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
  }
);

// ****************************** UPDATE USER IMAGE ***********************************
export const changeUserImage = createAsyncThunk(
  "CHANGE_USER_IMAGE",
  async (data, thunkAPI) => {
    return await axiosWithAuth()
      .put(
        `${
          import.meta.env.VITE_APP_URL
        }/api/users/image?userid=${localStorage.getItem("id")}&&imageid=${
          data.imageId
        }&&publicimageid=${data.publicImageId}`,
        data.image
      )
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
  }
);

// ************************************* SEND FRIEND REQUEST *************************************
export const addNewFriend = createAsyncThunk(
  "ADD_NEW_FRIEND",
  async (data, thunkAPI) => {
    return await axiosWithAuth()
      .post(`${import.meta.env.VITE_APP_URL}/api/users/sendrequest`, data)
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
  }
);

// ************************************* APPROVE FRIEND REQUEST *************************************
export const approveFriendRequest = createAsyncThunk(
  "APPROVE_FRIEND_REQUEST",
  async (data, thunkAPI) => {
    return await axiosWithAuth()
      .get(
        `${
          import.meta.env.VITE_APP_URL
        }/api/users/acceptfriendrequest?userrecieverequest=${
          data.userRecieveRequest
        }&&usersendrequest=${data.userSendRequest}`
      )
      .then((response) => {
        return {
          userRecieveRequest: data.userRecieveRequest,
          userSendRequest: data.userSendRequest,
          friend: data.friend,
        };
      })
      .catch((error) => thunkAPI.rejectWithValue(error.response.data));
  }
);

// ************************** CANCEL FRIEND REQUEST ******************************
export const cancelFriendReq = createAsyncThunk(
  "CANCEL_FRIEND_REQUEST",
  async (data, action) => {
    return await axiosWithAuth()
      .delete(
        `${
          import.meta.env.VITE_APP_URL
        }/api/users/cancelrequest?userSendRequest=${
          data.userSendRequest
        }&&userRecieveRequest=${data.userRecieveRequest}`
      )
      .then((response) => ({
        data: response.data,
        userSendRequest: data.userSendRequest,
        userRecieveRequest: data.userRecieveRequest,
      }))
      .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
  }
);

// ************************** REJECT FRIEND REQUEST ******************************
export const rejectFriendRequest = createAsyncThunk(
  "REJECT_FRIEND_REQUEST",
  async (data, thunkAPI) => {
    return await axiosWithAuth()
      .delete(
        `${
          import.meta.env.VITE_APP_URL
        }/api/users/rejectfriendrequest?userrecieverequest=${
          data.userRecieveRequest
        }&&usersendrequest=${data.userSendRequest}`
      )
      .then((response) => ({ data: response.data, friend: data }))
      .catch((error) => thunkAPI.rejectWithValue(error.response.data));
  }
);

// ************************** GET FRIENDS LIST ******************************
export const getFriends = createAsyncThunk(
  "GET_FRIENDS",
  async (data, thunkAPI) => {
    return await axiosWithAuth()
      .get(
        `${
          import.meta.env.VITE_APP_URL
        }/api/users/friendslist/${localStorage.getItem("id")}`
      )
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
  }
);

// ************************** FIND NEW FRIEND ******************************
export const findNewFriend = createAsyncThunk(
  "FIND_NEW_FRIEND",
  async (data, thunkAPI) => {
    return await axiosWithAuth()
      .post(
        `${
          import.meta.env.VITE_APP_URL
        }/api/users/findfriend?userid=${localStorage.getItem("id")}`,
        data
      )
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
  }
);

// ************************************* GET FRIEND BY ID *************************************
export const getFriendById = createAsyncThunk(
  "GET_FRIEND_USER_BY_ID",
  async (id, thunkAPI) => {
    return await axiosWithAuth()
      .get(
        `${
          import.meta.env.VITE_APP_URL
        }/api/users/getsearcheduser/${id}?userid=${localStorage.getItem("id")}`
      )
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.response.data));
  }
);

// ************************************* DELETE FRIEND  *************************************
export const deleteFriend = createAsyncThunk(
  "DELETE_FRIEND",
  async (id, thunkAPI) => {
    return await axiosWithAuth()
      .delete(
        `${
          import.meta.env.VITE_APP_URL
        }/api/users/deletefriend?userid=${localStorage.getItem(
          "id"
        )}&&searchFriend=${id}`
      )
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
  }
);

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    deletingFriendUser: (state, action) => {
      state.isDeleteUser = action.payload;
    },
    startNewChatList: (state, action) => {
      state.isStartNewChat = action.payload;
    },
    clearChangePassword: (state) => {
      state.isOTPPage = false;
      state.isOtpLoading = false;
      state.isOtpError = false;
      state.otpErrorMessage = null;
      state.isNewPassword = false;
      state.isResetPasswordLoading = false;
      state.isResetPasswordError = false;
      state.requestChangePasswordLoading = false;
      state.requestChangePasswordError = false;
      state.requestChangePasswordErrorMessage = null;
      state.requestChangePasswordPass = false;
      state.verifyEmail = null;
    },
    clearFriendSearch: (state) => {
      state.findFriend = null;
      state.findFriendLoading = false;
      state.findFriendError = false;
      state.findFriendErrorMessage = null;
      state.isStartNewChat = false;
    },
    changeTheEmail: (state) => {
      state.isOTPPage = false;
      state.isNewPassword = false;
    },

    logout: (state) => {
      localStorage.clear();
      state.isError = false;
      state.isLoading = false;
      state.isErrorMessage = null;
      state.isStartNewChat = false;
      state.isAuthLoading = false;
      state.isAuthError = false;
      state.errorMessage = null;
      state.user = null;

      // *************************** GET USER *******************************
      state.isGettingUserLoading = false;
      state.isGettingUserError = false;
      state.isGettingUserErrorMessage = null;

      // ************************** UPDATE USER ******************************
      state.isUpdateUserLoading = false;
      state.isUpdateUserError = false;
      state.isUpdateUserErrorMessage = null;
      state.isUsernameAvailable = null;
      state.updateUserImageMsgError = null;

      // **************************  RESET PASSWORD **************************
      state.isResetPasswordLoading = false;
      state.isResetPasswordError = false;
      state.isOtpLoading = false;
      state.isOtpError = false;
      state.otpErrorMessage = null;
      state.isOTPPage = false;
      state.isNewPassword = false;
      state.requestChangePasswordLoading = false;
      state.requestChangePasswordError = false;
      state.requestChangePasswordErrorMessage = null;
      state.requestChangePasswordPass = false;
      state.verifyEmail = null;

      // ************************** GET FRIENDS LIST **************************
      state.isGetFriendsLoading = false;
      state.isGetFriendsError = false;
      state.isGetFriendsErrorMessage = null;
      state.friendsList = [];

      // ************************** FIND NEW FRIEND ******************************
      state.findFriendLoading = false;
      state.findFriendError = false;
      state.findFriendErrorMessage = null;
      state.findFriend = null;

      // ************************************* SEND FRIEND REQUEST *************************************
      state.addingNewFriendLoading = false;
      state.addingNewFriendError = false;
      state.addingNewFriendErrorMessage = null;
    },
  },
  extraReducers: (builder) => {
    // ************************** LOGIN AUTH WITH GOOGLE ******************************
    builder.addCase(loginWithGoogle.pending, (state) => {
      state.isAuthLoading = true;
      state.errorMessage = null;
      state.isAuthError = false;
    });
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("id", action.payload.id);
      state.isAuthLoading = false;
      state.user = action.payload;
      state.isAuthError = false;
      state.errorMessage = null;
    });
    builder.addCase(loginWithGoogle.rejected, (state, action) => {
      state.isAuthLoading = false;
      state.errorMessage = action.payload;
      state.user = null;
      state.isAuthError = true;
    });

    // ************************** LOGIN AUTH ******************************
    builder.addCase(loginUser.pending, (state) => {
      state.isAuthError = false;
      state.errorMessage = null;
      state.isAuthError = false;
      state.isAuthLoading = true;
      state.user = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
            socket.emit("testing", action.payload);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("id", action.payload.id);
      state.isAuthError = false;
      state.errorMessage = null;
      state.isAuthLoading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthError = true;
      state.isAuthLoading = false;
      state.errorMessage = action.payload;
      state.user = null;
    });

    // ************************** SIGN AUTH ******************************
    builder.addCase(signUp.pending, (state, action) => {
      state.isAuthError = false;
      state.errorMessage = null;
      state.isAuthError = false;
      state.isAuthLoading = true;
      state.user = null;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("id", action.payload.id);
      state.isAuthError = false;
      state.errorMessage = null;
      state.isAuthLoading = false;
      state.user = action.payload;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isAuthError = true;
      state.isAuthLoading = false;
      state.errorMessage = action.payload;
      state.user = null;
    });

    // *********************** RESET PASSWORD *************************
    builder.addCase(resetPassword.pending, (state, action) => {
      state.isResetPasswordLoading = true;
      state.isResetPasswordError = false;
      state.isOTPPage = false;
      state.verifyEmail = null;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      localStorage.setItem("hashedOtp", action.payload.hashedOtp);
      state.verifyEmail = action.payload.email;
      state.isOTPPage = true;
      state.isResetPasswordLoading = false;
      state.isResetPasswordError = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isOTPPage = false;
      state.isResetPasswordLoading = false;
      state.isResetPasswordError = true;
      state.verifyEmail = null;
    });

    // ***************************** VERIFY OTP ********************************
    builder.addCase(checkOtp.pending, (state, action) => {
      state.isOtpLoading = true;
      state.otpErrorMessage = null;
      state.isOtpError = false;
      state.isNewPassword = false;
    });
    builder.addCase(checkOtp.fulfilled, (state, action) => {
      localStorage.clear("hashedOtp");
      state.isOtpLoading = false;
      state.otpErrorMessage = null;
      state.isOtpError = false;
      state.isNewPassword = true;
      state.isOTPPage = false;
    });
    builder.addCase(checkOtp.rejected, (state, action) => {
      state.isOtpLoading = false;
      state.otpErrorMessage = action.payload;
      state.isOtpError = true;
      state.isNewPassword = false;
    });

    // ***************************** REQUEST NEW PASSWORD ********************************
    builder.addCase(requestNewPassword.pending, (state, action) => {
      state.requestChangePasswordLoading = true;
      state.requestChangePasswordError = false;
      state.requestChangePasswordErrorMessage = null;
      state.requestChangePasswordPass = false;
    });
    builder.addCase(requestNewPassword.fulfilled, (state, action) => {
      localStorage.clear("hashedOtp");
      state.requestChangePasswordLoading = false;
      state.requestChangePasswordError = false;
      state.requestChangePasswordErrorMessage = null;
      state.requestChangePasswordPass = true;
    });
    builder.addCase(requestNewPassword.rejected, (state, action) => {
      state.requestChangePasswordLoading = false;
      state.requestChangePasswordError = true;
      state.requestChangePasswordErrorMessage = action.payload;
      state.requestChangePasswordPass = false;
    });
    // *************************** GET USER *******************************
    builder.addCase(getUser.pending, (state, action) => {
      state.isGettingUserLoading = true;
      state.isGettingUserError = false;
      state.isGettingUserErrorMessage = null;
      state.user = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isGettingUserLoading = false;
      state.isGettingUserError = false;
      state.isGettingUserErrorMessage = null;
      state.user = action.payload;
    }),
      builder.addCase(getUser.rejected, (state, action) => {
        state.isGettingUserLoading = false;
        state.isGettingUserError = true;
        state.isGettingUserErrorMessage = action.payload;
        state.user = null;
      });

    // ************************** UPDATE USER ******************************
    builder.addCase(updateUser.pending, (state, action) => {
      state.isGettingUserLoading = true;
      state.isGettingUserError = false;
      state.isGettingUserErrorMessage = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isGettingUserLoading = false;
      state.isGettingUserError = false;
      state.isGettingUserErrorMessage = null;
      state.user = action.payload;
    }),
      builder.addCase(updateUser.rejected, (state, action) => {
        state.isGettingUserLoading = false;
        state.isGettingUserError = true;
        state.isGettingUserErrorMessage = action.payload;
      });

    // ****************************** CHECK USERNAME AVAILABILITY ***********************************
    builder.addCase(checkUsername.fulfilled, (state, action) => {
      state.isUsernameAvailable = action.payload.message;
    });

    // ****************************** UPDATE USER IMAGE ***********************************
    builder.addCase(changeUserImage.fulfilled, (state, action) => {
      state.user.image = action.payload.image;
      state.user.image_id = action.payload.image_id;
      state.user.public_id = action.payload.public_id;
      state.updateUserImageMsgError = null;
    });

    builder.addCase(changeUserImage.rejected, (state, action) => {
      state.updateUserImageMsgError = action.payload;
    });

    // ************************** GET FRIENDS LIST ******************************
    builder.addCase(getFriends.pending, (state, action) => {
      state.isGetFriendsLoading = true;
      state.isGetFriendsError = false;
      state.isGetFriendsErrorMessage = null;
      state.friendsList = [];
    });
    builder.addCase(getFriends.fulfilled, (state, action) => {
      state.isGetFriendsLoading = false;
      state.isGetFriendsError = false;
      state.isGetFriendsErrorMessage = null;
      state.friendsList = action.payload;
    });
    builder.addCase(getFriends.rejected, (state, action) => {
      state.isGetFriendsLoading = false;
      state.isGetFriendsError = true;
      state.isGetFriendsErrorMessage = action.payload;
      state.friendsList = [];
    });

    // ************************** FIND NEW FRIEND ******************************
    builder.addCase(findNewFriend.pending, (state, action) => {
      state.findFriendLoading = true;
      state.findFriendError = false;
      state.findFriendErrorMessage = null;
      state.findFriend = null;
    });
    builder.addCase(findNewFriend.fulfilled, (state, action) => {
      state.findFriendLoading = false;
      state.findFriend = action.payload;
      state.findFriendError = false;
      state.findFriendErrorMessage = null;
    });
    builder.addCase(findNewFriend.rejected, (state, action) => {
      state.findFriendLoading = false;
      state.findFriend = null;
      state.findFriendError = true;
      state.findFriendErrorMessage = action.payload;
    });

    // ************************************* SEND FRIEND REQUEST *************************************
    builder.addCase(addNewFriend.pending, (state, action) => {
      state.addingNewFriendLoading = true;
      state.addingNewFriendError = false;
      state.addingNewFriendErrorMessage = null;
    });
    builder.addCase(addNewFriend.fulfilled, (state, action) => {
      state.addingNewFriendLoading = false;
      state.addingNewFriendError = false;
      state.addingNewFriendErrorMessage = null;
      state.findFriend.friendReq = action.payload.response;
    });
    builder.addCase(addNewFriend.rejected, (state, action) => {
      state.addingNewFriendLoading = false;
      state.addingNewFriendError = true;
      state.addingNewFriendErrorMessage = action.payload;
    });

    // ************************** APPROVE FRIEND REQUEST ******************************
    builder.addCase(approveFriendRequest.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isErrorMessage = null;
    });
    builder.addCase(approveFriendRequest.fulfilled, (state, action) => {
      // socket.emit("APPROVE_FRIEND_REQUEST", action.payload);
      state.isLoading = false;
      state.isError = false;
      state.isErrorMessage = null;
      // state.friendsList = [...state.friendsList, action.payload.friend];
      state.user.friendReq = state.user.friendReq.filter(
        (u) =>
          u.userRecieveRequest !== action.payload.userRecieveRequest &&
          u.userSendRequest !== action.payload.userSendRequest
      );
      if (state.findFriend) {
        state.findFriend.friendReq = null;
        state.findFriend.friend = true;
      }
    });
    builder.addCase(approveFriendRequest.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isErrorMessage = action.payload;
    });

    // ************************** CANCEL FRIEND REQUEST ******************************
    builder.addCase(cancelFriendReq.pending, (state, action) => {
      state.isError = false;
      state.isErrorMessage = null;
      state.isLoading = true;
    });
    builder.addCase(cancelFriendReq.fulfilled, (state, action) => {
      // socket.emit("CANCEL_FRIEND_REQUEST", action.payload);
      state.isLoading = false;
      state.isError = false;
      state.isErrorMessage = null;
      state.user.friendReq = action.payload.data;
      state.findFriend.friendReq = null;
      // if (state.searchFriend) state.searchFriend.friendReq = {};
    });
    builder.addCase(cancelFriendReq.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isErrorMessage = action.payload;
    });

    // ************************** REJECT FRIEND REQUEST ******************************
    builder.addCase(rejectFriendRequest.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isErrorMessage = null;
    });
    builder.addCase(rejectFriendRequest.fulfilled, (state, action) => {
      // socket.emit("REJECT_FIEND_REQUEST", action.payload.friend);
      state.isLoading = false;
      state.isError = false;
      state.isErrorMessage = null;
      // state.user.friendReq = action.payload.data;
     state.user.friendReq = action.payload.data;
      if (state.findFriend) state.findFriend.friendReq = null;
    });
    builder.addCase(rejectFriendRequest.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isErrorMessage = action.payload;
    });

    // ************************************* GET FRIEND BY ID *************************************
    builder.addCase(getFriendById.pending, (state, action) => {
      state.findFriendLoading = true;
      state.findFriendError = false;
      state.findFriendErrorMessage = null;
      state.findFriend = null;
    });
    builder.addCase(getFriendById.fulfilled, (state, action) => {
      state.findFriendLoading = false;
      state.findFriendError = false;
      state.findFriendErrorMessage = null;
      state.findFriend = action.payload;
    });
    builder.addCase(getFriendById.rejected, (state, action) => {
      state.findFriendLoading = false;
      state.findFriendError = true;
      state.findFriendErrorMessage = action.payload;
      state.findFriend = null;
    });

    // ************************** DELETE FRIEND  ******************************
    builder.addCase(deleteFriend.pending, (state, action) => {
      state.addingNewFriendLoading = true;
      state.addingNewFriendError = false;
      state.addingNewFriendErrorMessage = null;
    });
    builder.addCase(deleteFriend.fulfilled, (state, action) => {
      if (state.findFriend) state.findFriend.friend = false;
      state.addingNewFriendLoading = false;
      state.addingNewFriendError = false;
      state.addingNewFriendErrorMessage = null;
    });
    builder.addCase(deleteFriend.rejected, (state, action) => {
      state.addingNewFriendLoading = false;
      state.addingNewFriendError = true;
      state.addingNewFriendErrorMessage = action.payload;
    });
  },
});

export const {
  logout,
  clearChangePassword,
  changeTheEmail,
  clearFriendSearch,
  startNewChatList,
  deletingFriendUser,
} = usersSlice.actions;

export default usersSlice.reducer;
