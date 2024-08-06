'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { ToastAction } from "@/components/ui/toast";
import { useEffect, useCallback } from "react";
import axios from "axios"
import { Button } from "./ui/button";


export default function Navbar() {
  const { toast } = useToast();
  const { isLoaded, isSignedIn,user } = useUser();

  const showToast = useCallback(() => {
    if (isLoaded && !isSignedIn) {
      toast({
        variant: "destructive",
        title: "User not found",
        description: "Please sign in or sign up",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, [isLoaded, isSignedIn, toast]);


  

  useEffect(() => {
    showToast();

    if(isLoaded && isSignedIn && user){
      const userData = {
        name : user.firstName,
        email : user.emailAddresses[0].emailAddress,
        isAcceptingMessage : true
      }

      axios
      .post("/api/users", userData)
      .then((response) => {
        console.log("User created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
    }

  }, [isLoaded,isSignedIn,user,showToast]);

  return (
    <div className="w-full flex justify-between items-center p-7 border-b bg-black">
      <div>
        <h1 className=" text-white text-lg hover:underline">Mesamous</h1>
      </div>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button>
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
}