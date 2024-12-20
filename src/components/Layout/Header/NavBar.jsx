import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GenresDropdown from "./GenresDropdown";

const NavBar = () => {
  const { t } = useTranslation();
  const [isGenresDropdownOpen, setIsGenresDropdownOpen] = useState(false);
  const genresRef = useRef(null);

  const toggleGenresDropdown = () => {
    setIsGenresDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (genresRef.current && !genresRef.current.contains(event.target)) {
        setIsGenresDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center space-x-6">
      <Link to={"/home"}>
        <h1 className="text-xl font-bold">CheeseCake</h1>
      </Link>
      <nav className="hidden md:flex space-x-4 text-sm">
        <Link to={"type/movie"} className="hover:text-yellow-400">
          {t("Movies")}
        </Link>
        <Link to="type/tv" className="hover:text-yellow-400">
          {t("TV Shows")}
        </Link>
        <Link to="/free-movies" className="hover:text-yellow-400">
          {t("Free Movies")}
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
