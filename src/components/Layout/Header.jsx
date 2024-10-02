// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useLanguage } from "../../_utils/LanguageContext";
// import "../LanguageSelector.css";
// import { Button } from "../ui/button";
// import Input from "../ui/input";
// import { FaHeart } from "react-icons/fa";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "../ui/sheet";
// import { TextAlignJustifyIcon } from "@radix-ui/react-icons";
// import { fetchData } from "../../_utils/utils";

// const Header = () => {
//   const { t, i18n } = useTranslation();
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const [open, setOpen] = React.useState(false);
//   const { changeLanguage } = useLanguage();

//   // const toggleDropdown = () => {
//   //   setOpen(!open);
//   // };

//   // State for genres
//   const [genres, setGenres] = useState([]);
//   const [selectedGenres, setSelectedGenres] = useState([]);

//   // State for language dropdown
//   const [languageOpen, setLanguageOpen] = useState(false);

//   // Fetch genres from the TMDB API with error handling
//   useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         const movieGenres = await fetchData(
//           `https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY&language=en-US`
//         );
//         const tvGenres = await fetchData(
//           `https://api.themoviedb.org/3/genre/tv/list?api_key=YOUR_API_KEY&language=en-US`
//         );

//         if (movieGenres && movieGenres.genres && tvGenres && tvGenres.genres) {
//           setGenres([...movieGenres.genres, ...tvGenres.genres]);
//         } else {
//           console.error("Error fetching genres. Response was invalid.");
//         }
//       } catch (error) {
//         console.error("Error fetching genres:", error);
//       }
//     };

//     fetchGenres();
//   }, []);

//   // Handle genre selection
//   const handleCheckboxChange = (genreId) => {
//     if (selectedGenres.includes(genreId)) {
//       setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
//     } else {
//       setSelectedGenres([...selectedGenres, genreId]);
//     }
//   };

//   // Handle filtering by genres
//   const handleSubmitGenres = () => {
//     navigate("/filtered-content", { state: { genres: selectedGenres } });
//   };

//   const handleLanguageChange = (lng) => {
//     changeLanguage(lng);
//     setOpen(false);
//     i18n.changeLanguage(lng); // Use i18n to change language
//   };

//   const handleSearch = (event) => {
//     event.preventDefault();
//     navigate(`/search/${searchTerm}`);
//   };

//   const toggleLanguageDropdown = () => {
//     setLanguageOpen(!languageOpen);
//   };

//   return (
//     <header className="bg-[#1c1c1e] p-4 flex justify-between items-center">
//       <div className="flex items-center">
//         <h1 className="text-white text-2xl font-bold">
//           <Link to="/home">Cheesecake</Link>
//         </h1>
//         <nav className="ml-10 hidden xl:block">
//           <ul className="flex space-x-6">
//             <li className="text-gray-300 hover:text-white">
//               <Link to="/movies">{t("Movies")}</Link>
//             </li>
//             <li className="text-gray-300 hover:text-white">
//               <Link to="/home">{t("TV Shows")}</Link>
//             </li>

//             {/* Genres Dropdown Menu */}
//             <li className="text-gray-300 hover:text-white relative">
//               <button className="hover:text-white">Genres</button>
//               <div className="absolute bg-gray-800 text-white p-4 rounded shadow-lg top-full mt-2 z-10">
//                 {genres.length > 0 ? (
//                   genres.map((genre) => (
//                     <div key={genre.id} className="flex items-center mb-2">
//                       <input
//                         type="checkbox"
//                         id={genre.id}
//                         value={genre.id}
//                         checked={selectedGenres.includes(genre.id)}
//                         onChange={() => handleCheckboxChange(genre.id)}
//                         className="mr-2"
//                       />
//                       <label htmlFor={genre.id}>{genre.name}</label>
//                     </div>
//                   ))
//                 ) : (
//                   <p>Loading genres...</p>
//                 )}
//                 <button
//                   className="mt-4 p-2 bg-yellow-500 text-white rounded"
//                   onClick={handleSubmitGenres}
//                 >
//                   Filter
//                 </button>
//               </div>
//             </li>

//             <li className="text-gray-300 hover:text-white">
//               <Link to="/home">{t("More")}</Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//       <div className="flex items-center space-x-2">
//         <form onSubmit={handleSearch} className="items-center hidden xl:flex">
//           <Input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder={t("Search...")}
//             className="bg-gray-800 text-white placeholder-gray-500 rounded-l-md p-2 w-64"
//           />
//           <Button type="submit" className="rounded-r-md">
//             {t("Search")}
//           </Button>
//         </form>

//         <Button
//           asChild
//           className="bg-transparent outline p-2 outline-red-600 hover:bg-transparent"
//         >
//           <Link to={"/favourites"}>
//             <FaHeart className="text-red-600 text-xl" />
//           </Link>
//         </Button>

//         <div className=" hidden xl:flex ">
//           <button className="text-gray-300 hover:text-white">
//             <span className="material-icons">{t("notifications")}</span>
//           </button>
//           <div className="relative">
//             <button
//               className="text-gray-300 hover:text-white"
//               onClick={toggleLanguageDropdown}
//             >
//               <span className="material-icons">{t("Language")}</span>
//             </button>
//             {languageOpen && (
//               <div className="absolute bg-gray-800 text-white p-4 rounded shadow-lg top-full mt-2 z-10">
//                 <button onClick={() => handleLanguageChange("en-US")}>
//                   English
//                 </button>
//                 <button onClick={() => handleLanguageChange("zh-CN")}>
//                   中文
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <Link className="text-gray-300 hover:text-white" to="/login">
//           <span className="material-icons">{t("Login")}</span>
//         </Link>

//         <Sheet>
//           <SheetTrigger className="xl:hidden">
//             <TextAlignJustifyIcon className="text-white size-8" />
//           </SheetTrigger>
//           <SheetContent>
//             <ul className="space-y-6 mt-10">
//               <li className="text-gray-300 hover:text-white">
//                 <Link to="/movies">{t("Movies")}</Link>
//               </li>
//               <li className="text-gray-300 hover:text-white">
//                 <Link to="/home">{t("TV Shows")}</Link>
//               </li>

//               {/* Genres Dropdown for Mobile */}
//               <li className="text-gray-300 hover:text-white">
//                 <div className="bg-gray-800 text-white p-4 rounded shadow-lg">
//                   {genres.length > 0 ? (
//                     genres.map((genre) => (
//                       <div key={genre.id} className="flex items-center mb-2">
//                         <input
//                           type="checkbox"
//                           id={genre.id}
//                           value={genre.id}
//                           checked={selectedGenres.includes(genre.id)}
//                           onChange={() => handleCheckboxChange(genre.id)}
//                           className="mr-2"
//                         />
//                         <label htmlFor={genre.id}>{genre.name}</label>
//                       </div>
//                     ))
//                   ) : (
//                     <p>Loading genres...</p>
//                   )}
//                   <button
//                     className="mt-4 p-2 bg-yellow-500 text-white rounded"
//                     onClick={handleSubmitGenres}
//                   >
//                     Filter
//                   </button>
//                 </div>
//               </li>

//               <li className="text-gray-300 hover:text-white">
//                 <Link to="/home">{t("More")}</Link>
//               </li>
//             </ul>

//             {/* <form onSubmit={handleSearch} className="flex items-center mt-5">
//               <Input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder={t("Search...")}
//                 className="bg-gray-800 text-white placeholder-gray-500 rounded-l-md p-2 w-64"
//               /> */}
//             {/* <Button type="submit" className="rounded-r-md">
//                 {t("Search")}
//               </Button>
//             </form> */}
//           </SheetContent>
//         </Sheet>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../_utils/LanguageContext";
import "../LanguageSelector.css";
import { Button } from "../ui/button";
import Input from "../ui/input";
import { FaHeart } from "react-icons/fa";
import { TextAlignJustifyIcon } from "@radix-ui/react-icons"; // Make sure Radix UI is installed
import { fetchData } from "../../_utils/utils";
import "./Header.css";

// Import Sheet, SheetTrigger, SheetContent from your UI library, or replace them if not needed
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"; // Assuming this is where the components are located

const Header = () => {
  const { t, i18n } = useTranslation(); // Ensure i18n is used from useTranslation
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { changeLanguage } = useLanguage();

  // State for genres dropdown
  const [genresDropdownOpen, setGenresDropdownOpen] = useState(false);

  // State for language dropdown
  const [languageOpen, setLanguageOpen] = useState(false);

  // State for genres
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genresRef = useRef(null);

  // Fetch genres from the TMDB API with error handling
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const movieGenres = await fetchData(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
        );
        const tvGenres = await fetchData(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
        );

        if (movieGenres && movieGenres.genres && tvGenres && tvGenres.genres) {
          // Combine genres based on both name and id
          const combinedGenres = [...movieGenres.genres, ...tvGenres.genres];
          const uniqueGenres = combinedGenres.filter(
            (genre, index, self) =>
              index ===
              self.findIndex((g) => g.id === genre.id && g.name === genre.name)
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
  }, []);

  // Handle genre selection
  const handleCheckboxChange = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  // Handle filtering by genres
  const handleSubmitGenres = () => {
    setGenresDropdownOpen(false); // Close the genres dropdown after selection
    navigate("/filtered-content", { state: { genres: selectedGenres } });
  };

  const handleLanguageChange = (lng) => {
    changeLanguage(lng);
    setLanguageOpen(false);
    i18n.changeLanguage(lng); // Use i18n to change language
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  const toggleLanguageDropdown = () => {
    setLanguageOpen(!languageOpen);
    setGenresDropdownOpen(false); // Close genres dropdown when language dropdown is opened
  };

  const toggleGenresDropdown = () => {
    setGenresDropdownOpen(!genresDropdownOpen);
    setLanguageOpen(false); // Close language dropdown when genres dropdown is opened
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (genresRef.current && !genresRef.current.contains(event.target)) {
        setGenresDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [genresRef]);

  return (
    <header className="bg-[#1c1c1e] p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-white text-2xl font-bold">
          <Link to="/home">Cheesecake</Link>
        </h1>
        <nav className="ml-10 hidden xl:block">
          <ul className="flex space-x-6">
            <li className="text-gray-300 hover:text-white">
              <Link to="/movies">{t("Movies")}</Link>
            </li>
            <li className="text-gray-300 hover:text-white">
              <Link to="/home">{t("TV Shows")}</Link>
            </li>

            {/* Genres Dropdown Menu */}
            <li
              className="text-gray-300 hover:text-white relative"
              ref={genresRef}
            >
              <button
                className="hover:text-white"
                onClick={toggleGenresDropdown}
              >
                Genres
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
                    <p>Loading genres...</p>
                  )}
                  <button
                    className="mt-4 p-2 bg-yellow-500 text-white rounded"
                    onClick={handleSubmitGenres}
                  >
                    Filter
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

      <div className="flex items-center space-x-2">
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

        <Link className="text-gray-300 hover:text-white" to="/login">
          <span className="material-icons">{t("Login")}</span>
        </Link>

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

              {/* Genres Dropdown Menu */}
              <li className="text-gray-300 hover:text-white relative">
                <button className="hover:text-white">Genres</button>
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
                    Filter
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
  );
};

export default Header;
