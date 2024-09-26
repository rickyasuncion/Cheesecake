import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiHeartFill } from "react-icons/ri";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { BsPauseFill } from "react-icons/bs";

const MovieDetails = ({ id }) => {
  const videoRef = useRef(null);
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const { t, i18n } = useTranslation();
  const [isTrailerOn, setIsTrailerOn] = useState(false);


  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchMovieVideos = async () => {
      try {
        let response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
        );
        let data = await response.json();

        if (data.results.length === 0 && i18n.language !== 'en-US') {
          // If no videos in the preferred language, try English
          response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
          );
          data = await response.json();
        }
        setVideos(data.results);
      } catch (error) {
        console.error("Error fetching movie videos:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieVideos();
  }, [id, i18n.language]);

  useEffect(() => {
    if (isTrailerOn) {
      // Ensure only one video plays at a time
      const trailerVideo = videos.find(video => video.site === 'YouTube' && video.type === 'Trailer');
      if (trailerVideo) {
        videoRef.current.src = `https://www.youtube.com/embed/${trailerVideo.key}?modestbranding=1&controls=0&showinfo=0&listType=playlist&rel=0&autoplay=1`;
      }
    } else if (videoRef.current) {
      // Stop the video when trailer is off
      videoRef.current.src = '';
    }
  }, [isTrailerOn, videos]);

  if (!movie) {
    return <div className="min-h-screen flex items-center justify-center text-white">{t('Loading...')}</div>;
  }

  return (
    <div className="mx-auto bg-zinc-900 text-secondary">
      <div className="relative container p-0  overflow-hidden border border-zinc-700 rounded-md">
        <div className="relative">

          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full rounded-md mb-4 "
          />


          {videos.length > 0 && (
            <iframe
                  ref={videoRef}
                  width="100%"
                  title="Movie Trailer"
                  style={{ border: 'none' }}
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className="absolute top-0 bottom-0 h-full"
                ></iframe>             
          )}




          <div className="container w-full absolute bottom-0 bg-gradient-to-t to-transparent from-50% from-zinc-900">


            <h1 className="text-3xl font-medium">{movie.title}</h1>

            <div className="flex gap-2 my-2">

              {movie.genres.map((genre, index) => {
                return (
                <div className=" h-7 flex gap-2" key={index}>
                  <span className="opacity-70">{genre.name}</span>

                  {movie.genres.length - 1 !== index && (
                    <Separator orientation='vertical' className="opacity-40" />
              )}
                </div>
              );
              })}


            </div>

            <div className="flex gap-3 mt-4">

              <Button className="rounded-full h-auto px-6 m-0 flex gap-1 items-center text-base" asChild>

                <Link to={movie.homepage} target="__blank">
                  Visit Website <ArrowRight className="size-5" />
                </Link>

              </Button>

              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="hover:border-neutral-300 hover:text-neutral-300 border-2 border-border rounded-full p-2 text-2xl m-0">
                      <RiHeartFill />
                    </button>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>Add to favourites</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <button onClick={() => setIsTrailerOn(prev => !prev)} className="hover:border-neutral-300 hover:text-neutral-300 border-2 border-border rounded-full p-2 text-2xl m-0">
                {isTrailerOn ?
                  <BsPauseFill />
                  :
                  <BiPlay />
                }
              </button>
            </div>

          </div>

        </div>
        <h2 className="text-xl italic mb-4">{movie.tagline}</h2>
        <p className="mb-4">{movie.overview}</p>
        <div className="mb-4">
          <p><strong>{t('Release Date')}</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
          <p><strong>{t('Runtime')}</strong> {movie.runtime} {t('minutes')}</p>
          <p><strong>{t('Genres')}</strong> </p>
          <p><strong>{t('Budget')}</strong> ${movie.budget.toLocaleString()}</p>
          <p><strong>{t('Revenue')}</strong> ${movie.revenue.toLocaleString()}</p>
          <p><strong>{t('Vote Average')}</strong> {movie.vote_average} ({movie.vote_count} {t('votes')})</p>
        </div>
        <a
          href={movie.homepage}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline mt-4 inline-block"
        >
          {t('Visit Official Homepage')}
        </a>


      </div>
    </div>
  );
};

export default MovieDetails;