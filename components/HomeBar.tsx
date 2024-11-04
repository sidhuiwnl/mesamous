import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HomeBar(){
    return(
        <div className="flex justify-around items-center mt-5">
            <p className="text-sm underline">mesamous</p>
            <div className="flex space-x-4">
                <Link href={"https://x.com/sidharth_b26649"} className=" px-4 py-2 border border-neutral-500 rounded-lg"> 𝕏</Link>
                <button className="bg-white text-black px-8 rounded-lg font-medium">send the link </button>
            </div>
        </div>
    )
}