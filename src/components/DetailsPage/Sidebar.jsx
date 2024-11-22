import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import {
  subscribeUserToMovieNotifications,
  isUserSubscribedToMovie,
} from "../../_utils/firestore";
import { useTranslation } from "react-i18next";

const Sidebar = ({ movie, crews, type }) => {
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

  const [directors, setDirectors] = useState([]);
  const [isFree, setIsFree] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (crews) {
      const filteredData = crews.filter((crew) => crew.job === "Director");
      setDirectors(filteredData);
    }
  }, [crews]);

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const providerResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=bbd89781c7835917a2decb4989b56470`
        );
        const providerData = await providerResponse.json();

        setIsFree(providerData.results?.CA?.free || false);
      } catch (error) {
        console.error("Error fetching providers data:", error);
      }
    };

    const checkIfSubscribed = async () => {
      const subscribed = await isUserSubscribedToMovie(movie.id);
      setIsSubscribed(subscribed);
    };

    fetchProviderData();
    checkIfSubscribed();
  }, [movie.id]);

  const handleSubscribe = async () => {
    await subscribeUserToMovieNotifications(movie.id);
    setIsSubscribed(true);
  };

  // Testing function to toggle "isFree" status
  const toggleFreeStatus = async () => {
    setIsFree((prevStatus) => !prevStatus);

    if (!isFree) {
      // send notification email when status changes from "not free" to "free"
      try {
        const response = await fetch(
          "http://localhost:3003/send-free-notification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              movieId: movie.id,
              movieTitle: movie.title,
            }),
          }
        );

        const result = await response.json();
        if (result.success) {
          console.log("Notification emails sent successfully!");
        } else {
          console.error("Failed to send notification emails:", result.message);
        }
      } catch (error) {
        console.error("Error sending notification emails:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">{t("Details")}</h3>
        {type === "movie" ? (
          <div className="space-y-3 text-gray-300">
            <div>
              <span className="text-gray-500">{t("Release Date")}:</span>{" "}
              {movie.release_date}
            </div>
            <div>
              <span className="text-gray-500">{t("Revenue")}:</span> $
              {movie.revenue && movie.revenue.toLocaleString()}
            </div>
            <div>
              <span className="text-gray-500">{t("Runtime")}:</span>{" "}
              {movie.runtime} {t("mins")}
            </div>
            <div>
              <span className="text-gray-500">{t("Director")}:</span>{" "}
              {directors.length > 0
                ? directors.map((director) => director.name).join(", ")
                : "No Director"}
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-gray-300">
            <div>
              <span className="text-gray-500">{t("First Aired")}:</span>{" "}
              {movie.first_air_date}
            </div>
            <div>
              <span className="text-gray-500">{t("Status")}:</span>{" "}
              {movie.status}
            </div>
            <div>
              <span className="text-gray-500">{t("Network")}:</span>{" "}
              {movie.networks?.map((network) => network.name).join(", ")}
            </div>
            <div>
              <span className="text-gray-500">{t("Creator")}:</span>{" "}
              {movie.created_by?.map((creator) => creator.name).join(", ")}
            </div>
            <div>
              <span className="text-gray-500">{t("Episodes")}:</span>{" "}
              {movie.number_of_episodes}
            </div>
            <div>
              <span className="text-gray-500">{t("Seasons")}:</span>{" "}
              {movie.number_of_seasons}
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">{t("Genres")}</h3>
        <div className="flex flex-wrap gap-2">
          {movie.genres &&
            movie.genres.map((genre, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
              >
                {GENRES[genre.id]}
              </span>
            ))}
        </div>
      </div>

      {/* Free Movie Notification Button */}
      <div className="mt-4">
        {isFree ? (
          <Button
            onClick={() =>
              window.open(
                `https://www.themoviedb.org/movie/${movie.id}/watch`,
                "_blank"
              )
            }
            className="rounded-full h-auto px-6 m-0 flex gap-1 items-center text-base bg-yellow-500 text-black"
          >
            {t("Find Free Viewing Options on TMDb")} <ArrowRight />
          </Button>
        ) : (
          <Button
            onClick={handleSubscribe}
            className="rounded-full h-auto px-6 m-0 flex gap-1 items-center text-base bg-yellow-500 text-black"
            disabled={isSubscribed}
          >
            {isSubscribed
              ? t("Subscribed for free notifications")
              : t("Notify me when it’s free")}{" "}
            <ArrowRight />
          </Button>
        )}
      </div>

      {/* Test Button to Toggle Free Status */}
      <div className="mt-4">
        <Button
          onClick={toggleFreeStatus}
          className="rounded-full h-auto px-6 m-0 flex gap-1 items-center text-base bg-blue-500 text-white"
        >
          Toggle Free Status (Testing)
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
