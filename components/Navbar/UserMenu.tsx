"use client";
import { useState, useRef, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "../toggle-theme";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import Button from "../Button";

const UserMenu = () => {
  const { isSignedIn, isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-2">
      {isSignedIn ? (
        <>
          <button onClick={toggleMenu}>
            {isOpen ? (
              <div>
                <RxCross2 size={30} />
              </div>
            ) : (
              <div>
                <IoMenu size={30} />
              </div>
            )}
          </button>
          {isOpen && (
            <>
              <div
                ref={menuRef}
                className="absolute top-16 right-0 sm:right-40 bg-white text-black p-2 rounded-xl border shadow-md z-50 w-full h-full sm:w-auto sm:h-auto"
              >
                <ul onClick={handleLinkClick} className="py-2 mb-2">
                  <li className="hover:bg-slate-100 cursor-pointer p-2">
                    <Link href="/bookings">Bookings</Link>
                  </li>
                  <li className="hover:bg-slate-100 cursor-pointer p-2">
                    <Link href="/create">Host StayBnb</Link>
                  </li>
                  <li className="hover:bg-slate-100 cursor-pointer p-2">
                    <Link href="/favorits">Favorit Homes</Link>
                  </li>
                </ul>
              </div>
            </>
          )}
          <ModeToggle />
          <UserButton />
        </>
      ) : (
        <div className="flex gap-2">
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
