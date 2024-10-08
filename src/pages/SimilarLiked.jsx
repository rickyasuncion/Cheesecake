import React, { useEffect, useState } from 'react'
import { fetchAndSetFavouriteMovies, fetchAndSetFavouriteTv } from '../_utils/utils';

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
        <div>
            <h2 className='text-lg font-medium underline'>Similar favourite movies</h2>

        </div>
    )
}

export default SimilarLiked