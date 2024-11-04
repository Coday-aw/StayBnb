"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMenu } from "react-icons/io5";
import { SignIn, UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "../toggle-theme";
import { FaSignInAlt } from "react-icons/fa";
import Link from "next/link";
import Button from "../Button";

const UserMenu = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }
  return (
    <div className="flex justify-center items-center gap-2">
      {isSignedIn ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IoMenu size={30} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/bookings">Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/create">Host StayBnb</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/favorits">Saved Homes</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
