import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Hero from "../components/Hero";
import MovieList from "../components/MovieList";
import { fetchPopularMovies } from "../redux/movieReducer";

function Home() {
  const dispatch = useDispatch();

  const { popularMovies, loading, error } = useSelector(
    (state) => state.movies
  );

  const hasMovies = popularMovies.length > 0;

  useEffect(() => {
    if (!hasMovies) {
      dispatch(fetchPopularMovies());
    }
  }, [dispatch, hasMovies]);

  const retry = () => dispatch(fetchPopularMovies());

  const browse = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.getElementById("popular")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const initialLoading = loading && !hasMovies;
  const initialError = !loading && !hasMovies ? error : null;

  return (
    <>
      <h1 className="sr-only">Naved movie library</h1>

      <Hero
        movies={popularMovies}
        loading={initialLoading}
        onBrowse={browse}
      />

      <MovieList
        movies={popularMovies}
        loading={initialLoading}
        error={initialError}
        onRetry={retry}
      />
    </>
  );
}

export default Home;
