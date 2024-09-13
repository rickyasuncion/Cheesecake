import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // If using React Router
import { Button } from '../components/UI/button';
import { MovieCard } from '../components/UI/MovieCard';

const MovieDetailsPage = () => {
  const { id } = useParams(); // Gets the movie ID from the URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Fetch movie details from an API
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-page">
      <MovieCard
        id={movie.id}
        imageUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        media_type="movie"
        title={movie.title}
        name=""
        poster_path={movie.poster_path}
      />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <Button variant="default" size="lg">
        Add to Favorites
      </Button>
      {/* Add more details and buttons as needed */}
    </div>
  );
};

export default MovieDetailsPage;
