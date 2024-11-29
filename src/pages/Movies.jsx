import React, { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { fetchData } from "../_utils/utils";
import GenreCarousel from "../components/GenrePage/GenreCarousel";

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

  const [movies1, setMovies1] = useState([]);
  const [movies2, setMovies2] = useState([]);
  const [movies3, setMovies3] = useState([]);
  const [movies4, setMovies4] = useState([]);
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
      let movie1;
      let movie2;
      let movie3;
      let movie4;
      if (type === "movie") {
        genresList = movies;
        movie1 = await fetchData(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470"
        );
        movie2 = await fetchData(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470"
        );
        movie3 = await fetchData(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470"
        );
        movie4 = await fetchData(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470"
        );
      } else if (type === "tv") {
        genresList = shows;
        movie1 = await fetchData(
          "https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=bbd89781c7835917a2decb4989b56470"
        );
        movie2 = await fetchData(
          "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470"
        );
        movie3 = await fetchData(
          "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470"
        );
        movie4 = await fetchData(
          "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470"
        );
      }
      setMovies1(updateBackdropPaths(genresList, movie1.results));
      setMovies2(updateBackdropPaths(genresList, movie2.results));
      setMovies3(updateBackdropPaths(genresList, movie3.results));
      setMovies4(updateBackdropPaths(genresList, movie4.results));
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
          genres={movies1}
          sectionTitle="Popular"
          baseUrl={`/type/${type}/popular`}
        />

        {type === "movie" && (
          <>
            <Separator className="h-0.5 bg-secondary/5 my-5" />
            <GenreCarousel
              genres={movies2}
              sectionTitle="Now Playing"
              baseUrl={`/type/${type}/now_playing`}
            />
            
            <Separator className="h-0.5 bg-secondary/5 my-5" />

            <GenreCarousel
              genres={movies3}
              sectionTitle="Upcoming"
              baseUrl={`/type/${type}/upcoming`}
            />
          </>
        )}

        {type === "tv" && (
          <>
            <Separator className="h-0.5 bg-secondary/5 my-5" />
            <GenreCarousel
              genres={movies2}
              sectionTitle="Airing Today"
              baseUrl={`/type/${type}/airing_today`}
            />

            <Separator className="h-0.5 bg-secondary/5 my-5" />

            <GenreCarousel
              genres={movies3}
              sectionTitle="On Tv"
              baseUrl={`/type/${type}/on_tv`}
            />
          </>
        )}

        <Separator className="h-0.5 bg-secondary/5 my-5" />

        <GenreCarousel
          genres={movies4}
          sectionTitle="Top Rated"
          baseUrl={`/type/${type}/top_rated`}
        />
      </div>
    </div>
  );
};

export default Movies;
