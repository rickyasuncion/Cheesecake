import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/ui/card';
import { MovieCard } from '../components/ui/MovieCard';

const MoviesWIthGenre = () => {
    const { type, genreId } = useParams();
    const [movies, setMovies] = useState([]);
    const [genreList, setGenreList] = useState([])

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${type}?language=en-US&api_key=bbd89781c7835917a2decb4989b56470`

        // fetch 5 pages
        for (let i = 1; i <= 5; i++) {
            fetch(url + `&page=${i}`).then(res => res.json()).then(data => {
                const requiredMovies = data.results.filter(movie => movie.genre_ids.includes(Number(genreId)))
                setMovies(prev => [...prev, ...requiredMovies])
            });
        }

        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=bbd89781c7835917a2decb4989b56470').then(res => res.json()).then(data => setGenreList(data.genres));
    }, [])


    return (
        <div className='bg-[#171c21] text-secondary pt-5 pb-16'>
            <div className='container'>

                <div className='pt-48 pb-3 relative overflow-hidden rounded-md  isolate' >
                    <div className='bg-neutral-900/60 absolute top-0 bottom-0 z-10 w-full'>
                        <h1 className='px-4 font-semibold text-3xl text-white absolute bottom-3 capitalize'>{type === 'top_rated' ? "top rated" : type} - {genreList.find(genre => genre.id.toString() === genreId)?.name}</h1>
                    </div>
                    <img src="/hero.jpg" alt="" className='absolute top-0 bottom-0 z-5' />
                </div>



                <div className='flex gap-3 flex-wrap mt-10'>
                    {movies && movies.map(movie => {
                        return <MovieCard key={movie.id} id={movie.id} media_type={'movie'} title={movie.title} name={movie.name} poster_path={movie.poster_path} href={`/details/movie/${movie.id}`} className=' flex-1 min-w-44 max-w-none' />
                    })}

                </div>
            </div>
        </div>
    )
}

export default MoviesWIthGenre