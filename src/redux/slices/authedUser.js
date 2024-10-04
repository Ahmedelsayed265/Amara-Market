import { createSlice } from "@reduxjs/toolkit";

export const authedUser = createSlice({
  name: "authedUser",
  initialState: {
    user: null,
    isLogged: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    logout: (state) => {
      state.user = {};
    }
  }
});

export const { setUser, setIsLogged, logout } = authedUser.actions;
export default authedUser.reducer;
