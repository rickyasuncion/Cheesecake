import React, { useState, useEffect } from "react";

const DetailsInfo = ({ movie, t }) => {
  const [language, setLanguages] = useState({});

  useEffect(() => {
    // 請求語言列表
    const fetchLanguages = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/configuration/languages?api_key=bbd89781c7835917a2decb4989b56470`
        );
        const data = await response.json();

        // 將語言列表轉換成一個對照表
        const languageMap = {};
        data.forEach((lang) => {
          languageMap[lang.iso_639_1.toUpperCase()] = lang.english_name;
        });
        setLanguages(languageMap); // 存儲語言對照表
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <div>
      <h2 className="text-xl italic mb-4">{movie.tagline}</h2>
      <p className="mb-4">{movie.overview}</p>
      <div className="mb-4">
        <p>
          <strong>{t("Release Date")}:</strong>{" "}
          {new Date(movie.release_date).toLocaleDateString()}
        </p>
        <p>
          <strong>{t("Runtime")}:</strong> {movie.runtime} {t("minutes")}
        </p>
        <p>
          <strong>{t("Genres")}:</strong>{" "}
          {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p>
          <strong>{t("Original Language")}:</strong>{" "}
          {language[movie.original_language.toUpperCase()] || "N/A"}
        </p>
        <p>
          <strong>{t("Director")}:</strong>{" "}
          {movie.crew?.find((member) => member.job === "Director")?.name ||
            "N/A"}
        </p>
        <p>
          <strong>{t("Cast")}:</strong>{" "}
          {movie.cast
            ?.slice(0, 5)
            .map((actor) => actor.name)
            .join(", ") || "N/A"}
        </p>
        <p>
          <strong>{t("Budget")}:</strong> ${movie.budget.toLocaleString()}
        </p>
        <p>
          <strong>{t("Revenue")}:</strong> ${movie.revenue.toLocaleString()}
        </p>
        <p>
          <strong>{t("Vote Average")}:</strong> {movie.vote_average} (
          {movie.vote_count} {t("votes")})
        </p>
      </div>
    </div>
  );
};

export default DetailsInfo;
