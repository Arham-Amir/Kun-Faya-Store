import { Star } from 'lucide-react'
import React from 'react'

const Headline = () => {
    return (
        <div className='overflow-x-hidden max-w-full h-8 bg-gradient-to-r from-black to-[#1D1916] text-white flex justify-center items-center headline'>
            <p className='text-xs tracking-[0.3em] flex justify-center items-center gap-20'>
                <Star size={10} className='fill-light' />
                Welcome to KunFaya Store. Your one-stop solution. Enjoy up to 40% off!
                <Star size={10} className='fill-light' />
            </p>
        </div>
    )
}

export default Headline
