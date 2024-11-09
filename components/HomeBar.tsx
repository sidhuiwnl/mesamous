import Link from "next/link";

export default function HomeBar() {
  return (
    <div className="flex justify-around items-center mt-5">
      <p className="text-sm underline">mesamous</p>
      <div className="flex space-x-4">
        <Link
          href={"https://x.com/sidharth_b26649"}
          className=" px-4 py-2 border border-neutral-500 rounded-lg"
        >
          {" "}
          𝕏
        </Link>
        <Link
          href={"/send"}
          className="bg-white text-black px-8 rounded-lg font-medium flex  items-center"
        >
          <span>send the link</span>
        </Link>
      </div>
    </div>
  );
}
