"use client"

import React from 'react'
import { Link } from "react-scroll"

const AnimatedButton = ({text}: {text:string}) => {
    return (
        <Link to="collections" offset={-50} className="relative border hover:border-orange-600 duration-500 group cursor-pointer text-orange-50  overflow-hidden h-14 w-56 rounded-md bg-orange-700 p-2 flex justify-center items-center font-extrabold outline-none">
            <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-orange-700 delay-150 group-hover:delay-75"></div>
            <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-orange-600 delay-150 group-hover:delay-100"></div>
            <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-orange-600 delay-150 group-hover:delay-150"></div>
            <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-orange-500 delay-150 group-hover:delay-200"></div>
            <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-orange-500 delay-150 group-hover:delay-300"></div>
            <p className="z-10 sm:text-lg">{text}</p>
        </Link>
    )
}

export default AnimatedButton
