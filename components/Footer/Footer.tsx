import React from "react";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="border-t mt-10 py-4 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row gap-3 text-center md:text-left">
          <p className="cursor-pointer">
            &copy; 2024 StayBnb. All rights reserved
          </p>
          <span className="hidden md:inline">•</span>
          <p className="cursor-pointer">Terms</p>
          <span className="hidden md:inline">•</span>
          <p className="cursor-pointer">Privacy</p>
          <span className="hidden md:inline">•</span>
          <p className="cursor-pointer">Your Privacy Choices</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://www.facebook.com" aria-label="Facebook">
            <FaFacebookSquare size={24} />
          </a>
          <a href="https://www.twitter.com" aria-label="Twitter">
            <FaTwitterSquare size={24} />
          </a>
          <a href="https://www.instagram.com" aria-label="Instagram">
            <FaInstagramSquare size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
