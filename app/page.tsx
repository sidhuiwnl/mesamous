"use client"

import { signIn,useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Home() {
  const session = useSession();
  if(session.data?.user){
    redirect("/send")
  }
  return (
    <div>
      <button
        onClick={async () => {
          await signIn.social({
            provider: "github",
          });
        }}
      >Sign in</button>
    </div>
  );
}
