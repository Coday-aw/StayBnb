"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { RxCross2 } from "react-icons/rx";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
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

  return (
    <div className="border-b border-gray-300 m-4 p-2">
      <Container>
        <div className="flex justify-between">
          <Logo />
          <Search />
          <UserMenu onClick={toggleMenu} isOpen={isOpen} />
          {isOpen && (
            <>
              <div className="absolute inset-0 bg-black opacity-60 sm:hidden"></div>
              <div
                ref={menuRef}
                className="absolute top-0 right-0 bottom-0  rounded-l-lg sm:border max-h-screen w-[50%] sm:absolute sm:top-20 sm:right-32 sm:h-auto sm:w-[200px] sm:bottom-auto"
              >
                <button className="sm:hidden p-2" onClick={toggleMenu}>
                  <RxCross2 size={30} />
                </button>
                <ul className=" py-4 mb-2">
                  <li className="hover:bg-slate-100 font-bold cursor-pointer p-2 ">
                    Host StayBnb
                  </li>
                  <li className="hover:bg-slate-100 cursor-pointer p-2">
                    Saved homes
                  </li>
                  <li className="hover:bg-slate-100 cursor-pointer p-2">
                    Reservation
                  </li>
                  <li className="hover:bg-slate-100 cursor-pointer p-2">
                    Bookings
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
