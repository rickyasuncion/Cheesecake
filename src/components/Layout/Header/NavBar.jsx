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
        <div className="relative group">
          <button className="hover:text-yellow-400">Genres</button>
          <div className="absolute hidden group-hover:block text-white w-40 bg-gray-800 rounded-md shadow-lg p-1">
            <Link
              to="/home"
              className="block px-3 py-1 text-sm hover:bg-gray-700 rounded"
            >
              Action
            </Link>
            <Link
              to="/home"
              className="block px-3 py-1 text-sm hover:bg-gray-700 rounded"
            >
              Drama
            </Link>
            <Link
              to="/home"
              className="block px-3 py-1 text-sm hover:bg-gray-700 rounded"
            >
              Comedy
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
