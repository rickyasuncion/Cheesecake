//03
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RiHeartFill } from "react-icons/ri";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { BiPlay } from "react-icons/bi";
import { BsPauseFill } from "react-icons/bs";

const MovieDetails = ({ id: propId }) => {
  const videoRef = useRef(null);

  const { type, id: movieId } = useParams();
  const id = propId || movieId;

  const [movie, setMovie] = useState(null);
  const [trailerVideo, setTrailerVideo] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [englishHomepage, setEnglishHomepage] = useState(null);
  const { t, i18n } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    // Fetch movie details based on current language
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details in the selected language
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
        );
        const data = await response.json();

        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
        );
        const creditsData = await creditsResponse.json();

        setMovie({
          ...data,
          cast: creditsData.cast,
          crew: creditsData.crew,
        });

        // Fetch the English version of the movie details to always have the homepage link
        const englishResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
        );
        const englishData = await englishResponse.json();
        setEnglishHomepage(englishData.homepage);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchMovieVideos = async () => {
      try {
        // Fetch trailer in the current language
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
        );
        const data = await response.json();

        // Check if there are no results in the current language and fallback to English
        if (data.results.length === 0) {
          const fallbackResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
          );
          const fallbackData = await fallbackResponse.json();
          setTrailerVideo(
            fallbackData.results.find(
              (video) => video.site === "YouTube" && video.type === "Trailer"
            )
          );
        } else {
          setTrailerVideo(
            data.results.find(
              (video) => video.site === "YouTube" && video.type === "Trailer"
            )
          );
        }
      } catch (error) {
        console.error("Error fetching movie videos:", error);
      }
    };

    const fetchRecommendedMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
        );
        const data = await response.json();
        setRecommendedMovies(data.results);
      } catch (error) {
        console.error("Error fetching recommended movies:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieVideos();
    fetchRecommendedMovies();
  }, [id, i18n.language]);

  useEffect(() => {
    if (showTrailer && trailerVideo && videoRef.current) {
      videoRef.current.src = `https://www.youtube.com/embed/${trailerVideo.key}?enablejsapi=1&modestbranding=1&controls=1&showinfo=0&rel=0&autoplay=1`;
    }
  }, [showTrailer, trailerVideo]);

  const handlePlayPause = (event) => {
    event.preventDefault(); // Prevent default action
    if (!showTrailer) {
      setShowTrailer(true); // Show the trailer
      setIsPlaying(true);
    } else {
      if (videoRef.current && videoRef.current.contentWindow) {
        const action = isPlaying ? "pauseVideo" : "playVideo";
        videoRef.current.contentWindow.postMessage(
          `{"event":"command","func":"${action}","args":""}`,
          "*"
        );
        setIsPlaying(!isPlaying);
      } else {
        console.error("Video reference is null or contentWindow is undefined");
      }
    }
  };

  const handleVisitWebsite = () => {
    if (englishHomepage) {
      window.open(englishHomepage, "_blank");
    }
  };

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        {t("Loading...")}
      </div>
    );
  }

  return (
    <div className="mx-auto bg-zinc-900 text-secondary">
      <div className="relative container p-0 overflow-hidden border border-zinc-700 rounded-md">
        <div className="relative">
          {!showTrailer && (
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full rounded-md mb-4"
            />
          )}
          {showTrailer && trailerVideo && (
            <iframe
              ref={videoRef}
              width="100%"
              height="500px"
              title="Movie Trailer"
              style={{ border: "none", position: "relative", zIndex: 1 }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            ></iframe>
          )}
        </div>

        <div
          className="p-4 flex gap-4 items-center"
          style={{ zIndex: 2, justifyContent: "flex-start" }}
        >
          {englishHomepage ? (
            <Button
              className="rounded-full h-auto px-6 m-0 flex gap-1 items-center text-base"
              onClick={handleVisitWebsite}
            >
              {t("Visit Website")} <ArrowRight className="size-5" />
            </Button>
          ) : (
            <Button
              className="rounded-full h-auto px-6 m-0 flex gap-1 items-center text-base"
              disabled
            >
              {t("No official website available")}
            </Button>
          )}

          <button
            onClick={handlePlayPause}
            className="hover:border-neutral-300 hover:text-neutral-300 border-2 border-border rounded-full p-2 text-2xl m-0"
          >
            {isPlaying ? <BsPauseFill /> : <BiPlay />}
          </button>
        </div>

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

        <p className="font-bold mb-2">{t("Production Companies")}:</p>
        <ul className="list-none p-0">
          {movie.production_companies.map((company) => (
            <li key={company.id} className="flex items-center mb-2">
              {company.name}
              <img
                src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                alt={company.name}
                className="w-12 h-12 ml-2 rounded"
              />
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <h3 className="text-lg mb-4">
            {type === "tv-shows"
              ? t("Similar TV Shows:")
              : t("Similar Movies:")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {recommendedMovies.map((recMovie) => (
              <Link to={`/details/${type}/${recMovie.id}`} key={recMovie.id}>
                <div className="flex flex-col items-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w154${recMovie.poster_path}`}
                    alt={recMovie.title || recMovie.name}
                    className="w-full rounded-md mb-2"
                    style={{ maxWidth: "154px" }}
                  />
                  <p className="text-sm mt-2 text-center">
                    {recMovie.title || recMovie.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
