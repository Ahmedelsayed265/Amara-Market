import { configureStore } from "@reduxjs/toolkit";
import authedUser from "./slices/authedUser";

export const store = configureStore({
  reducer: {
    authedUser,
  },
});
