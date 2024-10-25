import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { getUserNotifications } from "../../_utils/firestore";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();

  const [genresDropdownOpen, setGenresDropdownOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { user, firebaseSignOut } = useUserAuth();
  const genresRef = useRef(null);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef(null);
  const moreRef = useRef(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const movieGenres = await fetchData(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
        );
        const tvGenres = await fetchData(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
        );

        if (movieGenres && movieGenres.genres && tvGenres && tvGenres.genres) {
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

    const fetchUserNotifications = async () => {
      if (user) {
        const fetchedNotifications = await getUserNotifications(user.uid);
        setNotifications(fetchedNotifications);
      }
    };

    fetchGenres();
    fetchUserNotifications();
  }, [i18n.language, user]);

  const handleCheckboxChange = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
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
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };

  const toggleLanguageDropdown = () => {
    setLanguageOpen((prev) => !prev);
    setGenresDropdownOpen(false);
    setMoreDropdownOpen(false);
  };

  const toggleGenresDropdown = () => {
    setGenresDropdownOpen((prev) => !prev);
    setLanguageOpen(false);
    setMoreDropdownOpen(false);
  };

  const toggleMoreDropdown = () => {
    setMoreDropdownOpen((prev) => !prev);
    setGenresDropdownOpen(false);
    setLanguageOpen(false);
  };

  const toggleNotificationsDropdown = () => {
    setNotificationsOpen((prev) => !prev);
    setMoreDropdownOpen(false); // Close "More" dropdown when notifications are opened
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (genresRef.current && !genresRef.current.contains(event.target)) {
        setGenresDropdownOpen(false);
      }

      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreDropdownOpen(false); // Close "More" dropdown if clicked outside
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [genresRef]);

  return (
    <div className="bg-[#1c1c1e]">
      <header className="py-3 container flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Link to="/home" className="text-white text-2xl font-bold">
            Cheesecake
          </Link>
          <nav className="hidden xl:block">
            <ul className="flex gap-6">
              <li className="text-gray-300 hover:text-white">
                <Link to="/movies">{t("Movies")}</Link>
              </li>
              <li className="text-gray-300 hover:text-white">
                <Link to="/tvShows">{t("TV Shows")}</Link>
              </li>
              <li className="text-gray-300 hover:text-white">
                <Link to="/free-movies">{t("Free Movies")}</Link>
              </li>
              {/* <li className="text-gray-300 hover:text-white">*/}
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
            </ul>
          </nav>
        </div>

        {/* Right Section */}
        <div className="header-right flex items-center gap-3">
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

          <div className="relative" ref={notificationsRef}>
            <button
              className="text-gray-300 hover:text-white"
              onClick={toggleNotificationsDropdown}
            >
              {t("Notifications")}{" "}
              {notifications.length > 0 && (
                <span>({notifications.length})</span>
              )}
            </button>
            {notificationsOpen && (
              <div className="absolute bg-gray-800 text-white p-4 rounded shadow-lg top-full mt-2 z-10">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div key={notif.id} className="notification-item">
                      {notif.message}
                    </div>
                  ))
                ) : (
                  <p>{t("No notifications")}</p>
                )}
              </div>
            )}
          </div>

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

          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <TextAlignJustifyIcon className="mr-2" />
                {t("Menu")}
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col">
                {user ? (
                    <Link className="p-2 text-white" onClick={() => firebaseSignOut()}>
                      {t("Logout")}
                    </Link>
                ) : (
                  <Link className="p-2 text-white" to="/login">
                    {t("Login")}
                  </Link>
                )}
                <Link to="/movies" className="p-2 text-white">
                  {t("Movies")}
                </Link>
                <Link to="/tvShows" className="p-2 text-white">
                  {t("TV Shows")}
                </Link>
                <Link to="/settings" className="p-2 text-white">
                  {t("Settings")}
                </Link>
                <Link to="/about" className="p-2 text-white">
                  {t("About")}
                </Link>
                <Link to="/terms-of-use" className="p-2 text-white">
                  {t("Terms of Use")}
                </Link>
                <Link to="/favourites" className="p-2 text-white">
                  <FaHeart className="text-red-600 inline" /> {t("Favourites")}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
};

export default Header;
