import Image from "next/image";
import Link from "next/link";


const Hero = () => {
    return (
        <div className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-banner.png"
                    alt="Hero Banner"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-1000">
                <h2 className="text-white text-sm md:text-base tracking-[0.3em] uppercase font-semibold mb-2">
                    Welcome to Kun Faya Store
                </h2>
                <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
                    Elevate Your <span className="text-primary">Style</span>
                </h1>
                <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                    Discover our curated collection of premium fashion and accessories.
                    Designed for those who appreciate elegance and quality.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Link
                        href="/collections"
                        className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/25"
                    >
                        Shop Now
                    </Link>
                    <Link
                        href="/#products"
                        className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                    >
                        View Latest
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;