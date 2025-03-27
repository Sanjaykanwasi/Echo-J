import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  return (
    <>
      <nav className="flex justify-between items-center py-4">
        <Link>
          <img src="/logo.png" alt="Logo" className="h-20" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button
              onClick={() => {
                setShowSignIn(true);
              }}
              className="cursor-pointer"
              variant="purple"
              size={"xl"}
            >
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            <Link to={"/post-job"}>
              <Button variant={"green"} size={"xl"} className={"rounded-full"}>
                Search Talent
                <PenBox size={20} className="mr-2" />
              </Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
