import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { socket } from "../socket.jsx";

const initialState = {
  isAuthLoading: false,
  isAuthError: false,
  errorMessage: null,
  user: null,
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
  console.log(data);
  return await axios
    .post(`${import.meta.env.VITE_APP_URL}/api/users/register`, data)
    .then((response) => response.data)
    .catch((error) => thunkAPI.rejectWithValue(error.response.data.message));
});

// *********************** RECOVERY PASSWORD *************************
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

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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
  },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
