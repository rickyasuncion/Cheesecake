import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from './lib/utils'


const Card = ({ bgImage, title, href, className }) => {
    return (
        <Link to={href} className={cn('overflow-hidden relative  inline-block border-[1.5px] rounded-lg border-border/20 hover:border-border transition-[border]', className)}>
            <div className='absolute w-full bottom-0 bg-gradient-to-t from-black to-transparent h-16'></div>
            <div className='aspect-video'>
                <img src={bgImage} alt="" className='h-full w-full object-cover object-top' />
            </div>
            <span className='font-medium absolute bottom-3 left-3'>{title}</span>
        </Link>
    )
}

export default Card