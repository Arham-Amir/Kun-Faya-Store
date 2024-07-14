import { Copyright, Facebook, Instagram, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    return <div className="w-full">
        <Newsletter />
        <PageEnd />
    </div>
}

function Newsletter() {
    return <div className="bg-black text-white py-10 px-8 md:px-14 flex gap-8 flex-col md:flex-row justify-around items-center mx-auto mt-10">
        <div className="flex flex-col gap-2">
            <p className="text-body-semibold text-center md:text-start">SIGN UP FOR OUR NEWSLETTER</p>
            <p className="text-base-medium text-center md:text-start">Be the first own to know about our offers, product launch and events.</p>
        </div>
        <div className="flex items-center gap-1 flex-wrap justify-center">
            <input type="text" className="px-2 py-3 w-[300px] rounded-md bg-white/70 text-black placeholder:text-grey-1" placeholder="Enter Your Email" />
            <button className="text-white btn bg-red-1">Subscribe</button>
        </div>
    </div>
}

function PageEnd() {
    return <div className="bg-white text-black px-8 md:px-14 flex gap-8 flex-col md:flex-row items-center mx-auto">
        <div className="container flex flex-col mx-auto">
            <div className="flex flex-col gap-8 items-center w-full my-20">
                <span className="">
                    <Link href="/">
                        <Image src="/logo1.png" alt="logo" width={240} height={100} className="object-fill" />
                    </Link>
                </span>
                <div className="flex flex-col items-center gap-6 ">
                    <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-12 gap-y-3 lg:flex-nowrap text-dark-grey-900">
                        <a href="/about" className="text-black hover:text-red-1">About</a>
                        <a href="/collections" className="text-black hover:text-red-1">Collections</a>
                        <a href="/wishlist" className="text-black hover:text-red-1">Wishlist</a>
                        <a href="/orders" className="text-black hover:text-red-1">Orders</a>
                        <a href="/cart" className="text-black hover:text-red-1">Cart</a>
                    </div>
                    <div className="flex items-center gap-8">
                        <a href="https://www.facebook.com/" target="_blank" className="text-black hover:text-red-1">
                            <Facebook />
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" className="text-black hover:text-red-1">
                            <Instagram />
                        </a>
                        <a href="https://www.youtube.com/" target="_blank" className="text-black hover:text-red-1">
                            <Youtube />
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex items-center py-5 border-t-2">
                <p className="text-base font-normal leading-7 text-center text-grey-700 flex items-center gap-1">
                    <Copyright className="inline-block"/> 2024 Kun Faya. All rights reserved.</p>
            </div>
        </div>
    </div>
}
