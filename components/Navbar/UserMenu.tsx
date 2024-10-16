"use client";
import { IoMenu } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const UserMenu = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-2 bg-">
      <div>
        <IoMenu size={30} />
      </div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href="/sign-in">
          <FaRegCircleUser size={30} />
        </Link>
      )}
    </div>
  );
};

export default UserMenu;
