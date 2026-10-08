import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { fetchMovieDetails } from "../redux/movieReducer";

import {
  addFavorite,
  removeFavorite,
  addToWatchlist,
  removeFromWatchlist,
} from "../redux/authReducer";

import StateMessage from "./StateMessage";
import {
  ArrowLeftIcon,
  StarIcon,
  HeartIcon,
  PlusIcon,
  CheckIcon,
} from "./Icons";
import {
  backdropUrl,
  posterUrl,
  getYear,
  formatRating,
  formatRuntime,
  formatDate,
} from "../utils/format";

function DetailsSkeleton() {
  return (
    <div className="details" aria-busy="true" aria-label="Loading movie details">
      <div className="details-backdrop" />
      <div className="wrap details-inner">
        <div className="details-layout">
          <div className="skeleton details-poster" />
          <div>
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line short" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [notice, setNotice] = useState("");

  const { selectedMovie, loading, error } = useSelector(
    (state) => state.movies
  );

  const { isAuthenticated, favorites, watchlist } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    setNotice("");
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  const ready = selectedMovie && String(selectedMovie.id) === String(id);

  if (!ready && error && !loading) {
    return (
      <div className="wrap details-error">
        <StateMessage
          tone="error"
          title="Movie details could not be loaded"
          action={
            <button
              type="button"
              className="btn btn-amber"
              onClick={() => dispatch(fetchMovieDetails(id))}
            >
              Try again
            </button>
          }
        >
          {error}
        </StateMessage>
      </div>
    );
  }

  if (!ready) {
    return <DetailsSkeleton />;
  }

  const movie = selectedMovie;

  const isFavorite = favorites.some((item) => item.id === movie.id);
  const isInWatchlist = watchlist.some((item) => item.id === movie.id);

  const handleFavorite = () => {
    if (!isAuthenticated) {
      setNotice("favorites");
      return;
    }

    setNotice("");

    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  const handleWatchlist = () => {
    if (!isAuthenticated) {
      setNotice("watchlist");
      return;
    }

    setNotice("");

    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

  const backdrop = backdropUrl(movie.backdrop_path);
  const poster = posterUrl(movie.poster_path, "w500");
  const rating = formatRating(movie.vote_average);
  const runtime = formatRuntime(movie.runtime);

  const languages = movie.spoken_languages?.length
    ? movie.spoken_languages
        .map((language) => language.english_name)
        .join(", ")
    : "N/A";

  const cast = movie.credits?.cast?.slice(0, 8) || [];

  return (
    <div className="details">
      <div className="details-backdrop">
        {backdrop && <img src={backdrop} alt="" />}
      </div>

      <div className="wrap details-inner">
        <Link to="/" className="back-link">
          <ArrowLeftIcon size={16} />
          All films
        </Link>

        <div className="details-layout">
          <div className="details-poster">
            {poster ? (
              <img src={poster} alt={`Poster for ${movie.title}`} />
            ) : (
              <div className="poster-fallback">
                <span>{movie.title}</span>
              </div>
            )}
          </div>

          <div className="details-content">
            <h1 className="details-title">{movie.title}</h1>

            {movie.tagline && <p className="details-tagline">{movie.tagline}</p>}

            <p className="details-meta">
              {rating && (
                <span className="rating">
                  <StarIcon size={16} />
                  {rating}
                  {movie.vote_count > 0 && (
                    <span className="rating-count">
                      ({movie.vote_count.toLocaleString()} votes)
                    </span>
                  )}
                </span>
              )}
              <span>{getYear(movie.release_date)}</span>
              {runtime && <span>{runtime}</span>}
            </p>

            {movie.genres?.length > 0 && (
              <ul className="pill-list" aria-label="Genres">
                {movie.genres.map((genre) => (
                  <li className="pill" key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            )}

            <p className="details-overview">
              {movie.overview || "No description available."}
            </p>

            <div className="details-actions">
              <button
                type="button"
                className={`btn ${isFavorite ? "btn-rose" : "btn-ghost"}`}
                onClick={handleFavorite}
                aria-pressed={isFavorite}
              >
                <HeartIcon size={18} filled={isFavorite} />
                {isFavorite ? "In favorites" : "Add to favorites"}
              </button>

              <button
                type="button"
                className={`btn ${isInWatchlist ? "btn-amber" : "btn-ghost"}`}
                onClick={handleWatchlist}
                aria-pressed={isInWatchlist}
              >
                {isInWatchlist ? <CheckIcon size={18} /> : <PlusIcon size={18} />}
                {isInWatchlist ? "On watchlist" : "Add to watchlist"}
              </button>
            </div>

            {notice && (
              <p className="notice" role="status">
                {notice === "favorites"
                  ? "Log in to save favorites."
                  : "Log in to use your watchlist."}{" "}
                <Link to="/login">Log in</Link>
              </p>
            )}

            <dl className="facts">
              <div>
                <dt>Release date</dt>
                <dd>{formatDate(movie.release_date)}</dd>
              </div>

              <div>
                <dt>Language</dt>
                <dd>{languages}</dd>
              </div>
            </dl>

            {cast.length > 0 && (
              <section aria-labelledby="cast-heading">
                <h2 className="subhead" id="cast-heading">
                  Cast
                </h2>

                <ul className="cast-list">
                  {cast.map((actor) => (
                    <li key={actor.cast_id ?? actor.id}>
                      <strong>{actor.name}</strong>
                      {actor.character && <span>{actor.character}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
