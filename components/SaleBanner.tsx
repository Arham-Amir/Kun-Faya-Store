"use client"

import Link from "next/link";

const SaleBanner = () => {
  return (
    <div className="w-full container mx-auto px-4 md:px-10 my-10">
      <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 p-10 md:p-16 text-center text-white shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col items-center gap-6">
          <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Limited Time Offer</span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            End of Season Sale
          </h2>
          <p className="text-xl md:text-2xl font-light max-w-2xl">
            Get up to <span className="font-bold text-yellow-300">50% OFF</span> on selected items. Don't miss out on these amazing deals!
          </p>
          <Link href="/collections" className="mt-4 bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Shop The Sale
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SaleBanner;
