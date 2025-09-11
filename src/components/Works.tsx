"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  bigImage: string;
  video: string;
  title: string;
  description: string;
    url: string;
}

export default function Works() {
  const projects: Project[] = [
    {
      bigImage:
        "/project1.png",
      video:
        "/mustang.mp4",
      title: "Mustang",
      description: "A 3D car website for best user experience",
      url: "https://frontend-basher-reimagine-round2-beryl.vercel.app/"
    },
    {
      bigImage:
        "/project2.png",
      video:
        "/mustang.mp4",
      title: "Cocacola",
      description: "A 3D breverages website for cocacola ",
      url:"https://frontend-basher-reimagine-round1-main.vercel.app/"
    },
    {
      bigImage:
        "/project3.png",
      video:
        "/project3-video.mp4",
      title: "Projex",
      description: "A modern project management system",
      url:""
    },
  ];

  const sectionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      if (!section) return;
      const mainImage = section.querySelector(".main-image");
      const smallImage = section.querySelector(".small-image");
      const textBlock = section.querySelector(".text-block");

      gsap.from(mainImage, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mainImage,
          start: "top 80%",
        },
      });

      gsap.from(smallImage, {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.3,
        scrollTrigger: {
          trigger: mainImage,
          start: "top 80%",
        },
      });

      gsap.from(textBlock, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textBlock,
          start: "top 85%",
        },
      });
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-transparent flex flex-col items-center py-28 z-50">
      {/* Heading */}
      <div className="mb-20">
        <h1 className="text-7xl font-semibold text-black">Work</h1>
      </div>

      {/* Project Sections */}
      <div className="flex flex-col gap-14 ">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) sectionRefs.current[index] = el;
            }}
            className="flex flex-col items-center pb-36"
          >
         
           {/* Big image container */}
<a href={project.url} target="_blank" rel="noopener noreferrer" className="relative w-[85%] max-w-5xl main-image top-28 cursor-pointer">
  <img
    src={project.bigImage}
    alt={project.title}
    className="w-full rounded-[30px] shadow-lg cursor-pointer"
  />

  {/* Small image overlay */}
  <div className="absolute -right-24 top-24 w-[18rem] rounded-[30px] overflow-hidden shadow-lg small-image">
    <video
      src={project.video}
      autoPlay
      muted
      className="w-full h-full object-cover"
    />
  </div>
</a>


            {/* Text */}
            <div className="text-center relative top-32 text-block">
              <h2 className="text-xl font-semibold text-black">{project.title}</h2>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
