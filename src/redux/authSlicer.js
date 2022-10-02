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
    fetchStart: (state) => {
      state.authFetching = true;
    },
    fetchFinish: (state) => {
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

export const { fetchStart, fetchFinish, loggingFail, loggingSuccess } =
  currentUserSlicer.actions;
export default currentUserSlicer.reducer;
