import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FreeMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = "bbd89781c7835917a2decb4989b56470"; // 替換為你的 TMDb API Key
  const country = "CA"; // 設置為加拿大

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const freeMovies = [];

        // 檢查前 5 頁熱門電影
        for (let page = 1; page <= 5; page++) {
          const movieResponse = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
          );
          const movieData = await movieResponse.json();
          const popularMovies = movieData.results;

          // 遍歷每部電影，檢查是否有 Tubi 免費提供商
          const moviesWithTubiLinks = await Promise.all(
            popularMovies.map(async (movie) => {
              const providerResponse = await fetch(
                `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${apiKey}`
              );
              const providerData = await providerResponse.json();

              const providers = providerData.results[country];
              if (providers && providers.ads) {
                const tubiProvider = providers.ads.find((provider) =>
                  provider.provider_name.toLowerCase().includes("tubi")
                );

                // 如果 Tubi 提供免費觀看，將該電影與 Tubi 鏈接加入結果
                if (tubiProvider) {
                  return { ...movie, tubiLink: tubiProvider.link }; // 加入 Tubi 鏈接
                }
              }
              return null; // 沒有找到 Tubi 提供商的電影返回 null
            })
          );

          // 添加到總的免費電影列表中，過濾掉 null 結果
          freeMovies.push(
            ...moviesWithTubiLinks.filter((movie) => movie !== null)
          );
        }

        setMovies(freeMovies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [apiKey]);

  if (loading) {
    return <div>Loading free movies...</div>;
  }

  return (
    <div className="free-movies-container">
      <h1>Free Movies on Tubi (Canada)</h1>
      <div className="movies-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              style={{ marginBottom: "20px" }}
            >
              {/* 修改這裡，將 tubiLink 作為 state 傳遞 */}
              <Link
                to={`/details/movie/${movie.id}`}
                state={{ tubiLink: movie.tubiLink }}
              >
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    style={{
                      borderRadius: "8px",
                      marginBottom: "10px",
                      maxWidth: "154px", // 設置寬度
                      height: "230px", // 設置高度
                    }}
                  />
                )}
              </Link>
              <p>
                <strong>Movie Title:</strong> {movie.title}
              </p>
              <p>
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <p>
                <strong>Vote Average:</strong> {movie.vote_average}
              </p>
              {/* 顯示 Tubi 鏈接 */}
              {movie.tubiLink && (
                <a
                  href={movie.tubiLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: "#ff5500",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    textDecoration: "none",
                  }}
                >
                  <strong>Watch on Tubi</strong>
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No free movies found.</p>
        )}
      </div>
    </div>
  );
};

export default FreeMovies;
