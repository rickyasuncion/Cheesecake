import React, { useEffect, useState } from "react";
import Sidebar from "../components/DetailsPage/Sidebar";
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

  useEffect(() => {
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
      ) || data.results[0];
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
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DetailsHero movie={movie} trailerVideo={trailer} />
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2 space-y-8">
            <DetailsInfo movie={movie} cast={cast} type={type} id={id} />
          </div>
          <Sidebar movie={movie} cast={cast} crews={crew} type={type} />
        </div>
        <Similiar similarMovies={similiar} type={type}/>
      </div>
    </div>
  );
};

export default Details;
