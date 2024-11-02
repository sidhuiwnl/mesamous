"use client";

import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { useRef } from "react";
import { useState, useEffect } from "react";

export default function Send() {
  const inputRef = useRef<HTMLInputElement>(null);
  const session = useSession();
  const name = session.data?.user.name;
  const [anonUrl, setAnonUrl] = useState("");

  useEffect(() => {
    if (session.data?.user.name) {
      const currentUrl = window.location.origin;
      const username = session.data.user.name.replace(/\s+/g, "");
      setAnonUrl(`${currentUrl}/${username}`);
    }
  }, [session.data]);

  const copyUrl = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      toast("Copied to clipboard");
    }
  };

  if (!session.data) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" w-screen h-screen overflow-hidden">
      <div className="relative mt-10 ml-10 ">
        <h1 className="text-6xl font-bold antialiased tracking-tighter">
          Copy Your Unique URL {name && `(${name})`}.
        </h1>
        <div className="relative mt-7 w-[900px]">
          <input
            ref={inputRef}
            value={anonUrl}
            type="text"
            readOnly
            className="rounded-lg w-full h-12 bg-neutral-900 text-white p-2 pr-24 border-2 border-neutral-700"
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-[100px] h-8 rounded-md font-medium shadow-md p-1 bg-white text-black"
            onClick={copyUrl}
          >
            Copy
          </button>
        </div>
      </div>
      <div className="flex flex-col ml-10 mt-10">
        <h1 className="text-6xl font-bold antialiased tracking-tighter">Anonymous Messages</h1>
      </div>
    </div>
  );
}
