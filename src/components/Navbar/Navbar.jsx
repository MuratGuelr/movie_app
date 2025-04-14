import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const loc = location.pathname;
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="nav-link">
          Movie App
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${loc === "/" ? "active" : ""}`}>
          Home
        </Link>
        <Link
          to="/favorites"
          className={`nav-link ${loc === "/favorites" ? "active" : ""}`}
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
