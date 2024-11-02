import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import kidsImage from "../media/movie-kids.png";
import { fetchData, filterResults } from "../_utils/utils.js";
import MovieListView from "../components/LandingPage/MovieListView.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate



const Kids = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize useNavigate

  const [animatedMovies, setAnimatedMovies] = useState([]);

  // Fetch animated movies from the API
  const fetchAnimatedMovies = async () => {
    try {
      const response = await fetchData(
        `https://api.themoviedb.org/3/discover/movie?api_key=bbd89781c7835917a2decb4989b56470&language=en-US&with_genres=16`
      );
      setAnimatedMovies(filterResults(response));
    } catch (error) {
      console.error("Error fetching animated movies:", error);
    }
  };

  useEffect(() => {
    fetchAnimatedMovies();
  }, []);

  // Handler to navigate to Favorites page
  const goToFavourites = () => {
    navigate("/favourites");
  };

  return (
    <div className="landing-page">
      <div className="relative bg-black isolate text-white overflow-hidden rounded-lg mt-3">
        <img
          src={kidsImage}
          alt="Kids section banner"
          className="-z-10 absolute w-full h-full object-cover opacity-20"
        />
        <div className="py-24 text-center space-y-4">
          <h1 className="text-5xl font-medium">
            {t("Welcome to the Kids Section")}
          </h1>
          <p className="max-w-lg mx-auto">
            {t("Explore our collection of fun and educational movies and shows for kids.")}
          </p>
          <div className="flex justify-center gap-5">
            <button className="text-lg h-auto bg-transparent text-white border border-white rounded px-4 py-2 hover:bg-white hover:text-black transition-colors">
              <span>{t("Browse Kids Movies")}</span>
            </button>
            <button
              className="text-lg h-auto bg-transparent text-white border border-white rounded px-4 py-2 hover:bg-white hover:text-black transition-colors"
              onClick={goToFavourites} // Add onClick to navigate to Favorites
            >

              <span>{t("Your Favourite Kids Movies")}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="py-14">
        <MovieListView
          movies={animatedMovies}
          title={t("Animated Movies for Kids")}
          contentType="animated-movies"
        />
      </div>
      

       {/* Add the EmailSubscription component here */}
      <div className="py-14">
        
      </div>
      
    </div>
  );
};

export default Kids;
