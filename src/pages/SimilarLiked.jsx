import React, { useEffect, useState } from 'react'
import { fetchAndSetFavouriteMovies, fetchAndSetFavouriteTv } from '../_utils/utils';
import { MovieCard } from '../components/ui/MovieCard';
import MovieListView from '../components/LandingPage/MovieListView';
import { t } from 'i18next';

const SimilarLiked = () => {
    const [favouriteMovies, setFavouritesMovies] = useState([]);
    const [favouriteTv, setFavouriteTv] = useState([]);
    const [similarFavMovies, setSimilarFavMovies] = useState({});

    useEffect(() => {
        fetchAndSetFavouriteMovies(setFavouritesMovies)
        fetchAndSetFavouriteTv(setFavouriteTv)

    }, [])

    useEffect(() => {
        favouriteMovies.map(async movie => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/similar?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470`);
            const relatedMovies = await res.json();

            setSimilarFavMovies(prev => {
                const temp = { ...prev };
                temp[movie.title] = relatedMovies.results
                return temp;
            })
        })
    }, [favouriteMovies.length])


    return (
        <div className='container'>
            <h2 className='text-lg font-medium underline'>Similar favourite movies</h2>
            <div className='space-y-4 py-2'>
                {Object.keys(similarFavMovies).map(key => {
                    return similarFavMovies[key].length === 0 ? <div className='container'> <h2 className="text-lg font-medium">{t(key)}</h2><h4>No Similar movies found</h4></div> :
                        <MovieListView movies={similarFavMovies[key].map(movie => ({ ...movie, media_type: 'movie' }))} title={t(key)} contentType='movies' />
                })}
            </div>
        </div>
    )
}

export default SimilarLiked