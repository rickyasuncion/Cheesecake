import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie or show ID from the URL
  const [movie, setMovie] = useState(null); // State to store the fetched movie details
  const [error, setError] = useState(null); // State to handle any errors during fetching
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch movie/show details from the TMDb API using the ID from the URL
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=your_api_key`
        );
        const data = await response.json();
        if (response.ok) {
          setMovie(data);
        } else {
          setError(data.status_message || "Failed to fetch movie details");
        }
      } catch (err) {
        setError("An error occurred while fetching movie details.");
      } finally {
        setLoading(false); // Whether successful or failed, stop the loading state
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Display a loading message while fetching
  if (loading) return <div>Loading...</div>;

  // Display an error message if fetching failed
  if (error) return <div>Error: {error}</div>;

  // If movie data is fetched successfully, display the movie/show details
  return (
    <div className="movie-details container mx-auto p-4">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <img
        className="w-1/2"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <p className="text-gray-700 my-4">{movie.overview}</p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average}/10
      </p>
      <p>
        <strong>Genres:</strong>{" "}
        {movie.genres.map((genre) => genre.name).join(", ")}
      </p>
    </div>
  );
};

export default MovieDetails;
