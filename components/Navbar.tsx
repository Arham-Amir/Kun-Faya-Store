"use client";

import useCart from "@/lib/hooks/useCart";

import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ModeToggle } from "./ui/toggleModeButton";

const Navbar: React.FC = () => {

  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();
  const [active, setActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function toggleActive() {
    setActive((prev) => !prev);
  }

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

  return (
    <div className="h-[55px] w-full fixed top-0 z-20 py-2 px-10 flex gap-2 justify-between items-center bg-black shadow-md text-white max-sm:px-2">
      <Link href="/">
        <Image src="/logo-dark.png" alt="logo" width={140} height={100} className="object-fill" />
      </Link>

      <div className="flex gap-5 text-base-bold max-md:hidden">
        <Link
          href="/"
          className={`hover:text-primary ${pathname === "/" && "text-primary"}`}
        >
          Home
        </Link>
        <Link
          href="/collections"
          className={`hover:text-primary ${pathname === "/collections" && "text-primary"}`}
        >
          Collections
        </Link>
        <Link
          href={user ? "/wishlist" : "/sign-in"}
          className={`hover:text-primary ${pathname === "/wishlist" && "text-primary"}`}
        >
          Wishlist
        </Link>
        <Link
          href={user ? "/orders" : "/sign-in"}
          className={`hover:text-primary ${pathname === "/orders" && "text-primary"}`}
        >
          Orders
        </Link>
      </div>

      <div className="relative flex gap-3 items-center">
        {/* <button
          disabled={query === ""}
          onClick={() => router.push(`/search/${query}`)}
        >
          <Search className="cursor-pointer h-4 w-4 hover:text-primary" />
        </button> */}
        <Link
          href="/cart"
          className="max-md:hover:scale-105 transition-all duration-200 flex items-center gap-1 md:gap-3 md:border md:rounded-lg md:px-2 md:py-1 bg-black md:hover:bg-white text-white md:hover:text-black"
        >
          <ShoppingCart />
          <sup className="text-primary  block md:hidden">{cart.cartItems.length}</sup>
          <p className="text-base-bold max-md:hidden">Cart ({cart.cartItems.length})</p>
        </Link>

        {
          /* <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
          <input
            className="outline-none max-sm:max-w-[120px]"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            disabled={query === ""}
            onClick={() => router.push(`/search/${query}`)}
          >
            <Search className="cursor-pointer h-4 w-4 hover:text-primary" />
          </button>
        </div> */
        }

        {user ? (
          <div className="">
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        ) : (
          <Link href="/sign-in" className="hover:text-primary">
            <CircleUserRound />
          </Link>
        )}
        <HamBurger toggleActive={toggleActive} />
        <MobileMenu user={user} active={active} toggleActive={toggleActive} menuRef={menuRef} pathname={pathname} />
        <Overlay active={active} toggleActive={toggleActive} />
      </div>
    </div>
  );
};

export default Navbar;

type HamBurgerProps = {
  toggleActive: () => void;
};

const HamBurger: React.FC<HamBurgerProps> = ({ toggleActive }) => {
  return (
    <button className="cursor-pointer md:hidden" onClick={toggleActive}><Menu /></button>
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
    <div ref={menuRef} className={`z-10 fixed top-0 right-0 w-[70%] text-black bg-white min-h-screen transition-transform duration-200 ${active ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-screen w-full relative flex justify-center items-center">
        <button className="cursor-pointer" onClick={toggleActive}>
          <X className="absolute top-3 left-3 text-black" />
        </button>
        <div className="flex flex-col items-center gap-6">
          <Link onClick={() => { toggleActive() }} href="/" className={`hover:text-primary text-heading4-bold ${pathname === "/" && "text-primary"}`}>
            Home
          </Link>
          <Link onClick={() => { toggleActive() }} href="/collections"
            className={`hover:text-primary text-heading4-bold ${pathname === "/collections" && "text-primary"}`}
          >
            Collections
          </Link>
          <Link onClick={() => { toggleActive() }} href={user ? "/wishlist" : "/sign-in"}
            className={`hover:text-primary text-heading4-bold ${pathname === "/wishlist" && "text-primary"}`}
          >
            Wishlist
          </Link>
          <Link onClick={() => { toggleActive() }} href={user ? "/orders" : "/sign-in"}
            className={`hover:text-primary text-heading4-bold ${pathname === "/orders" && "text-primary"}`}
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
      className={`fixed top-0 left-0 w-full h-full bg-black/50 transition-opacity duration-300 ${active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={toggleActive}
    />
  );
};