import HomeBar from "@/components/HomeBar";
import HomeSection from "@/components/HomeSection";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <HomeBar />
      <HomeSection />
    </div>
  );
}
