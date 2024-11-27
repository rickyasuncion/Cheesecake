import React, { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import GenreCarousel from "./GenrePage/GenreCarousel";
import { fetchData } from "../_utils/utils";

const movies = [
  {
    id: 28,
    name: "Action",
    backdrop_path: "path_to_action_backdrop.jpg",
  },
  {
    id: 12,
    name: "Adventure",
    backdrop_path: "path_to_adventure_backdrop.jpg",
  },
  {
    id: 16,
    name: "Animation",
    backdrop_path: "path_to_animation_backdrop.jpg",
  },
  {
    id: 35,
    name: "Comedy",
    backdrop_path: "path_to_comedy_backdrop.jpg",
  },
  {
    id: 80,
    name: "Crime",
    backdrop_path: "path_to_crime_backdrop.jpg",
  },
  {
    id: 99,
    name: "Documentary",
    backdrop_path: "path_to_documentary_backdrop.jpg",
  },
  {
    id: 18,
    name: "Drama",
    backdrop_path: "path_to_drama_backdrop.jpg",
  },
  {
    id: 10751,
    name: "Family",
    backdrop_path: "path_to_family_backdrop.jpg",
  },
  {
    id: 14,
    name: "Fantasy",
    backdrop_path: "path_to_fantasy_backdrop.jpg",
  },
  {
    id: 36,
    name: "History",
    backdrop_path: "path_to_history_backdrop.jpg",
  },
  {
    id: 27,
    name: "Horror",
    backdrop_path: "path_to_horror_backdrop.jpg",
  },
  {
    id: 10402,
    name: "Music",
    backdrop_path: "path_to_music_backdrop.jpg",
  },
  {
    id: 9648,
    name: "Mystery",
    backdrop_path: "path_to_mystery_backdrop.jpg",
  },
  {
    id: 10749,
    name: "Romance",
    backdrop_path: "path_to_romance_backdrop.jpg",
  },
  {
    id: 878,
    name: "Science Fiction",
    backdrop_path: "path_to_science_fiction_backdrop.jpg",
  },
  {
    id: 10770,
    name: "TV Movie",
    backdrop_path: "path_to_tv_movie_backdrop.jpg",
  },
  {
    id: 53,
    name: "Thriller",
    backdrop_path: "path_to_thriller_backdrop.jpg",
  },
  {
    id: 10752,
    name: "War",
    backdrop_path: "path_to_war_backdrop.jpg",
  },
  {
    id: 37,
    name: "Western",
    backdrop_path: "path_to_western_backdrop.jpg",
  },
];

const shows = [
  {
    id: 10759,
    name: "Action & Adventure",
    backdrop_path: "path_to_action_adventure_backdrop.jpg",
  },
  {
    id: 16,
    name: "Animation",
    backdrop_path: "path_to_animation_backdrop.jpg",
  },
  {
    id: 35,
    name: "Comedy",
    backdrop_path: "path_to_comedy_backdrop.jpg",
  },
  {
    id: 80,
    name: "Crime",
    backdrop_path: "path_to_crime_backdrop.jpg",
  },
  {
    id: 99,
    name: "Documentary",
    backdrop_path: "path_to_documentary_backdrop.jpg",
  },
  {
    id: 18,
    name: "Drama",
    backdrop_path: "path_to_drama_backdrop.jpg",
  },
  {
    id: 10751,
    name: "Family",
    backdrop_path: "path_to_family_backdrop.jpg",
  },
  {
    id: 10762,
    name: "Kids",
    backdrop_path: "path_to_kids_backdrop.jpg",
  },
  {
    id: 9648,
    name: "Mystery",
    backdrop_path: "path_to_mystery_backdrop.jpg",
  },
  {
    id: 10763,
    name: "News",
    backdrop_path: "path_to_news_backdrop.jpg",
  },
  {
    id: 10764,
    name: "Reality",
    backdrop_path: "path_to_reality_backdrop.jpg",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
    backdrop_path: "path_to_sci_fi_fantasy_backdrop.jpg",
  },
  {
    id: 10766,
    name: "Soap",
    backdrop_path: "path_to_soap_backdrop.jpg",
  },
  {
    id: 10767,
    name: "Talk",
    backdrop_path: "path_to_talk_backdrop.jpg",
  },
  {
    id: 10768,
    name: "War & Politics",
    backdrop_path: "path_to_war_politics_backdrop.jpg",
  },
  {
    id: 37,
    name: "Western",
    backdrop_path: "path_to_western_backdrop.jpg",
  },
];

const Movies = () => {
  const type = useParams().type;

  const [genres, setGenres] = useState([]);
  const [upcomingMoviesGenres, setUpcomingMoviesGenres] = useState([]);
  const [popularMovieGenres, setPopularMovieGenres] = useState([]);
  const [topRatedMovieGenres, setTopRatedMovieGenres] = useState([]);
  const { t } = useTranslation();

  const updateBackdropPaths = (genres, movies) => {
    const usedBackdrops = new Set();
    return genres.map((genre) => {
      const movie = movies?.find(
        (movie) =>
          movie.genre_ids.includes(genre.id) &&
          !usedBackdrops.has(movie.backdrop_path)
      );
      if (movie) {
        usedBackdrops.add(movie.backdrop_path);
      }
      return {
        ...genre,
        backdrop_path: movie
          ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
          : genre.backdrop_path,
      };
    });
  };

  useEffect(() => {
    const getData = async () => {
      let genresList;
      let upcomingMovies;
      let popularMovies;
      let topRatedMovies;
      if (type === "movie") {
        genresList = movies;
        upcomingMovies = await fetchData(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470"
        );
        popularMovies = await fetchData(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470"
        );
        topRatedMovies = await fetchData(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470"
        );
      } else if (type === "show") {
        genresList = shows;
        upcomingMovies = await fetchData(
          "https://api.themoviedb.org/3/tv/upcoming?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470"
        );
        popularMovies = await fetchData(
          "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470"
        );
        topRatedMovies = await fetchData(
          "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470"
        );
      }
      setUpcomingMoviesGenres(
        updateBackdropPaths(genresList, upcomingMovies.results)
      );
      setPopularMovieGenres(
        updateBackdropPaths(genresList, popularMovies.results)
      );
      setTopRatedMovieGenres(
        updateBackdropPaths(genresList, topRatedMovies.results)
      );
    };
    getData();
  }, [type]);

  return (
    <div className="pt-5 pb-16">
      <div className="container">
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
