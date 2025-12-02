"use client";

import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);
  const messages = [
    "Free Shipping on Orders Over $100 🚚",
    "New Summer Collection is Live! ☀️",
    "Get 50% OFF on Selected Items 🔥",
    "Sign up for our Newsletter for Exclusive Deals 📩"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-medium relative overflow-hidden h-9">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`absolute w-full top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out ${i === index ? "opacity-100 translate-y-[-50%]" : "opacity-0 translate-y-[50%]"
            }`}
        >
          {msg}
        </div>
      ))}
    </div>
  );
};

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();
  const [active, setActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function toggleActive() {
    setActive((prev) => !prev);
  }

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [active]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    }
    if (active) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [active]);

  const navbarClasses = scrolled
    ? "w-full sticky top-0 z-50 transition-all duration-300 bg-black/95 backdrop-blur-md shadow-lg py-3"
    : "w-full sticky top-0 z-50 transition-all duration-300 bg-black py-4";

  return (
    <>
      <AnnouncementBar />
      <div className={navbarClasses}>
        <div className="container mx-auto px-4 md:px-10 flex justify-between items-center text-white">
          <Link href="/">
            <Image src="/logo-dark.png" alt="logo" width={140} height={100} className="object-contain w-32 md:w-40" />
          </Link>

          <div className="flex gap-8 text-base-medium max-md:hidden items-center">
            <Link
              href="/"
              className={`hover:text-primary transition-colors duration-200 relative group ${pathname === "/" ? "text-primary" : ""}`}
            >
              Home
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${pathname === "/" ? "w-full" : ""}`}></span>
            </Link>
            <Link
              href="/collections"
              className={`hover:text-primary transition-colors duration-200 relative group ${pathname === "/collections" ? "text-primary" : ""}`}
            >
              Collections
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${pathname === "/collections" ? "w-full" : ""}`}></span>
            </Link>
            <Link
              href={user ? "/wishlist" : "/sign-in"}
              className={`hover:text-primary transition-colors duration-200 relative group ${pathname === "/wishlist" ? "text-primary" : ""}`}
            >
              Wishlist
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${pathname === "/wishlist" ? "w-full" : ""}`}></span>
            </Link>
            <Link
              href={user ? "/orders" : "/sign-in"}
              className={`hover:text-primary transition-colors duration-200 relative group ${pathname === "/orders" ? "text-primary" : ""}`}
            >
              Orders
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${pathname === "/orders" ? "w-full" : ""}`}></span>
            </Link>
          </div>

          <div className="relative flex gap-4 items-center">
            <Link
              href="/cart"
              className="group flex items-center gap-2 hover:text-primary transition-colors duration-200"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cart.cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.cartItems.length}
                  </span>
                )}
              </div>
              <span className="text-base-medium max-md:hidden">Cart</span>
            </Link>

            {user ? (
              <div className="">
                <UserButton afterSignOutUrl="/sign-in" />
              </div>
            ) : (
              <Link href="/sign-in" className="hover:text-primary transition-colors duration-200">
                <CircleUserRound className="w-6 h-6" />
              </Link>
            )}

            <HamBurger toggleActive={toggleActive} />
            <MobileMenu user={user} active={active} toggleActive={toggleActive} menuRef={menuRef} pathname={pathname} />
            <Overlay active={active} toggleActive={toggleActive} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

type HamBurgerProps = {
  toggleActive: () => void;
};

const HamBurger: React.FC<HamBurgerProps> = ({ toggleActive }) => {
  return (
    <button className="cursor-pointer md:hidden hover:text-primary transition-colors" onClick={toggleActive}>
      <Menu className="w-7 h-7" />
    </button>
  );
};

type MobileMenuProps = {
  user: any;
  active: boolean;
  toggleActive: () => void;
  menuRef: React.RefObject<HTMLDivElement>;
  pathname: string;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ user, active, toggleActive, menuRef, pathname }) => {
  return (
    <div ref={menuRef} className={`z-50 fixed top-0 right-0 w-[80%] max-w-[300px] text-white bg-black/95 backdrop-blur-xl min-h-screen transition-transform duration-300 ease-in-out shadow-2xl ${active ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full w-full relative flex flex-col p-8">
        <button className="cursor-pointer self-end mb-8 hover:text-primary transition-colors" onClick={toggleActive}>
          <X className="w-8 h-8" />
        </button>

        <div className="flex flex-col gap-8">
          <Link onClick={() => { toggleActive() }} href="/" className={`text-2xl font-bold hover:text-primary transition-colors ${pathname === "/" && "text-primary"}`}>
            Home
          </Link>
          <Link onClick={() => { toggleActive() }} href="/collections"
            className={`text-2xl font-bold hover:text-primary transition-colors ${pathname === "/collections" && "text-primary"}`}
          >
            Collections
          </Link>
          <Link onClick={() => { toggleActive() }} href={user ? "/wishlist" : "/sign-in"}
            className={`text-2xl font-bold hover:text-primary transition-colors ${pathname === "/wishlist" && "text-primary"}`}
          >
            Wishlist
          </Link>
          <Link onClick={() => { toggleActive() }} href={user ? "/orders" : "/sign-in"}
            className={`text-2xl font-bold hover:text-primary transition-colors ${pathname === "/orders" && "text-primary"}`}
          >
            Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

type OverlayProps = {
  active: boolean;
  toggleActive: () => void;
};

const Overlay: React.FC<OverlayProps> = ({ active, toggleActive }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40 ${active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={toggleActive}
    />
  );
};