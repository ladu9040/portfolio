"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function DownloadResumeButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    const icon = iconRef.current;

    if (!button || !text || !icon) return;

    // Hover in
    const handleEnter = () => {
      gsap.to(text, { duration: 0.3, color: "transparent" });
      gsap.to(icon, { duration: 0.3, x: 0, width: "100%" });
    };

    // Hover out
    const handleLeave = () => {
      gsap.to(text, { duration: 0.3, color: "#323232" });
      gsap.to(icon, { duration: 0.3, x: 109, width: "39px" });
    };

    button.addEventListener("mouseenter", handleEnter);
    button.addEventListener("mouseleave", handleLeave);

    return () => {
      button.removeEventListener("mouseenter", handleEnter);
      button.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Handle download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume-ladu.pdf"; // ✅ place your resume file inside /public folder
    link.download = "My_Resume.pdf"; // name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleDownload}
      className="relative flex h-10 cursor-pointer w-40 items-center overflow-hidden rounded-lg border-2 border-gray-800 bg-gray-200 shadow-[4px_4px_0px_#323232] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
    >
      <span
        ref={textRef}
        className="relative left-6 font-semibold text-gray-800 transition-colors"
      >
        Download CV
      </span>
      <span
        ref={iconRef}
        className="absolute right-0 flex h-full w-[39px] translate-x-[109px] items-center justify-center bg-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 35 35"
          className="w-5 fill-gray-800"
        >
          <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z" />
          <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z" />
          <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z" />
        </svg>
      </span>
    </button>
  );
}
