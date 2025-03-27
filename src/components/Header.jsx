import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Header = () => {
  return (
    <>
      <nav className="flex justify-between items-center py-4">
        <Link>
          <img src="/logo.png" alt="Logo" className="h-20" />
        </Link>
        <Button
          className="cursor-pointer border-none bg-purple-950"
          variant="link"
        >
          Login
        </Button>
        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
      </nav>
    </>
  );
};

export default Header;
