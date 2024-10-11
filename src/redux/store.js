import { configureStore } from "@reduxjs/toolkit";
import authedUser from "./slices/authedUser";
import language from "./slices/language";

export const store = configureStore({
  reducer: {
    authedUser,
    language,
  },
});
