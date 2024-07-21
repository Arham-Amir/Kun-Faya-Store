import React from 'react'

const Bannerdiv = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="relative w-full h-auto py-20 px-3 curved bg-[url('/herobg.png')] bg-fixed">
            <div className='h-full w-full flex flex-col gap-5 justify-center items-center text-white'>
                {children}
            </div>
        </div>
    )
}

export default Bannerdiv
