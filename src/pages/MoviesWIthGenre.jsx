import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieCard } from "../components/ui/MovieCard";
import { useTranslation } from "react-i18next";
import horrorHeader from "../media/horror-header.jpg";
import actionHeader from "../media/action-header.jpg";
import animationHeader from "../media/animation-header.jpg";
import dramaHeader from "../media/drama-header.jpg";
import thrillerHeader from "../media/thriller-header.jpg";
import romanceHeader from "../media/romance-header.jpg";
// Add more genre imports as needed

const MoviesWithGenre = () => {
  const { type, genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [headerImage, setHeaderImage] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [minRating, setMinRating] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const { t, i18n } = useTranslation();

  const genreImages = {
    27: horrorHeader,
    28: actionHeader,
    16: animationHeader,
    18: dramaHeader,
    53: thrillerHeader,
    10749: romanceHeader,
    // Add more mappings for other genres
  };

  useEffect(() => {
    setHeaderImage(genreImages[Number(genreId)] || "/default-header.jpg");

    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=${i18n.language}&api_key=bbd89781c7835917a2decb4989b56470`
    )
      .then((res) => res.json())
      .then((data) => setGenreList(data.genres));

    // Fetch movies without filters initially
    fetchMovies();
  }, [genreId, i18n.language]);

  const fetchMovies = (withFilters = false) => {
    setMovies([]); // Clear previous movies

    let url = `https://api.themoviedb.org/3/discover/movie?language=${i18n.language}&api_key=bbd89781c7835917a2decb4989b56470&with_genres=${genreId}`;

    if (withFilters) {
      if (yearFilter) url += `&year=${yearFilter}`;
      if (minRating) url += `&vote_average.gte=${minRating}`;
    }

    for (let i = 1; i <= 5; i++) {
      fetch(url + `&page=${i}`)
        .then((res) => res.json())
        .then((data) => {
          setMovies((prev) => [
            ...prev,
            ...data.results.filter(
              (movie) => !prev.find((m) => m.id === movie.id)
            ),
          ]);
        });
    }
  };

  return (
    <div className="bg-[#171c21] text-secondary pt-5 pb-16">
      <div className="container">
        <div className="pt-48 pb-3 relative overflow-hidden rounded-md isolate">
          <div className="bg-neutral-900/60 absolute top-0 bottom-0 z-10 w-full">
            <h1 className="px-4 font-semibold text-3xl text-white absolute bottom-3 capitalize">
              {t(type)} -{" "}
              {genreList.find((genre) => genre.id.toString() === genreId)?.name}
            </h1>
          </div>
          <img
            src={headerImage}
            alt="Genre Header"
            className="absolute top-0 bottom-0 z-5 w-full h-full object-cover"
          />
        </div>

        {/* Filter Button */}
        <div className="relative flex justify-end my-4">
          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-600"
          >
            {t("Filter")}
          </button>

          {showFilter && (
            <div className="absolute top-full right-0 mt-2 bg-white text-black shadow-lg rounded w-60 p-4 z-20">
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">{t("Year")}</label>
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="w-full p-2 border rounded text-black"
                >
                  <option value="">{t("All Years")}</option>
                  {[...Array(50)].map((_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  {t("Minimum Rating")}
                </label>
                <input
                  type="number"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="w-full p-2 border rounded text-black"
                  placeholder={t("Enter Rating (1-10)")}
                  min="1"
                  max="10"
                />
              </div>

              <button
                onClick={() => {
                  setShowFilter(false);
                  fetchMovies(true);
                }}
                className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded w-full hover:bg-yellow-600"
              >
                {t("Show Results")}
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-3 flex-wrap mt-10">
          {movies &&
            movies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  media_type={"movie"}
                  title={movie.title}
                  name={movie.name}
                  poster_path={movie.poster_path}
                  href={`/details/movie/${movie.id}`}
                  className="flex-1 min-w-44 max-w-60"
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MoviesWithGenre;
