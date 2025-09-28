"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];

    gsap.fromTo(
      letters,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse", // will animate each time you enter
        },
      }
    );
  }, []);

  const text = "Ladu";

  return (
    <footer
      ref={footerRef}
      className=" px-6  "
      style={{ height: "80vh" }}
    >
      <div className="relative flex flex-col justify-between h-[98%] bg-white text-black px-12 rounded-2xl py-8">
        {/* Top Row */}
        <div className="flex justify-between items-start">
          {/* Pages List */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-2">
              <p className="font-medium">Pages</p>
              <a href="#">Home</a>
              <a href="#techstack">About</a>
              <a href="#works">Works</a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="opacity-0">_</p>
              <a href="#">Work page</a>
              <a href="/contact">Contact</a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-black">
            <a
              href="https://www.linkedin.com/in/ladukishor-subudhi-8809032a1/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
            </a>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex justify-between items-center text-sm text-gray-600 left-0 absolute top-[30%] gap-4 flex-wrap px-2">
          {/* Left Bottom */}
          <div className="flex items-center gap-4">
            <span>© 2025 Ladu</span>
            <span>|</span>
            <span>Powered by LaxmanCreation</span>
            <span>|</span>
            <span>Created by me </span>
          </div>

          {/* Right Bottom */}
          <div className="flex items-center gap-4">
            <a href="#">Instructions</a>
            <a href="#">Style guide</a>
            <a href="#">Licenses</a>
            <a href="#">Changelog</a>
          </div>
        </div>

        {/* Big Animated Text */}
        <div className="flex  items-center flex-grow absolute bottom-0">
          <div className="flex gap-4 text-[30vw] lg:text-[20vw] font-thin leading-none">
            {text.split("").map((char, index) => (
              <span
                key={index}
                ref={(el) => {
                  lettersRef.current[index] = el;
                }}
                style={{ display: "inline-block" }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
