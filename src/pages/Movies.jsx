import React, { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import GenreCarousel from "./GenrePage/GenreCarousel";

const movies = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const shows = [
  {
    id: 10759,
    name: "Action & Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
  {
    id: 37,
    name: "Western",
  },
];

const Movies = () => {
  const type = useParams().type;

  const [genres, setGenres] = useState([]);
  const [upcomingMoviesGenres, setUpcomingMoviesGenres] = useState([]);
  const [popularMovieGenres, setPopularMovieGenres] = useState([]);
  const [topRatedMovieGenres, setTopRatedMovieGenres] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    // Simulating API calls - replace with actual API calls
    if (type === "movie") {
      setGenres(movies.map((movie) => movie.name));

      // Mock data for demonstration
      setUpcomingMoviesGenres(movies);

      setPopularMovieGenres(movies);

      setTopRatedMovieGenres(movies);
    } else if (type === "show") {
      setGenres(shows.map((show) => show.name));

      // Mock data for demonstration
      setUpcomingMoviesGenres(shows);

      setPopularMovieGenres(shows);

      setTopRatedMovieGenres(shows);
    }
  }, [type]);

  return (
    <div className="pt-5 pb-16">
      <div className="container">
        {/* Hero section remains the same */}
        <div className="pt-48 pb-3 relative overflow-hidden rounded-md isolate">
          <div className="bg-neutral-900/60 absolute top-0 bottom-0 z-10 w-full">
            <h1 className="px-4 font-semibold text-white text-3xl absolute bottom-3">
              {t("All Movies")}
            </h1>
          </div>
          <img src="/hero.jpg" alt="" className="absolute top-0 bottom-0 z-5" />
        </div>

        {/* Custom Carousel Components */}
        <GenreCarousel
          genres={upcomingMoviesGenres}
          sectionTitle="New & Upcoming"
          baseUrl="/movies/upcoming/genre"
        />

        <Separator className="h-0.5 bg-secondary/5 my-5" />

        <GenreCarousel
          genres={popularMovieGenres}
          sectionTitle="Popular"
          baseUrl="/movies/popular/genre"
        />

        <Separator className="h-0.5 bg-secondary/5 my-5" />

        <GenreCarousel
          genres={topRatedMovieGenres}
          sectionTitle="Top Rated"
          baseUrl="/movies/top_rated/genre"
        />
      </div>
    </div>
  );
};

export default Movies;
