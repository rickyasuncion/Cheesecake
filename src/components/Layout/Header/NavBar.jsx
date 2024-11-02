// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-6">
      <Link to={"/home"}>
        <h1 className="text-xl font-bold">CheeseCake</h1>
      </Link>
      <nav className="hidden md:flex space-x-4 text-sm">
        <Link to={"/movies"} className="hover:text-yellow-400">
          Movies
        </Link>
        <Link to="/tvShows" className="hover:text-yellow-400">
          TV Shows
        </Link>
        <Link to="/free-movies" className="hover:text-yellow-400">
          Free Movies
        </Link>
        <Link to="/Kids" className="hover:text-yellow-400">
          Kids
        </Link>
        {/* Update the Genres button to link to the Genres page */}
        <Link to="/genres" className="hover:text-yellow-400">
          Genres
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
