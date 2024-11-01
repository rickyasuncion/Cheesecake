import React from "react";

const DetailsInfo = ({ movie, t }) => {
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
          <strong>{t("Runtime")}:</strong> {movie.runtime}
        </p>
        <p>
          <strong>{t("Genres")}:</strong>{" "}
          {movie.genres.map((genre) => genre.name).join(", ")}
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
          <strong>{t("Vote Average")}:</strong> {movie.vote_average} (
          {movie.vote_count} {t("votes")})
        </p>
      </div>
    </div>
  );
};

export default DetailsInfo;
