import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../_utils/LanguageContext";
import "../LanguageSelector.css";
import { Button } from "../ui/button";
import Input from "../ui/input";
import { FaHeart } from "react-icons/fa";
import { TextAlignJustifyIcon } from "@radix-ui/react-icons";
import { fetchData } from "../../_utils/utils";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useUserAuth } from "../../_utils/auth-context";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { language, changeLanguage } = useLanguage();

  const [genresDropdownOpen, setGenresDropdownOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false); // New state for 'More' dropdown
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { user, firebaseSignOut } = useUserAuth();
  const genresRef = useRef(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const movieGenres = await fetchData(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY&language=${i18n.language}`
        );
        const tvGenres = await fetchData(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=YOUR_API_KEY&language=${i18n.language}`
        );

        if (movieGenres?.genres && tvGenres?.genres) {
          const combinedGenres = [...movieGenres.genres, ...tvGenres.genres];
          const uniqueGenres = combinedGenres.filter(
            (genre, index, self) =>
              index === self.findIndex((g) => g.id === genre.id)
          );
          setGenres(uniqueGenres);
        } else {
          console.error("Error fetching genres. Response was invalid.");
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, [i18n.language]);

  const handleCheckboxChange = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const handleSubmitGenres = () => {
    setGenresDropdownOpen(false);
    navigate("/filtered-content", { state: { genres: selectedGenres } });
  };

  const handleLanguageChange = (lng) => {
    changeLanguage(lng);
    setLanguageOpen(false);
    i18n.changeLanguage(lng);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  const toggleLanguageDropdown = () => {
    setLanguageOpen(!languageOpen);
    setGenresDropdownOpen(false);
  };

  const toggleGenresDropdown = () => {
    setGenresDropdownOpen(!genresDropdownOpen);
    setLanguageOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (genresRef.current && !genresRef.current.contains(event.target)) {
        setGenresDropdownOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreDropdownOpen(false); // Close 'More' dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [genresRef, moreRef]);

  return (
    <div className="bg-[#1c1c1e]">
      <header className=" py-3 container flex justify-between items-center">
        {/* 左边部分 */}
        <div className="flex items-center gap-3">

          <Link to="/home" className="text-white text-2xl font-bold">Cheesecake</Link>
          <nav className="hidden xl:block">
            <ul className="flex gap-6">
            <li className="text-gray-300 hover:text-white">
              <Link to="/movies">{t("Movies")}</Link>
            </li>
            <li className="text-gray-300 hover:text-white">
              <Link to="/tvShows">{t("TV Shows")}</Link>
            </li>
            <li className="text-gray-300 hover:text-white">
              <Link to="/about">{t("About")}</Link>
            </li>

            <li
              className="text-gray-300 hover:text-white relative"
              ref={genresRef}
            >
              <button
                className="hover:text-white"
                onClick={toggleGenresDropdown}
              >
                {t("Genres")}
              </button>
              {genresDropdownOpen && (
                <div className="absolute bg-gray-800 text-white p-4 rounded shadow-lg top-full mt-2 z-10 genres-dropdown">
                  {genres.length > 0 ? (
                    genres.map((genre) => (
                      <div key={genre.id} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={genre.id}
                          value={genre.id}
                          checked={selectedGenres.includes(genre.id)}
                          onChange={() => handleCheckboxChange(genre.id)}
                          className="mr-2"
                        />
                        <label htmlFor={genre.id}>{genre.name}</label>
                      </div>
                    ))
                  ) : (
                    <p>{t("Loading genres...")}</p>
                  )}
                  <button
                    className="mt-4 p-2 bg-yellow-500 text-white rounded"
                    onClick={handleSubmitGenres}
                  >
                    {t("Filter")}
                  </button>
                </div>
              )}
            </li>

            <li className="text-gray-300 hover:text-white">
              <Link to="/home">{t("More")}</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* 右边部分 */}
      <div className="header-right">
        <form onSubmit={handleSearch} className="items-center hidden xl:flex">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("Search...")}
            className="bg-gray-800 text-white placeholder-gray-500 rounded-l-md p-2 w-64"
          />
          <Button type="submit" className="rounded-r-md">
            {t("Search")}
          </Button>
        </form>

        <Button
          asChild
          className="bg-transparent outline p-2 outline-red-600 hover:bg-transparent"
        >
          <Link to="/favourites">
            <FaHeart className="text-red-600 text-xl" />
          </Link>
        </Button>

        <div className="hidden xl:flex">
          <button className="text-gray-300 hover:text-white">
            <span className="material-icons">{t("notifications")}</span>
          </button>
          <div className="relative">
            <button
              className="text-gray-300 hover:text-white"
              onClick={toggleLanguageDropdown}
            >
              <span className="material-icons">{t("Language")}</span>
            </button>
            {languageOpen && (
              <div className="absolute bg-gray-800 text-white p-4 rounded shadow-lg top-full mt-2 z-10">
                <button onClick={() => handleLanguageChange("en-US")}>
                  English
                </button>
                <button onClick={() => handleLanguageChange("zh-CN")}>
                  中文
                </button>
              </div>
            )}
          </div>
        </div>

        {user ? (
          <Button
            onClick={() => {
              firebaseSignOut();
            }}
          >
            Logout
          </Button>
        ) : (
          <Button>
            <Link className="text-gray-300 hover:text-white" to="/login">
              <span className="material-icons">{t("Login")}</span>
            </Link>
          </Button>
        )}

        <Sheet>
          <SheetTrigger className="xl:hidden">
            <TextAlignJustifyIcon className="text-white size-8" />
          </SheetTrigger>
          <SheetContent>
            <ul className="space-y-6 mt-10">
              <li className="text-gray-300 hover:text-white">
                <Link to="/movies">{t("Movies")}</Link>
              </li>
              <li className="text-gray-300 hover:text-white">
                <Link to="/tvShows">{t("TV Shows")}</Link>
              </li>
              <li className="text-gray-300 hover:text-white">
                <Link to="/about">{t("About")}</Link>
              </li>

              <li
                className="text-gray-300 hover:text-white relative"
                ref={genresRef}
              >
                <button
                  className="hover:text-white"
                  onClick={toggleGenresDropdown}
                >
                  {t("Genres")}
                </button>
                {genresDropdownOpen && (
                  <div className="absolute bg-gray-800 text-white p-4 rounded shadow-lg top-full mt-2 z-10 genres-dropdown">
                    {genres.length > 0 ? (
                      genres.map((genre) => (
                        <div key={genre.id} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={genre.id}
                            value={genre.id}
                            checked={selectedGenres.includes(genre.id)}
                            onChange={() => handleCheckboxChange(genre.id)}
                            className="mr-2"
                          />
                          <label htmlFor={genre.id}>{genre.name}</label>
                        </div>
                      ))
                    ) : (
                      <p>{t("Loading genres...")}</p>
                    )}
                    <button
                      className="mt-4 p-2 bg-yellow-500 text-white rounded"
                      onClick={handleSubmitGenres}
                    >
                      {t("Filter")}
                    </button>
                  </div>
                )}
              </li>

              <li className="text-gray-300 hover:text-white">
                <Link to="/home">{t("More")}</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* 右边部分 */}
        <div className="flex gap-3">
          <form onSubmit={handleSearch} className="items-center hidden xl:flex">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("Search...")}
              className="bg-gray-800 text-white placeholder-gray-500 rounded-l-md p-2 w-64"
            />
            <Button type="submit" className="rounded-r-md">
              {t("Search")}
            </Button>
          </form>

          <Button
            asChild
            className="bg-transparent outline p-2 outline-red-600 hover:bg-transparent"
          >
            <Link to="/favourites">
              <FaHeart className="text-red-600 text-xl" />
            </Link>
          </Button>

          <div className="hidden xl:flex gap-4 items-center">
            <button className="text-gray-300 hover:text-white">
              {t("notifications")}
            </button>

            <div className="relative">
              <button
                className="text-gray-300 hover:text-white"
                onClick={toggleLanguageDropdown}
              >
                {t("Language")}
              </button>
              {languageOpen && (
                <div className="absolute bg-gray-800 text-white p-4 rounded shadow-lg top-full mt-2 z-10">
                  <button onClick={() => handleLanguageChange("en-US")}>
                    English
                  </button>
                  <button onClick={() => handleLanguageChange("zh-CN")}>
                    中文
                  </button>
                </div>
              )}
            </div>

            <Link className="text-gray-300 hover:text-white" to="/login">
              {t("Login")}
            </Link>
          </div>


          <Sheet>
            <SheetTrigger className="xl:hidden">
              <TextAlignJustifyIcon className="text-white size-8" />
            </SheetTrigger>
            <SheetContent>
              <ul className="space-y-6 mt-10">
                <li className="text-gray-300 hover:text-white">
                  <Link to="/movies">{t("Movies")}</Link>
                </li>
                <li className="text-gray-300 hover:text-white">
                  <Link to="/home">{t("TV Shows")}</Link>
                </li>
                <li className="text-gray-300 hover:text-white">
                  <Link to="/about">{t("About")}</Link>
                </li>

                <li className="text-gray-300 hover:text-white relative">
                  <button className="hover:text-white">{t("Genres")}</button>
                  <div className="absolute bg-gray-800 text-white p-4 rounded shadow-lg top-full mt-2 z-10 genres-dropdown">
                    {genres.map((genre) => (
                      <div key={genre.id} className="genres-dropdown-item">
                        <input
                          type="checkbox"
                          id={genre.id}
                          value={genre.id}
                          checked={selectedGenres.includes(genre.id)}
                          onChange={() => handleCheckboxChange(genre.id)}
                          className="mr-2"
                        />
                        <label htmlFor={genre.id}>{genre.name}</label>
                      </div>
                    ))}
                    <button
                      className="mt-4 p-2 bg-yellow-500 text-white rounded"
                      onClick={handleSubmitGenres}
                    >
                      {t("Filter")}
                    </button>
                  </div>
                </li>

                <li className="text-gray-300 hover:text-white">
                  <Link to="/home">{t("More")}</Link>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </header>

    </div>
  );
};

export default Header;
