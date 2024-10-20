"use client";
import { IoMenu } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { ModeToggle } from "../toggle-theme";

interface UserMenuProps {
  onClick: () => void;
  isOpen: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({ onClick, isOpen }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-2 bg-">
      <button onClick={onClick}>
        {isOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
      </button>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href="/sign-in">
          <FaRegCircleUser size={30} />
        </Link>
      )}

      <ModeToggle />
    </div>
  );
};

export default UserMenu;
