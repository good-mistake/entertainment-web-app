import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface SignupPayload {
  email: string;
  password: string;
}
interface LoginPayload {
  email: string;
  password: string;
}
interface User {
  id: string;
  email: string;
  color?: string;
}
interface userSlice {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  loading: boolean;
}

const initialState: userSlice = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false,
};

interface LoginResponse {
  user: User;
  token: string;
}
export const signupUser = createAsyncThunk<
  User,
  SignupPayload,
  { rejectValue: string }
>("user/signupUser", async ({ email, password }, thunkAPI) => {
  try {
    const res = await axios.post("/api/signup", { email, password });
    return res.data;
  } catch (err) {
    const error = err as { response?: { data?: { message?: string } } };
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Signup failed"
    );
  }
});

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("user/loginUser", async ({ email, password }, thunkAPI) => {
  try {
    const res = await axios.post("/api/login", { email, password });
    return res.data;
  } catch (err) {
    const error = err as { response?: { data?: { message?: string } } };
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed"
    );
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    login(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      state.loading = false;
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          id: action.payload.user.id,
          email: action.payload.user.email,
          color: action.payload.user.color,
        };
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { login, logout, resetError } = userSlice.actions;
export default userSlice.reducer;
