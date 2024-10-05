import React from 'react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import { GoArrowUpRight } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";



const About = () => {
  return (
   <div className='relative bg-black isolate text-white'>
        <img src="/hero.jpg" alt="" className='-z-10 absolute w-full h-full object-cover opacity-20' />
        <div className='py-24 text-center space-y-4'>
            <h1 className='text-5xl font-medium'>The Only place to get movie recommendations</h1>
            <p className='max-w-lg mx-auto'>Our philosphy is simple, no more hasle finding movies/tvshows that you are looking for to make your day great.</p>

            <div className='flex justify-center gap-5'>
                <Button asChild className='border-2 text-lg h-auto hover:bg-black/60 border-white bg-black/40 text-white flex items-center gap-2 max-w-fit'>
                    <Link to={'/movies'}><GoArrowUpRight className='size-6' />
                    Browser Movies</Link>
                </Button>
                <Button asChild className="text-lg h-auto">
                    <Link to={'/favourites'}><GoHeartFill className='size-6 mr-1' />
                    Your Favourite movies</Link>
                </Button>
            </div>
        </div>
   </div>
  )
}

export default About