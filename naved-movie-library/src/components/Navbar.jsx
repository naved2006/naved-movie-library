import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/authReducer";
import { LogoMark, MenuIcon, CloseIcon, SearchIcon } from "./Icons";

function Navbar() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    navigate("/login");
  };

  const initial = user?.email?.[0]?.toUpperCase() || "?";

  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <LogoMark />
          <span>Naved</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon size={22} /> : <MenuIcon />}
        </button>

        <nav
          id="site-nav"
          className={`site-nav${open ? " is-open" : ""}`}
          aria-label="Main"
        >
          <NavLink to="/" end className="nav-link" onClick={closeMenu}>
            Films
          </NavLink>

          <NavLink to="/search" className="nav-link" onClick={closeMenu}>
            <SearchIcon size={16} />
            Search
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/profile" className="nav-link" onClick={closeMenu}>
                <span className="avatar-sm" aria-hidden="true">
                  {initial}
                </span>
                Profile
              </NavLink>

              <button
                type="button"
                className="nav-link nav-button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn btn-amber btn-sm nav-login"
              onClick={closeMenu}
            >
              Log in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
