import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "",
  authFetching: false,
  error: false,
  message: "",
  token: "",
};

const currentUserSlicer = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    loggingStart: (state) => {
      state.authFetching = true;
    },
    loggingFinish: (state) => {
      state.authFetching = false;
    },
    loggingSuccess: (state, action) => {
      state.authFetching = false;
    },
    loggingFail: (state) => {
      state.authFetching = false;
    },
  },
});

export const { loggingStart, loggingFinish, loggingFail, loggingSuccess } =
  currentUserSlicer.actions;
export default currentUserSlicer.reducer;
