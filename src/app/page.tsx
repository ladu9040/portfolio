'use client';

import { useEffect, useState } from "react";
import ParticleCanvas from "@/components/ParticleCanvas";
import FloatingImages from "@/components/FloatingImages";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Scrolling from "@/components/Scrolling";
import TechStack from "@/components/TechStack";
import Whatido from "@/components/Whatido";
import Works from "@/components/Works";
import Loader from "@/components/Loader";
import DownloadResumeButton from "@/components/DownloadButton"; 

export default function Home() {
  return (
    <div className="relative bg-[#F8F7F3] min-h-screen w-screen overflow-x-hidden">
      <div className="relative z-10">
        {/* Background */}
        <div className="fixed top-0 left-0 w-full h-full z-0 ">
          <ParticleCanvas />
        </div>

        {/* Header */}
        <div className="fixed h-full w-full z-[999999]">
          <Header />
        </div>

        {/* Floating Images */}
        <FloatingImages startAnimation={true} />  {/* always true now */}

        <section id="techstack">
          <TechStack />
        </section>
        <section id="scrolling">
          <Scrolling />
        </section>
        <section id="works" className="relative z-100">
          <Works />
        </section>
        <section id="whatido">
          <Whatido />
        </section>
        <div className="z-[9999999] relative">
          <Footer />
        </div>

        {/* ✅ Download Resume Button fixed at bottom-right */}
        <div className="fixed bottom-6 right-6 z-[99999999]">
          <DownloadResumeButton />
        </div>
      </div>
    </div>
  );
}
