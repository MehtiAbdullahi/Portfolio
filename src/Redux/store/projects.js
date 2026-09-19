import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

export const getProjects = createAsyncThunk(
  "get/getProjects",
  async (_, { rejectWithValue }) => {
    const { data, error } = await supabase.from("projects").select("*");

    if (error) {
      return rejectWithValue(error.message);
    }

    return data;
  },
);

const initialState = {
  loading: true,
  error: null,
  projects: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
