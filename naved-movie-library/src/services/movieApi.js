import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

const movieApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});


export const getPopularMovies = () => {
  return movieApi.get("/movie/popular");
};


export const searchMovies = (query) => {
  return movieApi.get("/search/movie", {
    params: {
      query,
    },
  });
};


export const getMovieDetails = (movieId) => {
  return movieApi.get(`/movie/${movieId}`, {
    params: {
      append_to_response: "credits",
    },
  });
};