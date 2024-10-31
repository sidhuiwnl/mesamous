"use client";

import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { useRef } from "react";

export default function Send() {
  const inputRef = useRef<HTMLInputElement>(null);

  const session = useSession();
  const username = session.data?.user.name;

  const anonUrl = `http://localhost:3000/${username?.replace(/\s+/g, "")}`;

  const copyUrl = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      toast("Copied to clipboard");
    }
  };

  return (
    <div className="w-screen h-screen p-4">
      <div>
        <h1 className="text-6xl font-bold antialiased tracking-tighter">
          Copy Your Anonymous URL {username && `(${username})`}.
        </h1>
        <input
          ref={inputRef}
          value={anonUrl}
          type="text"
          readOnly
          className="rounded-lg mt-7 w-[900px] h-10 mr-2 bg-neutral-900 text-white p-2  border-2 border-neutral-700"
        />
        <button
          className="w-[120px] rounded-lg bg-black/50 font-extrabold shadow-md p-2 bg-gradient-to-b from-neutral-600 to to-neutral-900"
          onClick={copyUrl}
        >
          Copy
        </button>
      </div>
    </div>
  );
}
