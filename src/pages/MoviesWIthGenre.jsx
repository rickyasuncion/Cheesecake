import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieCard } from "../components/ui/MovieCard";
import { useTranslation } from "react-i18next";
import horrorHeader from "../media/horror-header.jpg";
import sciFiHeader from "../media/sci-fiction-header.jpg";
import mysteryHeader from "../media/mystery-header.png";
import warHeader from "../media/war-header.jpg";
import crimeHeader from "../media/crime-header.webp";
import adventureHeader from "../media/adventure-header.jpg";
import historyHeader from "../media/history-header.webp";
import animationHeader from "../media/animation-header.webp";
import thrillerHeader from "../media/thriller-header.jpg";
import dramaHeader from "../media/drama-header.jpg";
import actionHeader from "../media/action-header.webp";
import { fetchData } from "../_utils/utils";
import { UserData } from "../providers/UserDataProvider";
import { useMovieTrailerContext } from "../providers/MovieTrailerProvider";

const MoviesWithGenre = () => {
  const { userData } = useContext(UserData);
  const { media, type, id } = useParams();
  const [movies, setMovies] = useState([]);
  const [headerImage, setHeaderImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(id);
  const [selectedYear, setSelectedYear] = useState({ start: "", end: "" });
  const { t, i18n } = useTranslation();
  const { shouldPlayTrailer } = useMovieTrailerContext();


  const movie = [
    {
      id: 28,
      name: t("Action"),
      backdrop_path: "path_to_action_backdrop.jpg",
    },
    {
      id: 12,
      name: t("Adventure"),
      backdrop_path: "path_to_adventure_backdrop.jpg",
    },
    {
      id: 16,
      name: t("Animation"),
      backdrop_path: "path_to_animation_backdrop.jpg",
    },
    {
      id: 35,
      name: t("Comedy"),
      backdrop_path: "path_to_comedy_backdrop.jpg",
    },
    {
      id: 80,
      name: t("Crime"),
      backdrop_path: "path_to_crime_backdrop.jpg",
    },
    {
      id: 99,
      name: t("Documentary"),
      backdrop_path: "path_to_documentary_backdrop.jpg",
    },
    {
      id: 18,
      name: t("Drama"),
      backdrop_path: "path_to_drama_backdrop.jpg",
    },
    {
      id: 10751,
      name: t("Family"),
      backdrop_path: "path_to_family_backdrop.jpg",
    },
    {
      id: 14,
      name: t("Fantasy"),
      backdrop_path: "path_to_fantasy_backdrop.jpg",
    },
    {
      id: 36,
      name: t("History"),
      backdrop_path: "path_to_history_backdrop.jpg",
    },
    {
      id: 27,
      name: t("Horror"),
      backdrop_path: "path_to_horror_backdrop.jpg",
    },
    {
      id: 10402,
      name: t("Music"),
      backdrop_path: "path_to_music_backdrop.jpg",
    },
    {
      id: 9648,
      name: t("Mystery"),
      backdrop_path: "path_to_mystery_backdrop.jpg",
    },
    {
      id: 10749,
      name: t("Romance"),
      backdrop_path: "path_to_romance_backdrop.jpg",
    },
    {
      id: 878,
      name: t("Science Fiction"),
      backdrop_path: "path_to_science_fiction_backdrop.jpg",
    },
    {
      id: 10770,
      name: t("TV Movie"),
      backdrop_path: "path_to_tv_movie_backdrop.jpg",
    },
    {
      id: 53,
      name: t("Thriller"),
      backdrop_path: "path_to_thriller_backdrop.jpg",
    },
    {
      id: 10752,
      name: t("War"),
      backdrop_path: "path_to_war_backdrop.jpg",
    },
    {
      id: 37,
      name: t("Western"),
      backdrop_path: "path_to_western_backdrop.jpg",
    },
  ];

  const shows = [
    {
      id: 10759,
      name: t("Action & Adventure"),
      backdrop_path: "path_to_action_adventure_backdrop.jpg",
    },
    {
      id: 16,
      name: t("Animation"),
      backdrop_path: "path_to_animation_backdrop.jpg",
    },
    {
      id: 35,
      name: t("Comedy"),
      backdrop_path: "path_to_comedy_backdrop.jpg",
    },
    {
      id: 80,
      name: t("Crime"),
      backdrop_path: "path_to_crime_backdrop.jpg",
    },
    {
      id: 99,
      name: t("Documentary"),
      backdrop_path: "path_to_documentary_backdrop.jpg",
    },
    {
      id: 18,
      name: t("Drama"),
      backdrop_path: "path_to_drama_backdrop.jpg",
    },
    {
      id: 10751,
      name: t("Family"),
      backdrop_path: "path_to_family_backdrop.jpg",
    },
    {
      id: 10762,
      name: t("Kids"),
      backdrop_path: "path_to_kids_backdrop.jpg",
    },
    {
      id: 9648,
      name: t("Mystery"),
      backdrop_path: "path_to_mystery_backdrop.jpg",
    },
    {
      id: 10764,
      name: t("Reality"),
      backdrop_path: "path_to_reality_backdrop.jpg",
    },
    {
      id: 10765,
      name: t("Sci-Fi & Fantasy"),
      backdrop_path: "path_to_sci_fi_fantasy_backdrop.jpg",
    },
    {
      id: 10766,
      name: t("Soap"),
      backdrop_path: "path_to_soap_backdrop.jpg",
    },
    {
      id: 10767,
      name: t("Talk"),
      backdrop_path: "path_to_talk_backdrop.jpg",
    },
    {
      id: 10768,
      name: t("War & Politics"),
      backdrop_path: "path_to_war_politics_backdrop.jpg",
    },
    {
      id: 37,
      name: t("Western"),
      backdrop_path: "path_to_western_backdrop.jpg",
    },
  ];

  const genreImages = {
    27: horrorHeader,
    878: sciFiHeader,
    9648: mysteryHeader,
    10752: warHeader,
    80: crimeHeader,
    12: adventureHeader,
    36: historyHeader,
    16: animationHeader,
    53: thrillerHeader,
    18: dramaHeader,
    28: actionHeader,
  };

  const genreList = media === "movie" ? movie : shows;

  useEffect(() => {
    setHeaderImage(genreImages[Number(selectedGenre)] || "/default-header.jpg");

    const fetchMovies = async () => {
      let baseURL = `https://api.themoviedb.org/3/discover/${media}?include_adult=false&include_video=false&language=${i18n.language}&sort_by=popularity.desc&with_genres=${selectedGenre}&api_key=bbd89781c7835917a2decb4989b56470&page=${currentPage}`;

      if (selectedYear.start) {
        baseURL += `&primary_release_date.gte=${selectedYear.start}-01-01`;
      }
      if (selectedYear.end) {
        baseURL += `&primary_release_date.lte=${selectedYear.end}-12-31`;
      }

      if (selectedYear) {
        baseURL += `&primary_release_year=${selectedYear}`;
      }

      const data = await fetchData(baseURL);
      setMovies(data?.results || []);
      setTotalPages(data?.total_pages || 1);
    };

    fetchMovies();
  }, [selectedGenre, i18n.language, currentPage, selectedYear, media]);

  useEffect(() => {
    if (selectedYear.start && selectedYear.end && selectedYear.start > selectedYear.end) {
      setSelectedYear((prev) => ({ ...prev, end: prev.start }));
    }
  }, [selectedYear.start, selectedYear.end]);
  

  return (
    <div className="bg-gray-900 text-secondary pt-5 pb-16">
      <div className="container">
        <div className="pt-48 pb-3 relative overflow-hidden rounded-md isolate">
          <div className="bg-neutral-900/60 absolute top-0 bottom-0 z-10 w-full">
            <h1 className="px-4 font-semibold text-3xl text-white absolute bottom-3 capitalize">
              {t(type)} - {media === "movie" ? t("Movies") : t("Tv Shows")}
            </h1>
          </div>
          <img
            src={headerImage}
            alt="Genre Header"
            className="absolute top-0 bottom-0 z-5 w-full h-64 object-cover"
          />
        </div>

        {/* Filters */}
        <div className="flex justify-between mt-4">
          {/* Genre Selector */}
          <select
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setCurrentPage(1); // Reset to first page when genre changes
            }}
            className="bg-neutral-900 text-white p-2 rounded"
          >
            {genreList.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          {/* Year Selector */}
          {/* Year Range Selectors */}
          <div className="flex gap-2 items-center">
            <select
              value={selectedYear.start}
              onChange={(e) => {
                setSelectedYear((prev) => ({ ...prev, start: e.target.value }));
                setCurrentPage(1); // Reset to first page when year changes
              }}
              className="bg-neutral-900 text-white p-2 rounded"
            >
              <option value="">{t("Start Year")}</option>
              {Array.from(
                { length: 30 },
                (_, i) => new Date().getFullYear() - i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <span className="text-white">{t("to")}</span>

            <select
              value={selectedYear.end}
              onChange={(e) => {
                setSelectedYear((prev) => ({ ...prev, end: e.target.value }));
                setCurrentPage(1); // Reset to first page when year changes
              }}
              className="bg-neutral-900 text-white p-2 rounded"
            >
              <option value="">{t("End Year")}</option>
              {Array.from(
                { length: 30 },
                (_, i) => new Date().getFullYear() - i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Movies List */}
        <div className="flex gap-3 flex-wrap mt-10">
          {movies &&
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                media_type={media}
                title={movie.title}
                name={movie.name}
                poster_path={movie.poster_path}
                href={`/details/${media}/${movie.id}`}
                userData={userData}
                shouldPlayTrailer={shouldPlayTrailer}
                className="flex-1 min-w-44 max-w-60"
              />
            ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`py-2 px-4 mx-1 rounded ${
              currentPage === 1
                ? "bg-gray-400"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {t("Previous")}
          </button>
          <span className="py-2 px-4 mx-1">{`${t("Page")} ${currentPage} ${t(
            "of"
          )} ${totalPages}`}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`py-2 px-4 mx-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-400"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {t("Next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviesWithGenre;
