import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSearchMovies,
  clearSearchResults,
} from "../redux/movieReducer";

import MovieCard from "./MovieCard";
import StateMessage from "./StateMessage";
import { MovieGridSkeleton } from "./MovieList";
import { SearchIcon, CloseIcon } from "./Icons";

const SUGGESTIONS = ["Inception", "Dune", "Parasite", "Spirited Away"];

function MovieSearch() {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const { searchResults, loading, error } = useSelector(
    (state) => state.movies
  );

  const searchText = query.trim();

  useEffect(() => {
    if (!searchText) {
      dispatch(clearSearchResults());
      return;
    }

    const timer = setTimeout(() => {
      dispatch(fetchSearchMovies(searchText));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchText) {
      dispatch(fetchSearchMovies(searchText));
    }
  };

  const hasResults = searchResults.length > 0;
  const showEmpty =
    Boolean(searchText) && !loading && !error && !hasResults;

  return (
    <div className="search-page">
      <div className="wrap">
        <div className="search-head">
          <h1 className="page-title">Search films</h1>
          <p className="page-lead">
            Look up any title and open its cast, genres and runtime.
          </p>

          <form className="search-field" onSubmit={handleSubmit} role="search">
            <span className="search-field-icon">
              <SearchIcon size={20} />
            </span>

            <input
              type="search"
              className="search-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for a movie title"
              aria-label="Search for a movie title"
              autoComplete="off"
              autoFocus
            />

            {query && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <CloseIcon size={18} />
              </button>
            )}

            <button type="submit" className="btn btn-amber btn-sm search-submit">
              Search
            </button>
          </form>

          {!searchText && (
            <div className="chips">
              <span className="chips-label">Try</span>

              {SUGGESTIONS.map((title) => (
                <button
                  type="button"
                  className="chip"
                  key={title}
                  onClick={() => setQuery(title)}
                >
                  {title}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="search-results" aria-live="polite">
          {error && (
            <StateMessage tone="error" title="Search failed">
              {error} Check your connection and try again.
            </StateMessage>
          )}

          {loading && !hasResults && <MovieGridSkeleton count={10} />}

          {hasResults && (
            <>
              <div className="section-head">
                <h2 className="section-title">Results</h2>
                <p className="section-sub">
                  {searchResults.length}{" "}
                  {searchResults.length === 1 ? "film" : "films"} for “
                  {searchText}”
                </p>
              </div>

              <div className={`movie-grid${loading ? " is-stale" : ""}`}>
                {searchResults.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </>
          )}

          {showEmpty && (
            <StateMessage title={`No films found for “${searchText}”`}>
              Check the spelling or try a shorter title.
            </StateMessage>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieSearch;
