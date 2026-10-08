import { configureStore } from "@reduxjs/toolkit";

import movieReducer from "./movieReducer";
import authReducer from "./authReducer";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    auth: authReducer,
  },
});

export default store;