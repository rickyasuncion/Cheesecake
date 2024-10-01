import React, { useEffect, useState } from 'react'
import Card from '../components/ui/card'
import { Separator } from '@radix-ui/react-separator'


const TvShows = () => {
    const [trendingTvShows, setTrendingTvShows] = useState([]);
    const [topRateTvShows, setTopRateTvShows] = useState([])
    const [tvShowsToday, setTvShowsToday] = useState([]);

    function fetchTvShows(url, callback) {
        fetch(url)
            .then(res => res.json())
            .then(json => {
                callback(json.results.splice(0, 5));
            })
    }

    useEffect(() => {

        fetchTvShows('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=021d1a1f14e24ac19694e6363bc04b76', setTopRateTvShows)
        fetchTvShows('https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=021d1a1f14e24ac19694e6363bc04b76', setTrendingTvShows)
        fetchTvShows('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1&api_key=021d1a1f14e24ac19694e6363bc04b76', setTvShowsToday)
    }, [])



    return (
        <div className='bg-[#171c21] text-secondary pt-5 pb-16'>
            <div className='container'>

                <div className='pt-48 pb-3 relative overflow-hidden rounded-md  isolate' >
                    <div className='bg-neutral-900/60 absolute top-0 bottom-0 z-10 w-full'>
                        <h1 className='px-4 font-semibold text-3xl text-white absolute bottom-3'>All TV Shows</h1>
                    </div>
                    <img src="/hero.jpg" alt="" className='absolute top-0 bottom-0 z-5' />
                </div>


                <div className='mt-5'>
                    <h2 className='text-lg mb-2 font-medium'>Trending</h2>

                    <div className='flex gap-3 flex-wrap'>
                        {trendingTvShows && trendingTvShows.map(tvShow => {
                            return <Card title={tvShow.name} href={`/details/tv/${tvShow.id}`} className={'min-w-56 max-w-60  flex-1'} bgImage={`https://image.tmdb.org/t/p/w500/${tvShow.backdrop_path}`} />
                        })}

                    </div>
                </div>

                <Separator className='h-0.5 bg-secondary/5 my-5' />

                <div>
                    <h2 className='text-lg mb-2 font-medium'>Top Rated</h2>

                    <div className='flex gap-3 flex-wrap'>
                        {topRateTvShows && topRateTvShows.map(tvShow => {
                            return <Card title={tvShow.name} href={`/details/tv/${tvShow.id}`} className={'min-w-56 max-w-60  flex-1'} bgImage={`https://image.tmdb.org/t/p/w500/${tvShow.backdrop_path}`} />
                        })}

                    </div>
                </div>

                <Separator className='h-0.5 bg-secondary/5 my-5' />

                <div>
                    <h2 className='text-lg mb-2 font-medium'>Airing Today</h2>

                    <div className='flex gap-3 flex-wrap'>
                        {tvShowsToday && tvShowsToday.map(tvShow => {
                            return <Card title={tvShow.name} href={`/details/tv/${tvShow.id}`} className={'min-w-56 max-w-60  flex-1'} bgImage={`https://image.tmdb.org/t/p/w500/${tvShow.backdrop_path}`} />
                        })}

                    </div>
                </div>
            </div>


        </div>
    )
}

export default TvShows