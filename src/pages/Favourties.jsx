import React, { useEffect, useState } from 'react'
import { fetchAndSetFavouriteMovies, fetchAndSetFavouriteTv, fetchData } from '../_utils/utils';
import { MovieCard } from '../components/ui/MovieCard';
import { Button } from '../components/ui/button';
import { IoIosRemoveCircle } from "react-icons/io";
import { Link } from 'react-router-dom';


const Favourties = () => {
    const [favouriteMovies, setFavouritesMovies] = useState([]);
    const [favouriteTv, setFavouriteTv] = useState([]);


    useEffect(() => {
        fetchAndSetFavouriteMovies(setFavouritesMovies)
        fetchAndSetFavouriteTv(setFavouriteTv);
    }, [])


    function handleRemoveFavourite(id, contentType) {

        if (contentType === 'movie') {
            const data = JSON.parse(localStorage.getItem("favouriteMovies"));
            localStorage.setItem('favouriteMovies', JSON.stringify(data.filter(fav => fav != id)))
            fetchAndSetFavouriteMovies(setFavouritesMovies)
        }
        if (contentType === 'tv') {
            const data = JSON.parse(localStorage.getItem("favouriteTv"));
            localStorage.setItem('favouriteTv', JSON.stringify(data.filter(fav => fav != id)))
            fetchAndSetFavouriteTv(setFavouriteTv)
        }

    }

    return (

        <div className='container py-4'>
            <Button asChild className="mb-3">
                <Link to={'/favourites/similar'}>Browse Similar Movies/TvShows</Link>
            </Button>
            <h1 className='text-lg font-semibold underline'>
                Favourite Movies
            </h1>
            <div className='flex flex-wrap gap-2 p-2'>
                {
                    favouriteMovies.map((movie) => (
                        <div className='relative max-w-[200px] ' key={movie.id}>
                            <Button variant="destructive" onClick={() => handleRemoveFavourite(movie.id, 'movie')} className="absolute z-10 p-1.5 text-neutral-100 h-auto right-2 top-2"><IoIosRemoveCircle />
                            </Button>
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                imageUrl={movie.imageUrl}
                                media_type={'movie'}
                                title={movie.title}
                                name={movie.name}
                                poster_path={movie.poster_path}
                                showFavButton={false}
                            />
                        </div>
                    ))
                }
            </div >


            <h1 className='text-lg font-semibold underline'>
                Favourite TV Shows
            </h1>
            <div className='flex flex-wrap gap-2 p-2'>
                {
                    favouriteTv.map((show) => (
                        <div className='relative max-w-[200px] ' key={show.id}>
                            <Button variant="destructive" onClick={() => handleRemoveFavourite(show.id, 'tv')} className="absolute z-10 p-1.5 text-neutral-100 h-auto right-2 top-2"><IoIosRemoveCircle />
                            </Button>
                            <MovieCard
                                key={show.id}
                                id={show.id}
                                imageUrl={show.imageUrl}
                                media_type={'tv'}
                                title={show.title}
                                name={show.name}
                                poster_path={show.poster_path}
                                showFavButton={false}
                            />
                        </div>
                    ))
                }
            </div >

        </div>

    )
}

export default Favourties
