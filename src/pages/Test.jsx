import React, { useState } from 'react';
import { Play, Star, ThumbsUp, MessageCircle, Flag } from 'lucide-react';
import Sidebar from '../components/DetailsPage/Sidebar';
import Reviews from '../components/DetailsPage/Reviews/Reviews';
import DetailsInfo from '../components/DetailsPage/DetailsInfo';
import Similiar from '../components/DetailsPage/Similiar';
import DetailsHero from '../components/DetailsPage/DetailsHero';
import { useParams } from 'react-router-dom';
import { fetchData } from '../_utils/utils';
import { updateUserRecentlyViewedMovies } from '../_utils/firestore';

const MovieDetailsPage = () => {
  const { type, id } = useParams();

  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [similiar, setSimiliar] = useState([]);

  useState(() => {
    const getData = async () => {
      let data = await fetchData(
        "https://api.themoviedb.org/3/movie/354912?api_key=bbd89781c7835917a2decb4989b56470&language=en-US"
      );
      setMovie(data);
      //////////////////////////////////////////////
      data = await fetchData(
        "https://api.themoviedb.org/3/movie/354912/credits?api_key=bbd89781c7835917a2decb4989b56470&language=en-US"
      );
      setCast(data.results);
      //////////////////////////////////////////////
      data = await fetchData(
        "https://api.themoviedb.org/3/movie/354912/videos?api_key=bbd89781c7835917a2decb4989b56470&language=en-US"
      );
      data = data.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      )
      setTrailer(data);
      //////////////////////////////////////////////
      data = await fetchData(
        "https://api.themoviedb.org/3/movie/354912/recommendations?api_key=bbd89781c7835917a2decb4989b56470&language=en-US"
      );
      setSimiliar(data.results);

      updateUserRecentlyViewedMovies(id);
    };

    getData();
  }, []);
  
  // Sample movie data
  const movieData = {
    title: "Coco", //
    tagline: "The celebration of a lifetime", //
    description: "Despite his family's baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.", //
    releaseDate: "11/24/2017", //
    revenue: "$807.8M", //
    runtime: "1hr 45m", //
    // rating: "8.5",
    // totalReviews: 2847,
    // ratingDistribution: {
    //   5: 1500,
    //   4: 800,
    //   3: 300,
    //   2: 150,
    //   1: 97
    // },
    genres: ["Family", "Animation", "Music", "Adventure"], //
    director: "Lee Unkrich",
    cast: ["Anthony Gonzalez", "Gael García Bernal", "Benjamin Bratt", "Alanna Ubach", "Renee Victor"],
    reviews: [
      {
        id: 1,
        author: "MovieBuff2023",
        rating: 5,
        date: "2024-03-15",
        content: "A beautiful celebration of Mexican culture and family bonds. The animation is stunning, the music is incredible, and the story touches your heart in ways you don't expect.",
        likes: 342,
        replies: 28,
        isVerified: true
      },
      {
        id: 2,
        author: "CinematicArt",
        rating: 4,
        date: "2024-02-28",
        content: "The attention to detail in recreating the vibrant world of Día de los Muertos is amazing. While the plot might feel familiar at times, the execution is nearly flawless.",
        likes: 156,
        replies: 12,
        isVerified: true
      },
      {
        id: 3,
        author: "FilmCritic_Jane",
        rating: 5,
        date: "2024-02-15",
        content: "Pixar at its finest. The way they handle complex themes like death, family traditions, and following your dreams is masterful. The ending had me in tears.",
        likes: 89,
        replies: 5,
        isVerified: false
      }
    ],
    similarMovies: [
      { title: "Ferdinand", genre: "Animation" },
      { title: "The Shape of Water", genre: "Drama" },
      { title: "Thor: Ragnarok", genre: "Action" },
      { title: "Wonder", genre: "Drama" },
      { title: "Moana", genre: "Animation" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DetailsHero movie={movie} trailerVideo={trailer}/>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2 space-y-8">
            {/* <DetailsInfo /> */}
            {/* <Reviews /> */}
          </div>
          {/* <Sidebar /> */}
        </div>
        {/* <Similiar /> */}
      </div>
    </div>
  );
};

export default MovieDetailsPage;