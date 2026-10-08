import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import {
  logout,
  removeFavorite,
  removeFromWatchlist,
} from "../redux/authReducer";

import MovieCard from "../components/MovieCard";
import StateMessage from "../components/StateMessage";

function Shelf({ title, movies, emptyTitle, emptyText, onRemove }) {
  return (
    <section className="shelf" aria-label={title}>
      <div className="shelf-head">
        <h2 className="section-title">{title}</h2>
        <p className="shelf-count">{movies.length}</p>
      </div>

      {movies.length === 0 ? (
        <StateMessage
          title={emptyTitle}
          action={
            <Link to="/" className="btn btn-ghost btn-sm">
              Browse films
            </Link>
          }
        >
          {emptyText}
        </StateMessage>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onRemove={onRemove} />
          ))}
        </div>
      )}
    </section>
  );
}

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, favorites, watchlist } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const email = user?.email || "No user information";
  const initial = user?.email?.[0]?.toUpperCase() || "?";

  return (
    <div className="profile-page">
      <div className="wrap">
        <div className="profile-head">
          <div className="avatar" aria-hidden="true">
            {initial}
          </div>

          <div className="profile-id">
            <h1 className="profile-email">{email}</h1>
            <p className="profile-counts">
              <span>
                {favorites.length}{" "}
                {favorites.length === 1 ? "favorite" : "favorites"}
              </span>
              <span>{watchlist.length} on watchlist</span>
            </p>
          </div>

          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>

        <Shelf
          title="Favorites"
          movies={favorites}
          emptyTitle="No favorites yet"
          emptyText="Open a film and choose Add to favorites to keep it here."
          onRemove={(id) => dispatch(removeFavorite(id))}
        />

        <Shelf
          title="Watchlist"
          movies={watchlist}
          emptyTitle="Your watchlist is empty"
          emptyText="Open a film and choose Add to watchlist to save it for later."
          onRemove={(id) => dispatch(removeFromWatchlist(id))}
        />
      </div>
    </div>
  );
}

export default Profile;
