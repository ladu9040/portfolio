"use client";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Scrolling() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial text animation
    if (!textRef.current) return;
    const letters = textRef.current.querySelectorAll(".letter");
    gsap.from(letters, {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.3,
      ease: "ease",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    if (
      !containerRef.current ||
      !maskRef.current ||
      !leftTextRef.current ||
      !rightTextRef.current
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom center",
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    // Animate mask reveal instead of scaling an image
    tl.to(maskRef.current, {
      clipPath: "inset(0% round 16px)", // reveal full section
      WebkitClipPath: "inset(0% round 16px)",
      duration: 2,
      ease: "power2.inOut",
    })
      .to(
        leftTextRef.current,
        {
          x: -1000,
          duration: 2,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        rightTextRef.current,
        {
          x: 1000,
          duration: 2,
          ease: "power2.inOut",
        },
        0
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const text = "KEEP SCROLLING";

  return (
    <>
      <div className="min-h-[100vh] w-screen p-7 ">
        {/* Heading */}
        <div className="heading h-fit w-full flex items-center justify-center p-7">
          <p
            ref={textRef}
            className="flex font-semibold tracking-wide text-gray-600"
          >
            {text.split("").map((char, index) => (
              <span key={index} className="letter inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>

        {/* Zoom Animation Section */}
        <div
          ref={containerRef}
          className="min-h-screen w-full flex items-center justify-center overflow-hidden relative"
        >
          {/* Transparent Rectangle Mask */}
          <div
            ref={maskRef}
            className="absolute inset-0 z-0 overflow-hidden"
            style={{
              WebkitClipPath: "inset(45% round 16px)", // start small rectangle
              clipPath: "inset(45% round 16px)",
            }}
          >
            {/* Zooming Background */}
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('/my-photo.png')`,
              }}
              id="bgZoom" 
            ></div>
          </div>

          {/* Foreground Texts */}
          <div className="relative flex items-center justify-center w-full left-10 z-10">
            {/* Left Text */}
            <span
              ref={leftTextRef}
              className="text-6xl md:text-8xl font-bold z-10 relative left-16"
            >
              I'm
            </span>

            {/* Spacer div to match original layout */}
            <div className="w-72 h-32"></div>

            {/* Right Text */}
            <span
              ref={rightTextRef}
              className="text-6xl md:text-8xl font-bold z-10 relative"
            >
              Coder
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
