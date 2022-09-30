import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authSlicer";

export const store = configureStore({
  reducer: {
    currentUser: authSlicer,
  },
});
