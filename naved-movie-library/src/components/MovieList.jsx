import MovieCard from "./MovieCard";
import StateMessage from "./StateMessage";

const SKELETON_COUNT = 10;

export function MovieGridSkeleton({ count = SKELETON_COUNT }) {
  return (
    <div className="movie-grid" aria-busy="true" aria-label="Loading movies">
      {Array.from({ length: count }, (_, index) => (
        <div className="card-skeleton" key={index}>
          <div className="skeleton poster-skeleton" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line short" />
        </div>
      ))}
    </div>
  );
}

function MovieList({ movies, loading, error, onRetry }) {
  let content;

  if (loading) {
    content = <MovieGridSkeleton />;
  } else if (error) {
    content = (
      <StateMessage
        tone="error"
        title="Movies could not be loaded"
        action={
          <button type="button" className="btn btn-amber" onClick={onRetry}>
            Try again
          </button>
        }
      >
        {error}
      </StateMessage>
    );
  } else {
    content = (
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }

  return (
    <section className="section" id="popular">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title">Popular right now</h2>
          <p className="section-sub">Ranked by current popularity on TMDB.</p>
        </div>

        {content}
      </div>
    </section>
  );
}

export default MovieList;
