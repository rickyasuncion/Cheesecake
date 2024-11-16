import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import {
  subscribeUserToMovieNotifications,
  isUserSubscribedToMovie,
} from "../../_utils/firestore";

const GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

const Sidebar = ({ movie, cast, crews, type }) => {
  const filteredCast = cast
    .filter((actor) => actor.known_for_department === "Acting")
    .slice(0, 5);
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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Details</h3>
        {type === "movie" ? (
          <div className="space-y-3 text-gray-300">
            <div>
              <span className="text-gray-500">Release Date:</span>{" "}
              {movie.release_date}
            </div>
            <div>
              <span className="text-gray-500">Revenue:</span> $
              {movie.revenue && movie.revenue.toLocaleString()}
            </div>
            <div>
              <span className="text-gray-500">Runtime:</span> {movie.runtime}{" "}
              mins
            </div>
            <div>
              <span className="text-gray-500">Director:</span>{" "}
              {directors.length > 0
                ? directors.map((director) => director.name).join(", ")
                : "No Director"}
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-gray-300">
            <div>
              <span className="text-gray-500">First Aired:</span>{" "}
              {movie.first_air_date}
            </div>
            <div>
              <span className="text-gray-500">Status:</span> {movie.status}
            </div>
            <div>
              <span className="text-gray-500">Network:</span>{" "}
              {movie.networks?.map((network) => network.name).join(", ")}
            </div>
            <div>
              <span className="text-gray-500">Creator:</span>{" "}
              {movie.created_by?.map((creator) => creator.name).join(", ")}
            </div>
            <div>
              <span className="text-gray-500">Episodes:</span>{" "}
              {movie.number_of_episodes}
            </div>
            <div>
              <span className="text-gray-500">Seasons:</span>{" "}
              {movie.number_of_seasons}
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Genres</h3>
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
            Find Free Viewing Options on TMDb <ArrowRight />
          </Button>
        ) : (
          <Button
            onClick={handleSubscribe}
            className="rounded-full h-auto px-6 m-0 flex gap-1 items-center text-base bg-yellow-500 text-black"
            disabled={isSubscribed}
          >
            {isSubscribed
              ? "Subscribed for free notifications"
              : "Notify me when it’s free"}{" "}
            <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
