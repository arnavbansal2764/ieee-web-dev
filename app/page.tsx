import Encryption from "@/components/main/encryption";
import Footer from "@/components/main/footer";
import Hero from "@/components/main/hero";
import Navbar from "@/components/main/navbar";
import StarsCanvas from "@/components/main/starBackground";
import Skills from "@/components/main/tech_stack";


export default function Home() {
  return (
    <main className="h-full w-full">
      <StarsCanvas />
      <Navbar />
      <div className="flex flex-col h-[850px] gap-20">
        <Hero />
      </div>
      {/* <Skills /> */}
      <Encryption />
      <Footer />
    </main>
  );
}
