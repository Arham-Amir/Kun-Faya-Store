import AnimatedButton from "@/components/animatedButton"
import Bannerdiv from "./bannerdiv"


const Hero = () => {
    return (
        <Bannerdiv >
            <div className="flex flex-col items-center w-full h-auto">
                <h3 className='tracking-widest lg:tracking-[0.4em] text-heading4-bold'>WELCOME TO</h3>
                <h1 className='text-[3em] sm:text-[4em] lg:text-[8em] font-bold p-0 w-fit text-center'>Kun Faya
                    <span className='text-orange-600'> Store</span>
                </h1>
            </div>
            <AnimatedButton text="Shop Now" />
        </Bannerdiv >
    )
}

export default Hero