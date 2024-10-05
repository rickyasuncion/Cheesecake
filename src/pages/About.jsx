// Refrences:
// images taken from: https://unsplash.com

import React from 'react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import { GoArrowUpRight } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";



const About = () => {
  return (
    <div className='container max-w-screen-2xl'>
   <div className='relative bg-black isolate text-white overflow-hidden rounded-lg mt-3'>
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

   <div className='py-14'>
    <h2 className='text-4xl font-medium text-center'>Our dedicated team</h2>

    <div className='flex gap-5 flex-wrap mt-4'>
    <div className='group flex-1 min-w-80 max-w-md'>
        <div className='relative bg-[url(https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]  bg-cover aspect-square rounded-md grayscale-[50%] group-hover:grayscale-0 transition-[filter]'>
        <div className='bg-white right-4 left-4 rounded-md absolute bottom-4 p-2'>
            <p className='font-medium text-lg'>Gordan Willson</p>
            <span className='text-sm text-accent-foreground font-medium'>Lead developer</span>

        </div>
        </div>
    </div>
    <div className='group flex-1 min-w-80 max-w-md'>
        <div className='relative bg-[url(https://images.unsplash.com/photo-1489980869433-d1f7c7ac0fcf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover aspect-square rounded-md grayscale-[50%] group-hover:grayscale-0 transition-[filter]'>
        <div className='bg-white right-4 left-4 rounded-md absolute bottom-4 p-2'>
            <p className='font-medium text-lg'>Oliver Nacelle </p>
            <span className='text-sm text-accent-foreground font-medium'>Payments Support</span>

        </div>
        </div>
    </div>
    <div className='group flex-1 min-w-80 max-w-md'>
        <div className='relative bg-[url(https://images.unsplash.com/photo-1489980721706-f487dab89c24?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover aspect-square rounded-md grayscale-[50%] group-hover:grayscale-0 transition-[filter]'>
        <div className='bg-white right-4 left-4 rounded-md absolute bottom-4 p-2'>
            <p className='font-medium text-lg'>Oriando Diggs</p>
            <span className='text-sm text-accent-foreground font-medium'>Cheescake Co-founder</span>

        </div>
        </div>
    </div>
    <div className='group flex-1 min-w-80 max-w-md'>
        <div className='relative bg-[url(https://images.unsplash.com/photo-1474313438662-85ce389c174a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover aspect-square rounded-md grayscale-[50%] group-hover:grayscale-0 transition-[filter]'>
        <div className='bg-white right-4 left-4 rounded-md absolute bottom-4 p-2'>
            <p className='font-medium text-lg'>Mohamad Al Sufi</p>
            <span className='text-sm text-accent-foreground font-medium'>Product co-ordinator</span>

        </div>
        </div>
    </div>
   </div>

    </div>

    </div>
  )
}

export default About