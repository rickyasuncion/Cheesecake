import React from "react";
import { Link } from "react-router-dom";

const Recommended = ({ recommendedMovies, type, t }) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg mb-4">
        {type === "tv-shows" ? t("Similar TV Shows:") : t("Similar Movies:")}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {recommendedMovies.map((recMovie) => {
          const isRecMovieFree = recMovie?.providers?.CA?.free;
          return (
            <Link to={`/details/${type}/${recMovie.id}`} key={recMovie.id}>
              <div
                style={{
                  position: "relative",
                  width: "154px",
                  margin: "0 auto",
                }}
              >
                {recMovie.isFree && (
                  <div
                    className="absolute bg-red-600 text-white px-2 py-1 rounded"
                    style={{
                      top: "10px",
                      left: "10px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      zIndex: 10,
                    }}
                  >
                    {t("Free")}
                  </div>
                )}
                <img
                  src={`https://image.tmdb.org/t/p/w154${recMovie.poster_path}`}
                  alt={recMovie.title || recMovie.name}
                  style={{
                    width: "154px",
                    borderRadius: "8px",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
                <p
                  className="text-sm mt-2 text-center"
                  style={{
                    textAlign: "center",
                    width: "100%",
                    margin: "8px 0 0 0",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {recMovie.title || recMovie.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Recommended;
