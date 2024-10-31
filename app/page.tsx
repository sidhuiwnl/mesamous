"use client"

import { signIn } from "@/lib/auth-client";

export default function Home() {
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
