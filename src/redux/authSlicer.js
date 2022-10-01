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
      //console.log(action);
      state.authFetching = false;
      state.token = action.payload.token;
      state.currentUser = action.payload.currentUser;
    },
    loggingFail: (state) => {
      state.authFetching = false;
    },
  },
});

export const { loggingStart, loggingFinish, loggingFail, loggingSuccess } =
  currentUserSlicer.actions;
export default currentUserSlicer.reducer;
