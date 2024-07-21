import React from 'react'
import AnimatedButton from './animatedButton'

const SaleBanner = () => {
  return (
    <div className="w-full p-2 py-16 flex flex-col gap-5 items-center bg-[url('/salebanner.jpg')] bg-cover text-white">
      <h3 className='text-body-bold'>Sale Offer</h3>
      <h2 className='text-heading2-bold text-center'>Up to <span className='text-primary'>40% Off</span> on entire collections</h2>
      <AnimatedButton text='Explore More'/>
    </div>
  )
}

export default SaleBanner
