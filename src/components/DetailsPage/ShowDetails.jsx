//01
import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BiPlay } from "react-icons/bi";
import { BsPauseFill } from "react-icons/bs";

const ShowDetails = ({ id: propId }) => {
  const videoRef = useRef(null);
  const { id: showId } = useParams();
  const id = propId || showId;
  const [show, setShow] = useState(null);
  const [trailerVideo, setTrailerVideo] = useState(null);
  const [recommendedShows, setRecommendedShows] = useState([]);
  const { t, i18n } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
        );
        const data = await response.json();
        setShow(data);

        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
        );
        const videoData = await videoResponse.json();

        if (videoData.results.length === 0 && i18n.language !== "en-US") {
          const fallbackResponse = await fetch(
            `https://api.themoviedb.org/3/tv/${id}/videos?api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
          );
          const fallbackData = await fallbackResponse.json();
          setTrailerVideo(
            fallbackData.results.find(
              (video) => video.site === "YouTube" && video.type === "Trailer"
            )
          );
        } else {
          setTrailerVideo(
            videoData.results.find(
              (video) => video.site === "YouTube" && video.type === "Trailer"
            )
          );
        }

        const similarResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}&page=1`
        );
        const similarData = await similarResponse.json();
        setRecommendedShows(similarData.results);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id, i18n.language]);

  useEffect(() => {
    if (showTrailer && trailerVideo && videoRef.current) {
      videoRef.current.src = `https://www.youtube.com/embed/${trailerVideo.key}?enablejsapi=1&modestbranding=1&controls=1&showinfo=0&rel=0&autoplay=1`;
    }
  }, [showTrailer, trailerVideo]);

  const handlePlayPause = (event) => {
    event.preventDefault();
    if (!showTrailer) {
      setShowTrailer(true);
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

  if (!show) {
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
              src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
              alt={show.name}
              className="w-full h-auto rounded-lg mb-4"
            />
          )}
          {showTrailer && trailerVideo && (
            <iframe
              ref={videoRef}
              width="100%"
              height="500px"
              title="Show Trailer"
              style={{ border: "none", position: "relative", zIndex: 1 }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            ></iframe>
          )}
        </div>

        <div className="p-4 flex gap-4 items-center">
          <button
            onClick={handlePlayPause}
            className="hover:border-neutral-300 hover:text-neutral-300 border-2 border-border rounded-full p-2 text-2xl"
          >
            {isPlaying ? <BsPauseFill /> : <BiPlay />}
          </button>
        </div>

        <h2 className="text-xl italic mb-4">{show.tagline}</h2>
        <p className="mb-4">{show.overview}</p>
        <div className="mb-4">
          <p>
            <strong>{t("First Air Date")}:</strong>{" "}
            {new Date(show.first_air_date).toLocaleDateString()}
          </p>
          <p>
            <strong>{t("Last Air Date")}:</strong>{" "}
            {new Date(show.last_air_date).toLocaleDateString()}
          </p>
          <p>
            <strong>{t("Number of Seasons")}:</strong> {show.number_of_seasons}
          </p>
          <p>
            <strong>{t("Number of Episodes")}:</strong>{" "}
            {show.number_of_episodes}
          </p>
          <p>
            <strong>{t("Genres")}:</strong>{" "}
            {show.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>{t("Director")}:</strong>{" "}
            {show.crew
              ?.filter((member) => member.job === "Director")
              .map((director) => director.name)
              .join(", ") || "N/A"}
          </p>
          <p>
            <strong>{t("Cast")}:</strong>{" "}
            {show.cast
              ?.slice(0, 5)
              .map((actor) => actor.name)
              .join(", ") || "N/A"}
          </p>
          <p>
            <strong>{t("Vote Average")}:</strong> {show.vote_average} (
            {show.vote_count} {t("votes")})
          </p>
        </div>
        <p className="font-bold mb-2">{t("Last Episode")}</p>
        <div className="mb-4">
          <h3>{show.last_episode_to_air.name}</h3>
          <p>{show.last_episode_to_air.overview}</p>
          <p>
            <strong>{t("Air Date")}</strong>{" "}
            {new Date(show.last_episode_to_air.air_date).toLocaleDateString()}
          </p>
          <img
            src={`https://image.tmdb.org/t/p/w500${show.last_episode_to_air.still_path}`}
            alt={show.last_episode_to_air.name}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <p className="font-bold mb-2">{t("Production Companies")}:</p>
        <ul className="list-none p-0">
          {show.production_companies.map((company) => (
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
          <h3 className="text-lg mb-4">{t("Similar TV Shows")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {recommendedShows.map((recShow) => (
              <Link to={`/details/tv/${recShow.id}`} key={recShow.id}>
                <div className="flex flex-col items-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w154${recShow.poster_path}`}
                    alt={recShow.name}
                    className="w-full rounded-md mb-2"
                    style={{ maxWidth: "154px" }}
                  />
                  <p className="text-sm mt-2 text-center">{recShow.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
