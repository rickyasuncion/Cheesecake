import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from './lib/utils'
import { useTranslation } from 'react-i18next'


const Card = ({ bgImage, title, href, className }) => {
    const { t } = useTranslation();

    return (
        <Link to={href} className={cn('overflow-hidden relative  inline-block border-[1.5px] rounded-lg border-border/20 hover:border-border transition-[border]', className)}>
            <div className='absolute w-full bottom-0 bg-gradient-to-t from-black to-transparent h-16'></div>
            <div className='aspect-video'>
                <img src={bgImage} alt={t(title)} className='h-full w-full object-cover object-top' />
            </div>
            <span className='font-medium absolute bottom-3 left-3'>{t(title)}</span>
        </Link>
    )
}

export default Card