import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  loggedIn: localStorage.getItem("logged_in"),
  userId: localStorage.getItem("user_id"),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    doLogin(state, action) {
      const { userId } = action.payload;
      state.loggedIn = true;
      localStorage.setItem("logged_in", true);
      localStorage.setItem("user_id", userId);
    },
    doLogout(state) {
      state.loggedIn = false;
      localStorage.setItem("logged_in", false);
      localStorage.setItem("user_id", null);
    },
  },
});

export const { doLogin, doLogout } = authSlice.actions;

export default authSlice.reducer;
