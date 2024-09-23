import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const ShowDetails = ({id}) => {
    const [show, setShow] = useState(null);
    const { t, i18n } = useTranslation();

    useEffect(() => {
      const fetchMovieDetails = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${id}?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
          );
          const data = await response.json();
          setShow(data);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      };
  
      fetchMovieDetails();
    }, [id, i18n.language]);
  
    if (!show) {
      return <div className="min-h-screen flex items-center justify-center text-white">{t('Loading...')}</div>;
    }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white">
    <h1 className="text-3xl font-bold mb-2">{show.name}</h1>
    <img 
      src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`} 
      alt={show.name} 
      className="w-full h-auto rounded-lg mb-4" 
    />
    <p className="mb-4">{show.overview}</p>
    <div className="mb-4">
      <p><strong>{t('First Air Date')}</strong> {new Date(show.first_air_date).toLocaleDateString()}</p>
      <p><strong>{t('Last Air Date')}</strong> {new Date(show.last_air_date).toLocaleDateString()}</p>
      <p><strong>{t('Number of Seasons')}</strong> {show.number_of_seasons}</p>
      <p><strong>{t('Number of Episodes')}</strong> {show.number_of_episodes}</p>
      <p><strong>{t('Genres')}</strong> {show.genres.map(genre => genre.name).join(', ')}</p>
      <p><strong>{t('Vote Average')}</strong> {show.vote_average} ({show.vote_count} {t('votes')})</p>
    </div>
    <p className="font-bold mb-2">{t('Last Episode')}</p>
    <div className="mb-4">
      <h3>{show.last_episode_to_air.name}</h3>
      <p>{show.last_episode_to_air.overview}</p>
      <p><strong>{t('Air Date')}</strong> {new Date(show.last_episode_to_air.air_date).toLocaleDateString()}</p>
      <img 
        src={`https://image.tmdb.org/t/p/w500${show.last_episode_to_air.still_path}`} 
        alt={show.last_episode_to_air.name} 
        className="w-full h-auto rounded-lg" 
      />
    </div>
    <p className="font-bold mb-2">{t('Production Companies')}:</p>
    <ul className="list-none p-0">
      {show.production_companies.map(company => (
        <li key={company.id} className="flex items-center mb-2">
          {company.name} 
          <img 
            src={`https://image.tmdb.org/t/p/w500${company.logo_path}`} 
            alt={company.name} 
            className="w-12 h-12 ml-2 rounded" 
          />
        </li>
      ))}
    </ul>
  </div>
  )
}

export default ShowDetails