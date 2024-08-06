'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { ToastAction } from "@/components/ui/toast";
import { useEffect, useCallback } from "react";
import axios from "axios"



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
    <div className="w-full flex justify-between items-center p-7 bg-slate-900">
      <div>
        <h1 className="text-white text-xl">Anonymous MSG</h1>
      </div>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="text-slate-900 bg-white px-2 py-1 font-semibold border rounded">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
}