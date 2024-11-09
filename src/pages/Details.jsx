import React, { useState } from "react";
import Sidebar from "../components/DetailsPage/Sidebar";
import Reviews from "../components/DetailsPage/Reviews/Reviews";
import DetailsInfo from "../components/DetailsPage/DetailsInfo";
import Similiar from "../components/DetailsPage/Similiar";
import DetailsHero from "../components/DetailsPage/DetailsHero";
import { useParams } from "react-router-dom";
import { fetchData } from "../_utils/utils";
import { updateUserRecentlyViewedMovies } from "../_utils/firestore";

const Details = () => {
  const { type, id } = useParams();

  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [similiar, setSimiliar] = useState([]);

  useState(() => {
    const getData = async () => {
      let data = await fetchData(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
      );
      setMovie(data);
      //////////////////////////////////////////////
      data = await fetchData(
        `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
      );
      setCast(data.cast);
      setCrew(data.crew);
      //////////////////////////////////////////////
      data = await fetchData(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
      );
      let video = data.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );
      if (video) {
        video = data.results[0];
      }
      setTrailer(video);
      //////////////////////////////////////////////
      data = await fetchData(
        `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
      );
      setSimiliar(data.results);

      // updateUserRecentlyViewedMovies(id);
    };

    getData();
  }, [id]);
  
  // Sample movie data
  const movieData = {
    // rating: "8.5",
    // totalReviews: 2847,
    // ratingDistribution: {
    //   5: 1500,
    //   4: 800,
    //   3: 300,
    //   2: 150,
    //   1: 97
    // },
    reviews: [
      {
        id: 1,
        author: "MovieBuff2023",
        rating: 5,
        date: "2024-03-15",
        content:
          "A beautiful celebration of Mexican culture and family bonds. The animation is stunning, the music is incredible, and the story touches your heart in ways you don't expect.",
        likes: 342,
        replies: 28,
        isVerified: true,
      },
      {
        id: 2,
        author: "CinematicArt",
        rating: 4,
        date: "2024-02-28",
        content:
          "The attention to detail in recreating the vibrant world of Día de los Muertos is amazing. While the plot might feel familiar at times, the execution is nearly flawless.",
        likes: 156,
        replies: 12,
        isVerified: true,
      },
      {
        id: 3,
        author: "FilmCritic_Jane",
        rating: 5,
        date: "2024-02-15",
        content:
          "Pixar at its finest. The way they handle complex themes like death, family traditions, and following your dreams is masterful. The ending had me in tears.",
        likes: 89,
        replies: 5,
        isVerified: false,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DetailsHero movie={movie} trailerVideo={trailer} />
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2 space-y-8">
            <DetailsInfo overview={movie.overview} cast={cast} />
            {/* <Reviews /> */}
          </div>
          <Sidebar movie={movie} crews={crew} type={type}/>
        </div>
        <Similiar similarMovies={similiar} />
      </div>
    </div>
  );
};

export default Details;
