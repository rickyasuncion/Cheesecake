import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieCard } from "../components/ui/MovieCard";
import { useTranslation } from "react-i18next";
import horrorHeader from "../media/horror-header.jpg";
import sciFiHeader from "../media/sci-fiction-header.jpg";
import mysteryHeader from "../media/mystery-header.png";
import warHeader from "../media/war-header.jpg";
import crimeHeader from "../media/crime-header.webp";
import adventureHeader from "../media/adventure-header.jpg";
import historyHeader from "../media/history-header.webp";
import animationHeader from "../media/animation-header.webp";
import thrillerHeader from "../media/thriller-header.jpg";
import dramaHeader from "../media/drama-header.jpg";
import actionHeader from "../media/action-header.webp";
import { fetchData } from "../_utils/utils";

const MoviesWithGenre = () => {
  const { media, type, id } = useParams();
  const [movies, setMovies] = useState([]);
  const [headerImage, setHeaderImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // New state for pagination
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const { t, i18n } = useTranslation();

  const genreImages = {
    27: horrorHeader,
    878: sciFiHeader,
    9648: mysteryHeader,
    10752: warHeader,
    80: crimeHeader,
    12: adventureHeader,
    36: historyHeader,
    16: animationHeader,
    53: thrillerHeader,
    18: dramaHeader,
    28: actionHeader,
  };

  useEffect(() => {
    setHeaderImage(genreImages[Number(id)] || "/default-header.jpg");

    const getFormattedDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const today = new Date();
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const lastDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    const fetchMovies = async () => {
      const baseURL = `https://api.themoviedb.org/3/discover/${media}?include_adult=false&include_video=false&language=${i18n.language}&sort_by=popularity.desc&with_genres=${id}&api_key=bbd89781c7835917a2decb4989b56470&page=${currentPage}`;
      let url = baseURL;

      if (type === "popular") {
        url = `${baseURL}`;
      } else if (type === "top_rated") {
        url = `${baseURL}&sort_by=vote_average.desc&vote_count.gte=300`;
      } else if (type === "now_playing") {
        url = `${baseURL}&with_release_type=3&primary_release_date.gte=${getFormattedDate(firstDayOfLastMonth)}&primary_release_date.lte=${getFormattedDate(lastDayOfNextMonth)}`;
      } else if (type === "upcoming") {
        url = `${baseURL}&with_release_type=3&primary_release_date.gte=${getFormattedDate(firstDayOfNextMonth)}&primary_release_date.lte=${getFormattedDate(lastDayOfNextMonth)}`;
      } else if (type === "airing_today" || type === "on_tv") {
        url = `${baseURL}&with_release_type=3&primary_release_date.gte=${getFormattedDate(today)}&primary_release_date.lte=${getFormattedDate(lastDayOfNextMonth)}`;
      }

      const data = await fetchData(url);
      setMovies(data?.results || []);
      setTotalPages(data?.total_pages || 1); // Set total pages
    };

    fetchMovies();
  }, [id, type, i18n.language, currentPage]);

  return (
    <div className="bg-[#171c21] text-secondary pt-5 pb-16">
      <div className="container">
        <div className="pt-48 pb-3 relative overflow-hidden rounded-md isolate">
          <div className="bg-neutral-900/60 absolute top-0 bottom-0 z-10 w-full">
            <h1 className="px-4 font-semibold text-3xl text-white absolute bottom-3 capitalize">
              {t(type)} - {media === "movie" ? "Movies" : "Tv Shows"}
            </h1>
          </div>
          <img
            src={headerImage}
            alt="Genre Header"
            className="absolute top-0 bottom-0 z-5 w-full h-64 object-cover"
          />
        </div>

        {/* Movies List */}
        <div className="flex gap-3 flex-wrap mt-10">
          {movies &&
            movies.map((movie) => (
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
            ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`py-2 px-4 mx-1 rounded ${currentPage === 1 ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"}`}
          >
            {t("Previous")}
          </button>
          <span className="py-2 px-4 mx-1">{`${t("Page")} ${currentPage} ${t("of")} ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`py-2 px-4 mx-1 rounded ${currentPage === totalPages ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"}`}
          >
            {t("Next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviesWithGenre;
