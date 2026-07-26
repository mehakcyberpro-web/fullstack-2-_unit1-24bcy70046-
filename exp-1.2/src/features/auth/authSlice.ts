import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { AuthState } from "./authTypes";
import { loginUser } from "../../services/authApi";

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await loginUser(credentials);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreSession(
      state,
      action: {
        payload: {
          user: AuthState["user"];
        token: string;
      };
    }
  ) {
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.isAuthenticated = true;
    state.loading = false;
    state.error = null;
  },

  logout(state) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    state.user = null;
    state.token = null;
    state.isAuthenticated = false;
    state.loading = false;
    state.error = null;
  },
},
  

  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});
export const {
  restoreSession,
  logout,
} = authSlice.actions;

export default authSlice.reducer;