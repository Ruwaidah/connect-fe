import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { socket } from "../socket.jsx";

const initialState = {
  isAuthLoading: false,
  isAuthError: false,
  errorMessage: null,
  user: null,
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
    console.log(data);
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
    console.log(data);
    const hashedOtp = localStorage.getItem("hashedOtp");
    console.log(hashedOtp);
    return await axios
      .post(`${import.meta.env.VITE_APP_URL}/api/users/verify_otp`, {
        data,
        hashedOtp,
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
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

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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
    changeTheEmail: (state) => {
      state.isOTPPage = false;
      state.isNewPassword = false;
    },

    logout: (state) => {
      localStorage.clear();
      state.isAuthLoading = false;
      state.isAuthError = false;
      state.errorMessage = null;
      state.user = null;
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
      console.log(action.payload);
      localStorage.setItem("token", action.payload.token);
      // localStorage.setItem("type", action.payload.type);
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
      localStorage.setItem("token", action.payload.token);
      // localStorage.setItem("type", action.payload.type);
      localStorage.setItem("id", action.payload.id);
      console.log(action.payload);
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
      // localStorage.setItem("type", action.payload.type);
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
      // state.isResetPassword = false;
      state.isResetPasswordLoading = true;
      state.isResetPasswordError = false;
      state.isOTPPage = false;
      state.verifyEmail = null;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      localStorage.setItem("hashedOtp", action.payload.hashedOtp);
      // state.isResetPassword = true;
      console.log(action.payload);
      state.verifyEmail = action.payload.email;
      state.isOTPPage = true;
      state.isResetPasswordLoading = false;
      state.isResetPasswordError = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      // state.isResetPassword = false;
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
      // state.isChangePasswword = false;
    });
    builder.addCase(checkOtp.fulfilled, (state, action) => {
      localStorage.clear("hashedOtp");
      state.isOtpLoading = false;
      state.otpErrorMessage = null;
      state.isOtpError = false;
      state.isNewPassword = true;
      state.isOTPPage = false;
      // state.isChangePasswword = true;
    });
    builder.addCase(checkOtp.rejected, (state, action) => {
      state.isOtpLoading = false;
      state.otpErrorMessage = action.payload;
      state.isOtpError = true;
      state.isNewPassword = false;
      // state.isChangePasswword = false;
    });

    // ***************************** REQUEST NEW PASSWORD ********************************
    builder.addCase(requestNewPassword.pending, (state, action) => {
      state.requestChangePasswordLoading = true;
      state.requestChangePasswordError = false;
      state.requestChangePasswordErrorMessage = null;
      state.requestChangePasswordPass = false;
    }),
      builder.addCase(requestNewPassword.fulfilled, (state, action) => {
        localStorage.clear("hashedOtp");
        state.requestChangePasswordLoading = false;
        state.requestChangePasswordError = false;
        state.requestChangePasswordErrorMessage = null;
        state.requestChangePasswordPass = true;
      }),
      builder.addCase(requestNewPassword.rejected, (state, action) => {
        state.requestChangePasswordLoading = false;
        state.requestChangePasswordError = true;
        state.requestChangePasswordErrorMessage = action.payload;
        state.requestChangePasswordPass = false;
      });
  },
});

export const { logout, clearChangePassword, changeTheEmail } =
  usersSlice.actions;

export default usersSlice.reducer;
