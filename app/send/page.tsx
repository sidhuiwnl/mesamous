"use client";

import { toast } from "sonner";
import { useSession } from "@/app/lib/auth-client";
import { useRef } from "react";
import { useState, useEffect } from "react";
import MessageCard from "@/components/MessageCard";

import { RefreshCcw } from "lucide-react";

export default function Send() {
  const inputRef = useRef<HTMLInputElement>(null);
  const session = useSession();
  const name = session.data?.user.name;
  const [anonUrl, setAnonUrl] = useState("");
  const [spin, setSpin] = useState(true);

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

  const messageCardRef = useRef<{ fetchMessages: () => Promise<void> } | null>(
    null
  );

  function handleRefresh() {
    setSpin(true);
    messageCardRef.current?.fetchMessages();
  }

  if (!session.data) {
    return (
      <div className="h-screen w-screen bg-neutral-900 text-white flex justify-center items-center">
        <span className="loading loading-infinity loading-lg "></span>
      </div>
    );
  }

  return (
    <div className=" w-screen h-screen overflow-auto">
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
        <div className="flex space-x-6 items-center">
          <h1 className="text-6xl font-bold antialiased tracking-tighter">
            Anonymous Messages
          </h1>
          <button
            className="bg-white text-black p-2 mt-3 rounded-lg"
            onClick={handleRefresh}
          >
            <RefreshCcw className={`${spin ? "animate-spin" : ""}`} />
          </button>
        </div>

        <MessageCard
          userId={session.data.user.id}
          setSpin={setSpin}
          ref={messageCardRef}
        />
      </div>
    </div>
  );
}
