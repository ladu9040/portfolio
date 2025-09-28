"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Whatido() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const services = [
    {
      img: "/branding.jpeg",
      title: "Branding",
      description: "Brands that resonate",
    },
    {
      img: "/websites.png",
      title: "Websites",
      description: "Designed to convert",
    },
    {
      img: "/apps.jpg",
      title: "Apps",
      description: "User-focused experiences",
    },
  ];

  useEffect(() => {
    // Check screen size on mount
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    if (!sectionRef.current || !textRef.current) return;

    if (window.innerWidth >= 1024) {
      const words = textRef.current.querySelectorAll("span.word");

      // Word animation
      gsap.fromTo(
        words,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          stagger: { each: 0.15 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      // Sticky effect
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: textRef.current,
        pinSpacing: false,
      });
    }

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  const headingText =
    "I design brands, websites, and apps with clarity and purpose — clean visuals, smart strategy, and thoughtful detail that move people and ideas forward.";

  return (
    <div
      ref={sectionRef}
      className="w-full flex flex-col lg:flex-row px-6 sm:px-10 md:px-16 py-16 md:py-24 lg:py-32 gap-12 lg:gap-24 items-start"
    >
      {/* Left: Text */}
      <div ref={textRef} className="w-full lg:w-1/2">
        <div className="h-fit flex w-fit items-center mb-4 sm:mb-6">
          <div className="rainbow-line h-[2px] w-[3.5rem] bg-[linear-gradient(90deg,#ff4d00,#e7eb4c_31%,#0b90cb_68%,#0c59c1)]"></div>
          <span className="ml-2 font-semibold text-sm sm:text-base">
            SERVICES
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold leading-snug lg:leading-tight text-black flex flex-wrap gap-2">
          {headingText.split(" ").map((word, i) => (
            <span
              key={i}
              className={`word ${isDesktop ? "opacity-20" : "opacity-100"}`}
            >
              {word}
            </span>
          ))}
        </h1>
      </div>

      {/* Right: Cards */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8 sm:gap-12 mt-8 lg:mt-0">
        {services.map((service, index) => (
          <div key={index}>
            <img
              src={service.img}
              alt={service.title}
              className="rounded-xl w-full h-56 sm:h-64 md:h-72 object-cover"
            />
            <h3 className="mt-3 sm:mt-4 font-semibold text-base sm:text-lg md:text-xl">
              {service.title}
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
