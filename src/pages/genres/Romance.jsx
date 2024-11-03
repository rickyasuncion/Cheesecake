import React, { useEffect, useState } from 'react';
import { fetchData } from '../../_utils/utils.js';
import MovieListViewAll from '../../components/LandingPage/MovieListViewAll.jsx';
import { useTranslation } from 'react-i18next';


const Romance = () => {
  const { i18n } = useTranslation();
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [year, setYear] = useState('');
  const [language, setLanguage] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchRomanceMovies = async () => {
    try {
      const response = await fetchData(
        `https://api.themoviedb.org/3/discover/movie?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}&with_genres=10749&sort_by=${sortBy}${year ? `&primary_release_year=${year}` : ''}${language ? `&with_original_language=${language}` : ''}`
      );
      if (response && response.results) {
        setRomanceMovies(response.results);
      } else {
        console.error("No results found in the response:", response);
      }
    } catch (error) {
      console.error("Error fetching romance movies:", error);
    }
  };

  useEffect(() => {
    fetchRomanceMovies();
  }, [i18n.language, sortBy, year, language]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <div
        //className="relative bg-cover bg-center h-80 flex items-center justify-center"
        //style={{
          //backgroundImage: `url(${backgroundImage})`, // Use the imported image here
        //}}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-yellow-400 tracking-wider animate-fadeInUp">Romance Movies</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-md mx-auto animate-fadeIn">
            Fall in love with our collection of romantic movies!
          </p>
        </div>
      </div>

      {/* Filter Button */}
      <div className="flex justify-end mt-4 px-8">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-yellow-400 text-gray-900 px-4 py-2 rounded font-semibold hover:bg-yellow-500 transition duration-200 ease-in-out"
        >
          Filter
        </button>
      </div>

      {/* Filter Dropdown */}
      {showFilters && (
        <div className="absolute right-8 mt-2 p-4 bg-gray-800 border border-gray-700 rounded shadow-lg w-64 z-10">
          {/* Include your Filters component here */}
        </div>
      )}

      {/* Display all romance movies using MovieListViewAll */}
      <div className="p-2">
        <MovieListViewAll movies={romanceMovies} title="All Romance Movies" />
      </div>
    </div>
  );
};

export default Romance;
