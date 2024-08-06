import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";



export default function Home() {
  return (
    <div className="h-screen w-screen  bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
    <div className="max-w-5xl mx-auto p-4  flex flex-col items-center">
      <h1 className="relative z-10 text-lg md:text-7xl mb-5 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
      Anonymous Messenger
      </h1>
      
      <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
        A simple application to users can collect feedback around others
        anonymously and able to view all the messages and time period.
        Create a unique link to share among others.
      </p>
      <Link href={'/dashboard'} className="px-8 z-10 mt-5 py-2 border border-black bg-transparent text-black  dark:border-white relative group transition duration-200">
        <div className="absolute -bottom-2 -right-2 bg-yellow-300 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200" />
        <span className="relative font-bold">Messenger</span>
      </Link>
    </div>
    <BackgroundBeams />
  </div>
  );
}
