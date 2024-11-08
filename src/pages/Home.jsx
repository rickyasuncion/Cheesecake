import React, { useState } from "react";
import FeaturedSection from "../components/HomePage/FeaturedSection";
import MediaCarousel from "../components/HomePage/MediaCarousel";
import { fetchData } from "../_utils/utils";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [movies1, setMovies1] = useState([]);
  const [movies2, setMovies2] = useState([]);
  // const [movies2, setMovies2] = useState([]);
  const [shows1, setShows1] = useState([]);

  useState(() => {
    const getData = async () => {
      let data = await fetchData(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=bbd89781c7835917a2decb4989b56470&language=en-US&page=1"
      );
      setFeatured(data.results);
      data = await fetchData(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=bbd89781c7835917a2decb4989b56470&language=en-US&page=1"
      );
      setMovies1(data.results);
      data = await fetchData(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=bbd89781c7835917a2decb4989b56470&language=en-US&page=1"
      );
      setMovies2(data.results);
      data = await fetchData(
        "https://api.themoviedb.org/3/trending/tv/day?api_key=bbd89781c7835917a2decb4989b56470&language=en-US&page=1"
      );
      setShows1(data.results);
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FeaturedSection featuredContent={featured} />
        <MediaCarousel movies={movies1} text="Now In Theaters" type="movie"/>
        <MediaCarousel movies={movies2} text="Trending Movies" type="movie"/>
        <MediaCarousel movies={shows1} text="Trending Shows" type="show"/>
        {/* <MediaCarousel movies={movies} text="Top 10 in Canada" /> */}
      </main>
    </div>
  );
};

export default Home;
