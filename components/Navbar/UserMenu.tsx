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
          <button type="button" name="menu-button" onClick={toggleMenu}>
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
              <div className=" inset-0 absolute bg-black opacity-60 sm:hidden z-50"></div>
              <div
                ref={menuRef}
                className="absolute top-0 sm:top-16 right-0 sm:right-40 bg-white text-black p-2 rounded-xl border shadow-md z-50 w-[70%] h-full sm:w-auto sm:h-auto"
              >
                <div>
                  <button className="sm:hidden" onClick={toggleMenu}>
                    <RxCross2 size={30} />
                  </button>
                  <ul>
                    <li className="hover:bg-slate-100 cursor-pointer p-2 ">
                      <Link href="/bookings" onClick={() => setIsOpen(false)}>
                        Bookings
                      </Link>
                    </li>
                    <li className="hover:bg-slate-100 cursor-pointer p-2">
                      <Link href="/create" onClick={() => setIsOpen(false)}>
                        Host StayBnb
                      </Link>
                    </li>
                    <li className="hover:bg-slate-100 cursor-pointer p-2">
                      <Link href="/favorits" onClick={() => setIsOpen(false)}>
                        Favorit Homes
                      </Link>
                    </li>
                    <li className="hover:bg-slate-100 cursor-pointer p-2">
                      <Link href="/about" onClick={() => setIsOpen(false)}>
                        About us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
          <ModeToggle />
          <UserButton />
        </>
      ) : (
        <Link href="/sign-in">
          <Button type="button">Sign in</Button>
        </Link>
      )}
    </div>
  );
};

export default UserMenu;
