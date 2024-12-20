import React, { useState } from "react";
import { BookmarkPlus, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  deleteUserFavourite,
  updateUserFavourites,
} from "../../_utils/firestore";
import { useTranslation } from "react-i18next";
import ListModal from "../ListsPage/ListModal";

const MediaCarousel = ({ movies, text, type, userData }) => {
  const { t, i18n } = useTranslation();

  const GENRES = {
    28: t("Action"),
    12: t("Adventure"),
    16: t("Animation"),
    35: t("Comedy"),
    80: t("Crime"),
    99: t("Documentary"),
    18: t("Drama"),
    10751: t("Family"),
    14: t("Fantasy"),
    36: t("History"),
    27: t("Horror"),
    10402: t("Music"),
    9648: t("Mystery"),
    10749: t("Romance"),
    878: t("Science Fiction"),
    10770: t("TV Movie"),
    53: t("Thriller"),
    10752: t("War"),
    37: t("Western"),
    10759: t("Action & Adventure"),
    10762: t("Kids"),
    10763: t("News"),
    10764: t("Reality"),
    10765: t("Sci-Fi & Fantasy"),
    10766: t("Soap"),
    10767: t("Talk"),
    10768: t("War & Politics"),
  };

  movies = movies.slice(0, 18);
  const navigate = useNavigate();
  const moviesPerPage = 6;

  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(0);

  const nextMovies = () => {
    setCurrentMovieIndex((prev) =>
      prev >= movies.length - moviesPerPage ? 0 : prev + moviesPerPage
    );
    console.log(userData);
  };

  const prevMovies = () => {
    setCurrentMovieIndex((prev) =>
      prev === 0 ? movies.length - moviesPerPage : prev - moviesPerPage
    );
  };

  const visibleMovies = movies.slice(
    currentMovieIndex,
    currentMovieIndex + moviesPerPage
  );

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <h2 className="text-2xl text-neutral-900">{text}</h2>
        <div className="flex space-x-2">
          <button
            onClick={prevMovies}
            className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition ${
              movies.length <= moviesPerPage
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={movies.length <= moviesPerPage}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMovies}
            className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition ${
              movies.length <= moviesPerPage
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={movies.length <= moviesPerPage}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {visibleMovies.map((movie) => {
            const genre =
              movie.genre_ids && movie.genre_ids.length
                ? GENRES[movie.genre_ids[0]]
                : "Unknown Genre";

            let favoured = false;
            if (userData) {
              favoured = userData.favourites.some(
                (fav) => fav.type === type && fav.id === movie.id
              );
            }

            return (
              <div
                key={movie.id}
                className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition transform hover:scale-105 duration-300"
              >
                <div className="relative group">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.name || "Movie Poster"}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                    <button
                      onClick={() => navigate(`/details/${type}/${movie.id}`)}
                      className="bg-white text-black px-4 py-2 rounded-full transform -translate-y-2 group-hover:translate-y-0 transition-transform"
                    >
                      {t("View Details")}
                    </button>
                    {userData &&
                      (favoured ? (
                        <button
                          onClick={() =>
                            deleteUserFavourite({ type: type, id: movie.id })
                          }
                          className="flex gap-1 bg-white text-black px-4 py-2 rounded-full transform -translate-y-2 group-hover:translate-y-0 transition-transform"
                        >
                          {t("Remove from")}{" "}
                          <Heart className="fill-rose-500 text-rose-500" />
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            updateUserFavourites({ type: type, id: movie.id })
                          }
                          className="flex gap-1 bg-white text-black px-4 py-2 rounded-full transform -translate-y-2 group-hover:translate-y-0 transition-transform"
                        >
                          {t("Add to")} <Heart />
                        </button>
                      ))}
                    {userData && (
                      <button
                        onClick={() => {
                          setId(movie.id);
                          setIsOpen(true);
                        }}
                        className="flex bg-white text-black px-4 py-2 rounded-full transform -translate-y-2 group-hover:translate-y-0 transition-transform"
                      >
                        {t("Save")}
                        <BookmarkPlus size={20} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-800">
                    {movie.title || movie.name}
                  </h3>
                  <p className="text-sm text-gray-400">{genre}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ListModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        userData={userData}
        type={type}
        id={id}
      />
    </div>
  );
};

export default MediaCarousel;
