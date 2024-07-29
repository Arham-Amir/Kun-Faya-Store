"use client"
import { Copyright, Facebook, Instagram, Youtube } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

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
            <input type="text" className="bg-input px-2 py-3 w-[300px] rounded-md placeholder:text-muted-foreground" placeholder="Enter Your Email" />
            <button className="text-white btn bg-primary hover:bg-primary/80">Subscribe</button>
        </div>
    </div>
}

function PageEnd() {
    const { theme, resolvedTheme } = useTheme();
    const [logoSrc, setLogoSrc] = useState('/logo-light.png'); // Set a default value

    useEffect(() => {
        if (theme || resolvedTheme) {
            setLogoSrc(theme === 'dark' || resolvedTheme === 'dark' ? '/logo-dark.png' : '/logo-light.png');
        }
    }, [theme, resolvedTheme]);

    return <div className="px-8 md:px-14 flex gap-8 flex-col md:flex-row items-center mx-auto">
        <div className="container flex flex-col mx-auto">
            <div className="flex flex-col gap-8 items-center w-full my-20">
                <span className="">
                    <Link href="/">
                        <Image src={logoSrc} alt="logo" width={240} height={100} className="object-fill" />
                    </Link>
                </span>
                <div className="flex flex-col items-center gap-6 ">
                    <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-12 gap-y-3 lg:flex-nowrap text-foreground">
                        <a href="/about" className=" hover:text-primary">About</a>
                        <a href="/collections" className=" hover:text-primary">Collections</a>
                        <a href="/wishlist" className=" hover:text-primary">Wishlist</a>
                        <a href="/orders" className=" hover:text-primary">Orders</a>
                        <a href="/cart" className=" hover:text-primary">Cart</a>
                    </div>
                    <div className="flex items-center gap-8">
                        <a href="https://www.facebook.com/" target="_blank" className=" hover:text-primary">
                            <Facebook />
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" className=" hover:text-primary">
                            <Instagram />
                        </a>
                        <a href="https://www.youtube.com/" target="_blank" className=" hover:text-primary">
                            <Youtube />
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex items-center py-5 border-t-2 border-muted-foreground">
                <p className="text-base font-normal leading-7 text-center text-foreground flex items-center gap-1">
                    <Copyright className="inline-block" /> 2024 Kun Faya. All rights reserved.</p>
            </div>
        </div>
    </div>
}
