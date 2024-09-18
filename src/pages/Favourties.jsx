import React, { useEffect, useState } from 'react'
import { fetchData } from '../_utils/utils';
import MovieListView from '../components/LandingPage/MovieListView';
import { MovieCard } from '../components/ui/MovieCard';

const Favourties = () => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        async function fetchAndSetMovies() {
            const data = JSON.parse(localStorage.getItem("favourites"));

            // try to find ids in movies
            const moviePromises = data.map(movieId => {
                const moviePromise = fetchData(
                    `https://api.themoviedb.org/3/movie/${movieId}?api_key=bbd89781c7835917a2decb4989b56470`
                );
                return moviePromise;
            })

            const movies = await Promise.all(moviePromises);

            // try to find non-success results in tv-shows

            const favouriteResultsPromises = movies.map(async (movie, idx) => {
                // movie was not found
                if (movie.success === false) {
                    const tvShow = await fetchData(
                        `https://api.themoviedb.org/3/tv/${data[idx]}?api_key=bbd89781c7835917a2decb4989b56470`
                    )
                    return tvShow;
                }
                return movie
            })

            const favouriteResults = await Promise.all(favouriteResultsPromises);
            const filteredResults = favouriteResults.map(res => ({ id: res.id, title: res.title, name: res.name, poster_path: res.poster_path }))
            setFavourites(filteredResults)
        }
        fetchAndSetMovies()

    }, [])

    return (

        <div className='flex gap-2 p-4 container'>
            {
                favourites.map((movie) => (
                    <div className='relative max-w-[200px]'>
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            imageUrl={movie.imageUrl}
                            media_type={movie.media_type}
                            title={movie.title}
                            name={movie.name}
                            poster_path={movie.poster_path}
                        />
                    </div>
                ))}
        </div>

    )
}

export default Favourties