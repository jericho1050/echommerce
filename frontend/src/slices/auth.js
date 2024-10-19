import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  token: null,
  role: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    const request = new Request(
      import.meta.env.VITE_REST_API_URL + "/api/auth-token/",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );
    try {
      const response = await fetch(request);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return { token: data.token, role: data.role }; // Return token and role
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, first_name, last_name, password, role }, { rejectWithValue }) => {
    const request = new Request(
      import.meta.env.VITE_REST_API_URL + "/api/register/",
      {
        method: "POST",
        body: JSON.stringify({ email, first_name, last_name, password, role }),
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );
    try {
      const response = await fetch(request);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return { token: data.token, role: data.role }; // Return token and role
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.role = action.payload.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.role = action.payload.role;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

const persistConfig = {
  key: "auth",
  storage,
};

export const persistedAuthReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);

export const authSelector = (state) => state.auth;
export const isAuthenticatedSelector = (state) => !!state.auth.token && state.auth.role === "shopper";

export default authSlice.reducer;