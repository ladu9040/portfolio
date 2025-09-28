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
<a
  href={project.url}
  target="_blank"
  rel="noopener noreferrer"
  className="relative top-20 main-image cursor-pointer group 
             w-[90vw] sm:w-[85vw] md:w-[75vw] lg:w-[70vw] xl:w-[65vw] 
             max-w-[900px] 
             aspect-[16/9]"  
>
  <img
    src={project.bigImage}
    alt={project.title}
    className="w-full h-full object-cover rounded-2xl shadow-lg 
               transition-transform duration-300 group-hover:scale-[1.02]"
  />

  {/* Small video overlay */}
  <div
    className="absolute 
      -right-14 top-14 
      w-[25vw] sm:w-[22vw] md:w-[20vw] lg:w-[18vw] xl:w-[15vw] 
      aspect-[16/9]   // also rectangular
      rounded-xl overflow-hidden shadow-lg small-image
      transform transition-all duration-300 group-hover:scale-110"
  >
    <video
      src={project.video}
      autoPlay
      muted
      loop
      playsInline
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
