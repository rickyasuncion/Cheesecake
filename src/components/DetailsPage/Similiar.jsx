import React from "react";
import { useTranslation } from "react-i18next";

const Similiar = ({ similarMovies, type }) => {
  const { t } = useTranslation();

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

  similarMovies = similarMovies.splice(0, 8);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">
        {type === "tv" ? t("Similar Shows") : t("Similar Movies")}
      </h2>
      <div className="grid grid-cols-8 gap-6">
        {similarMovies.map((movie, index) => (
          <div key={index} className="space-y-2">
            <a href={`/details/${type}/${movie.id}`}>
              <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium">{movie.title || movie.name}</h3>
            </a>
            <p className="text-sm text-gray-400">
              {GENRES[movie.genre_ids[0]]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Similiar;
