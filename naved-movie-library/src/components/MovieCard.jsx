import { Link } from "react-router-dom";

import { StarIcon } from "./Icons";
import { posterUrl, getYear, formatRating } from "../utils/format";

function MovieCard({ movie, onRemove }) {
  const poster = posterUrl(movie.poster_path, "w500");
  const rating = formatRating(movie.vote_average);

  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-link">
        <div className="poster">
          {poster ? (
            <img src={poster} alt="" loading="lazy" />
          ) : (
            <div className="poster-fallback">
              <span>{movie.title}</span>
            </div>
          )}

          {rating && (
            <span className="poster-rating">
              <StarIcon size={13} />
              {rating}
            </span>
          )}
        </div>

        <h3 className="card-title">{movie.title}</h3>
        <p className="card-year">{getYear(movie.release_date)}</p>
      </Link>

      {onRemove && (
        <button
          type="button"
          className="btn btn-ghost btn-sm card-remove"
          onClick={() => onRemove(movie.id)}
          aria-label={`Remove ${movie.title}`}
        >
          Remove
        </button>
      )}
    </article>
  );
}

export default MovieCard;
