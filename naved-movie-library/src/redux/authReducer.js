import { createSlice } from "@reduxjs/toolkit";

const USER_KEY = "navedUser";
const listKey = (email, type) => `naved_${type}_${email}`;

const loadList = (email, type) => {
  if (!email) return [];
  try {
    return JSON.parse(localStorage.getItem(listKey(email, type))) || [];
  } catch {
    return [];
  }
};

const saveList = (email, type, list) => {
  if (!email) return;
  localStorage.setItem(listKey(email, type), JSON.stringify(list));
};

const savedUser = JSON.parse(localStorage.getItem(USER_KEY) || "null");

const initialState = {
  user: savedUser,
  isAuthenticated: Boolean(savedUser),
  favorites: loadList(savedUser?.email, "favorites"),
  watchlist: loadList(savedUser?.email, "watchlist"),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      // Is user ki purani saved lists wapas load karo
      state.favorites = loadList(action.payload.email, "favorites");
      state.watchlist = loadList(action.payload.email, "watchlist");

      localStorage.setItem(USER_KEY, JSON.stringify(action.payload));
    },

    logout: (state) => {
      // Lists localStorage me saved rehti hain, sirf memory se clear hoti hain
      state.user = null;
      state.isAuthenticated = false;
      state.favorites = [];
      state.watchlist = [];

      localStorage.removeItem(USER_KEY);
    },

    addFavorite: (state, action) => {
      const exists = state.favorites.some(
        (movie) => movie.id === action.payload.id
      );

      if (!exists) {
        state.favorites.push(action.payload);
        saveList(state.user?.email, "favorites", state.favorites);
      }
    },

    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload
      );
      saveList(state.user?.email, "favorites", state.favorites);
    },

    addToWatchlist: (state, action) => {
      const exists = state.watchlist.some(
        (movie) => movie.id === action.payload.id
      );

      if (!exists) {
        state.watchlist.push(action.payload);
        saveList(state.user?.email, "watchlist", state.watchlist);
      }
    },

    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload
      );
      saveList(state.user?.email, "watchlist", state.watchlist);
    },
  },
});

export const {
  login,
  logout,
  addFavorite,
  removeFavorite,
  addToWatchlist,
  removeFromWatchlist,
} = authSlice.actions;

export default authSlice.reducer;
