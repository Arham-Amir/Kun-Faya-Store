import React from 'react'

const Bannerdiv = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative w-full min-h-[40vh] py-20 px-4 flex items-center justify-center bg-[url('/herobg.png')] bg-cover bg-center bg-fixed bg-no-repeat">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
            <div className='relative z-10 w-full max-w-4xl flex flex-col gap-6 justify-center items-center text-white text-center'>
                {children}
            </div>
        </div>
    )
}

export default Bannerdiv
