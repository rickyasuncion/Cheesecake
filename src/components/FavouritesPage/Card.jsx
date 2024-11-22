import React, { useEffect, useState } from "react";
import { fetchData } from "../../_utils/utils";
import { ListFilter, Star, Trash2 } from "lucide-react";
import { deleteUserFavourite } from "../../_utils/firestore";
import { useTranslation } from "react-i18next";

const Card = ({ type, id, handleShowSimilar }) => {
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

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let data = await fetchData(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
      );
      setMovie(data);
    };

    getData();
  }, [type, id]);

  if (!movie) {
    <div>Loading...</div>;
  }

  return (
    <div
      key={id}
      className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
    >
      <div className="relative">
        <a href={`/details/${type}/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
        </a>
        <button
          onClick={() => deleteUserFavourite({ type: type, id: id })}
          className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <a
            href={`/details/${type}/${movie.id}`}
            className="text-xl font-semibold"
          >
            {movie.title || movie.name}
          </a>
          <p className="text-sm text-gray-500">
            (
            {new Date(movie.release_date || movie.first_air_date).getFullYear()}
            )
          </p>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-500">
            {movie.genres && GENRES[movie.genres[0].id]}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">
              {movie.vote_average && movie.vote_average.toFixed(2)}
            </span>
          </div>
        </div>
        <button
          onClick={() =>
            handleShowSimilar({
              title: movie.title || movie.name,
              type: type,
              id: id,
            })
          }
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center justify-center gap-2 transition-colors"
        >
          <ListFilter className="w-4 h-4" />
          {t("View Similar")}
        </button>
      </div>
    </div>
  );
};

export default Card;
