import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getPopularMovies,
  searchMovies,
  getMovieDetails,
} from "../services/movieApi";


// Fetch popular movies
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async () => {
    const response = await getPopularMovies();
    return response.data.results;
  }
);


// Search movies
export const fetchSearchMovies = createAsyncThunk(
  "movies/fetchSearchMovies",
  async (query) => {
    const response = await searchMovies(query);
    return response.data.results;
  }
);


// Fetch movie details
export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (movieId) => {
    const response = await getMovieDetails(movieId);
    return response.data;
  }
);


const initialState = {
  popularMovies: [],
  searchResults: [],
  selectedMovie: null,
  loading: false,
  error: null,
};


const movieSlice = createSlice({
  name: "movies",

  initialState,

  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },

    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Popular Movies
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload;
      })

      .addCase(fetchPopularMovies.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load popular movies.";
      })


      // Search Movies
      .addCase(fetchSearchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })

      .addCase(fetchSearchMovies.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to search movies.";
      })


      // Movie Details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })

      .addCase(fetchMovieDetails.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load movie details.";
      });
  },
});


export const {
  clearSearchResults,
  clearSelectedMovie,
} = movieSlice.actions;


export default movieSlice.reducer;