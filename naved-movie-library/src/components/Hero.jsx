import { useState } from "react";
import { Link } from "react-router-dom";

import { StarIcon } from "./Icons";
import {
  backdropUrl,
  posterUrl,
  getYear,
  formatRating,
} from "../utils/format";

const FEATURED_COUNT = 5;

function Hero({ movies, loading, onBrowse }) {
  const [active, setActive] = useState(0);

  const featured = movies.slice(0, FEATURED_COUNT);
  const movie = featured[active] || featured[0];

  if (!movie) {
    if (loading) {
      return (
        <section
          className="hero hero-plain"
          aria-busy="true"
          aria-label="Loading featured film"
        >
          <div className="wrap hero-skeleton">
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line short" />
          </div>
        </section>
      );
    }

    return null;
  }

  const backdrop = backdropUrl(movie.backdrop_path || movie.poster_path);
  const rating = formatRating(movie.vote_average);

  return (
    <section className="hero" aria-label="Featured film">
      <div className="hero-backdrop" key={`bg-${movie.id}`}>
        {backdrop && <img src={backdrop} alt="" />}
      </div>

      <div className="wrap hero-inner">
        <div className="hero-copy" key={`copy-${movie.id}`}>
          <h2 className="hero-title">{movie.title}</h2>

          <p className="hero-meta">
            {rating && (
              <span className="rating">
                <StarIcon size={16} />
                {rating}
              </span>
            )}
            <span>{getYear(movie.release_date)}</span>
          </p>

          {movie.overview && <p className="hero-overview">{movie.overview}</p>}

          <div className="hero-actions">
            <Link to={`/movie/${movie.id}`} className="btn btn-amber">
              View details
            </Link>

            <button type="button" className="btn btn-ghost" onClick={onBrowse}>
              Browse popular films
            </button>
          </div>
        </div>

        {featured.length > 1 && (
          <ul className="hero-picks" aria-label="Choose a featured film">
            {featured.map((item, index) => {
              const thumb = posterUrl(item.poster_path, "w185");

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`hero-pick${index === active ? " is-active" : ""}`}
                    onClick={() => setActive(index)}
                    aria-pressed={index === active}
                    aria-label={`Feature ${item.title}`}
                  >
                    {thumb ? (
                      <img src={thumb} alt="" />
                    ) : (
                      <span className="hero-pick-fallback">{item.title}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Hero;
