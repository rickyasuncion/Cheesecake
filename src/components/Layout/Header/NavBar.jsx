import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GenresDropdown from "./GenresDropdown";

const NavBar = () => {
  const { t } = useTranslation();
  const [genresDropdownOpen, setGenresDropdownOpen] = useState(false);
  const genresRef = useRef(null);

  const toggleGenresDropdown = () => {
    setGenresDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="hidden xl:block">
      <ul className="flex gap-6">
        <li className="text-gray-300 hover:text-white">
          <Link to="/home" className="text-white text-2xl font-bold">
            Cheesecake
          </Link>
        </li>
        <li className="text-gray-300 hover:text-white">
          <Link to="/movies">{t("Movies")}</Link>
        </li>
        <li className="text-gray-300 hover:text-white">
          <Link to="/tvShows">{t("TV Shows")}</Link>
        </li>
        <li className="text-gray-300 hover:text-white">
          <Link to="/free-movies">{t("Free Movies")}</Link>
        </li>
        <li className="text-gray-300 hover:text-white">
          <Link to="/about">{t("About")}</Link>
        </li>
        <li className="text-gray-300 hover:text-white">
          <Link to="/Kids">{t("Kids")}</Link>
        </li>

        <li className="text-gray-300 hover:text-white relative" ref={genresRef}>
          <button className="hover:text-white" onClick={toggleGenresDropdown}>
            {t("Genres")}
          </button>
          {genresDropdownOpen && (
            <GenresDropdown toggleGenresDropdown={toggleGenresDropdown} />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
