import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/authSlice";
import projectReducer from "./store/projects";

const store = configureStore({
  reducer: {
    project: projectReducer,
    auth: authReducer,
  },
});

export default store;
