import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const MovieDetails = ({ id }) => {
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const { t, i18n } = useTranslation();


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

  if (!movie) {
    return <div className="min-h-screen flex items-center justify-center text-white">{t('Loading...')}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
        alt={movie.title} 
        className="w-full h-auto rounded-lg mb-4" 
      />
      <h2 className="text-xl italic mb-4">{movie.tagline}</h2>
      <p className="mb-4">{movie.overview}</p>
      <div className="mb-4">
        <p><strong>{t('Release Date')}</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
        <p><strong>{t('Runtime')}</strong> {movie.runtime} {t('minutes')}</p>
        <p><strong>{t('Genres')}</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
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
      
      {/* Display Movie Trailers */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">{t('Trailers')}</h2>

        {videos.length > 0 ? (
          videos
            .filter(video => video.site === 'YouTube' && video.type === 'Trailer') // Only YouTube trailers
            .map(video => (
              <div key={video.id} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{video.name}</h3>
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.key}`} // Embed YouTube video
                  title={video.name}
                  style={{ border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))
        ) : (
          <p>{t('No trailers available.')}</p>
        )}
      </div>      
    </div>
  );
};

export default MovieDetails;