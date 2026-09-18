import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../../../Dashboard Admin/src/lib/supabase";

export const getSession = createAsyncThunk("auth/getSession", async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return rejectWithValue(error.message);
    }

    return data;
  },
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ username, email, password }, { rejectWithValue }) => {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      },
    );

    if (signUpError) {
      return rejectWithValue(signUpError.message);
    }

    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .insert({
        id: signUpData.user.id,
        username,
        email,
      });

    if (usersError) {
      return rejectWithValue(usersError.message);
    }

    return usersData;
  },
);

const initialState = {
  session: null,
  user: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(getSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user ?? null;
        state.session = action.payload;
      })
      .addCase(getSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default authSlice.reducer;
