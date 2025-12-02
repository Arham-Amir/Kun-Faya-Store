import React from 'react'

interface ModernBannerProps {
    title: string;
    description?: string;
    image?: string;
    children?: React.ReactNode;
}

const ModernBanner: React.FC<ModernBannerProps> = ({ title, description, image, children }) => {
    const bgImage = image || '/herobg.png';

    return (
        <div className="relative w-full min-h-[45vh] lg:min-h-[50vh] flex items-center justify-center overflow-hidden">
            {/* Parallax Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transform scale-105"
                style={{ backgroundImage: `url('${bgImage}')` }}
            ></div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center gap-6 text-center text-white">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {title}
                </h1>

                {description && (
                    <p className="text-lg md:text-xl lg:text-2xl font-light max-w-2xl text-gray-100 drop-shadow-md animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        {description}
                    </p>
                )}

                {children && (
                    <div className="mt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        {children}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ModernBanner
