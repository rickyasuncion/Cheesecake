import React from "react";

const DetailsInfo = ({ media, t }) => {
  return (
    <div>
      <h2 className="text-xl italic mb-4">{media.title}</h2>
      <p className="mb-4">{media.overview}</p>
      <div className="mb-4">
        <p>
          <strong>{t("Release Date")}:</strong>{" "}
          {new Date(media.release_date).toLocaleDateString()}
        </p>
        <p>
          <strong>{t("Runtime")}:</strong> {media.runtime} {t("minutes")}
        </p>
        <p>
          <strong>{t("Genres")}:</strong>{" "}
          {media.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p>
          <strong>{t("Director")}:</strong>{" "}
          {media.crew?.find((member) => member.job === "Director")?.name ||
            "N/A"}
        </p>
        <p>
          <strong>{t("Cast")}:</strong>{" "}
          {media.cast
            ?.slice(0, 5)
            .map((actor) => actor.name)
            .join(", ") || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default DetailsInfo;
