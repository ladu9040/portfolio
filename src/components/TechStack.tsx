// "use client";

// import gsap from "gsap";
// import Image from "next/image";
// import React, { useEffect, useRef } from "react";

// export default function TechStack() {
//   const panoramaRef = useRef(null);
//   const panoramaRef2 = useRef(null);

//   useEffect(() => {
//     if (!panoramaRef.current) return;

//     const panorama = panoramaRef.current;
//     const totalWidth = panorama.scrollWidth / 4;

//     gsap.to(panorama, {
//       x: -totalWidth,
//       duration: 25,
//       ease: "none",
//       repeat: -1,
//       modifiers: {
//         x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
//       },
//     });
//   }, []);
//   useEffect(() => {
//     if (!panoramaRef2.current) return;

//     const panorama2 = panoramaRef2.current;
//     const totalWidth2 = panorama2.scrollWidth / 4; // because we doubled the images

//     // Start from -half width to align properly
//     gsap.set(panorama2, { x: -totalWidth2 / 3 });

//     gsap.to(panorama2, {
//       x: totalWidth2,
//       duration: 25,
//       ease: "none",
//       repeat: -1,
//       modifiers: {
//         x: gsap.utils.unitize(
//           (x) => (parseFloat(x) % totalWidth2) - totalWidth2
//         ),
//       },
//     });
//   }, []);

//   const images = [
//     "/icons/gsap-removebg-preview.png",
//     "/icons/icons8-angularjs.svg",
//     "/icons/icons8-c-80.png",
//     "/icons/icons8-express-js.svg",
//     "/icons/icons8-github.svg",
//     "/icons/icons8-java.svg",
//     "/icons/icons8-javascript-logo.svg",
//     "/icons/icons8-matplotlib.svg",
//     "/icons/icons8-mongodb-96.png",
//     "/icons/icons8-node-js.svg",
//     "/icons/icons8-numpy.svg",
//     "/icons/icons8-pandas.svg",
//     "/icons/icons8-python.svg",
//     "/icons/icons8-react.svg",
//     "/icons/icons8-tailwind-css.svg",
//     "/icons/icons8-visual-studio.svg",
//     "/icons/Next.js.png",
//     "/icons/Three.js.png",
//   ];
//   const images2 = [
//     "/icons/Three.js.png",
//     "/icons/Next.js.png",
//     "/icons/icons8-visual-studio.svg",
//     "/icons/icons8-tailwind-css.svg",
//     "/icons/icons8-react.svg",
//     "/icons/icons8-python.svg",
//     "/icons/icons8-pandas.svg",
//     "/icons/icons8-numpy.svg",
//     "/icons/icons8-node-js.svg",
//     "/icons/icons8-mongodb-96.png",
//     "/icons/icons8-matplotlib.svg",
//     "/icons/icons8-javascript-logo.svg",
//     "/icons/icons8-java.svg",
//     "/icons/icons8-github.svg",
//     "/icons/icons8-express-js.svg",
//     "/icons/icons8-c-80.png",
//     "/icons/icons8-angularjs.svg",
//     "/icons/gsap-removebg-preview.png",
//   ];

//   return (
//     <>
//       <div className="h-[100vh] py-[8rem] w-full flex flex-col gap-64">
//         <div className="content h-[14rem]  w-full px-16 py-8 flex justify-between">
//           <div className="h-fit flex w-fit items-center">
//             <div className="rainbow-line h-[2px] w-[3.5rem] bg-[linear-gradient(90deg,#ff4d00,#e7eb4c_31%,#0b90cb_68%,#0c59c1)]"></div>
//             <span className="font-semibold">TECHSTACK</span>
//           </div>
//           <div className="text w-5xl">
//             <h1 className="text-6xl font-semibold">
//               Trusted by brands who value design, clarity, and results — from
//               emerging startups to industry-leading names.
//             </h1>
//           </div>
//         </div>
//         <div className="slider h-[12rem] w-full overflow-hidden flex flex-col justify-between opacity-35 relative">
//   {/* Left Gradient Overlay */}
//   <div className="absolute left-0 top-0 h-full w-36 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
  
//   {/* Right Gradient Overlay */}
//   <div className="absolute right-0 top-0 h-full w-36 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />      
//           <div ref={panoramaRef} className=" flex gap-6 whitespace-nowrap ">
//             {[...images, ...images].map((src, idx) => (
//               <Image
//                 key={`top-${idx}`}
//                 src={src}
//                 alt={`Panorama ${idx}`}
//                 width={80}
//                 height={80}
//                 className="w-[80px] h-[80px] object-contain opacity-50 hover:opacity-200 transition-opacity duration-300"
//               />
//             ))}
//           </div>

//           {/* Bottom row - scrolls right */}
//           <div ref={panoramaRef2} className="flex gap-6 whitespace-nowrap">
//             {[...images2, ...images2].map((src, idx) => (
//               <Image
//                 key={`bottom-${idx}`}
//                 src={src}
//                 alt={`Panorama2 ${idx}`}
//                 width={80}
//                 height={80}
//                 className="w-[80px] h-[80px] object-contain opacity-50 hover:opacity-200 transition-opacity duration-300"
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const panoramaRef = useRef(null);
  const panoramaRef2 = useRef(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // Top row scroll left
  useEffect(() => {
    if (!panoramaRef.current) return;

    const panorama = panoramaRef.current;
    const totalWidth = panorama.scrollWidth / 4;

    gsap.to(panorama, {
      x: -totalWidth,
      duration: 25,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });
  }, []);

  // Bottom row scroll right
  useEffect(() => {
    if (!panoramaRef2.current) return;

    const panorama2 = panoramaRef2.current;
    const totalWidth2 = panorama2.scrollWidth / 4;

    gsap.set(panorama2, { x: -totalWidth2 / 3 });

    gsap.to(panorama2, {
      x: totalWidth2,
      duration: 25,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(
          (x) => (parseFloat(x) % totalWidth2) - totalWidth2
        ),
      },
    });
  }, []);

  // Animate heading text word by word on scroll
  useEffect(() => {
    if (!textRef.current) return;

    const words = textRef.current.querySelectorAll("span");

    gsap.fromTo(
      words,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        ease: "power3.out",
        duration: 0.8,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const images = [
    "/icons/gsap-removebg-preview.png",
    "/icons/icons8-angularjs.svg",
    "/icons/icons8-c-80.png",
    "/icons/icons8-express-js.svg",
    "/icons/icons8-github.svg",
    "/icons/icons8-java.svg",
    "/icons/icons8-javascript-logo.svg",
    "/icons/icons8-matplotlib.svg",
    "/icons/icons8-mongodb-96.png",
    "/icons/icons8-node-js.svg",
    "/icons/icons8-numpy.svg",
    "/icons/icons8-pandas.svg",
    "/icons/icons8-python.svg",
    "/icons/icons8-react.svg",
    "/icons/icons8-tailwind-css.svg",
    "/icons/icons8-visual-studio.svg",
    "/icons/Next.js.png",
    "/icons/Three.js.png",
  ];
  const images2 = [...images].reverse();

  const headingText =
    "Trusted by brands who value design, clarity, and results — from emerging startups to industry-leading names.";

  return (
    <>
      <div className="h-[100vh] py-[8rem] w-full flex flex-col gap-64">
        <div className="content h-[14rem] w-full px-16 py-8 flex justify-between">
          <div className="h-fit flex w-fit items-center">
            <div className="rainbow-line h-[2px] w-[3.5rem] bg-[linear-gradient(90deg,#ff4d00,#e7eb4c_31%,#0b90cb_68%,#0c59c1)]"></div>
            <span className="font-semibold">TECHSTACK</span>
          </div>

          {/* Animated Heading */}
          <div className="text w-5xl">
            <h1
              ref={textRef}
              className="text-6xl font-semibold leading-snug flex flex-wrap gap-2"
            >
              {headingText.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="opacity-50 hover:opacity-100 transition-opacity duration-500 cursor-default"
                >
                  {word}
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Scrolling Slider */}
        <div className="slider h-[12rem] w-full overflow-hidden flex flex-col justify-between opacity-35 relative">
          {/* Left Gradient Overlay */}
          <div className="absolute left-0 top-0 h-full w-36 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

          {/* Right Gradient Overlay */}
          <div className="absolute right-0 top-0 h-full w-36 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Top row */}
          <div ref={panoramaRef} className="flex gap-6 whitespace-nowrap">
            {[...images, ...images].map((src, idx) => (
              <Image
                key={`top-${idx}`}
                src={src}
                alt={`Panorama ${idx}`}
                width={80}
                height={80}
                className="w-[80px] h-[80px] object-contain opacity-50 hover:opacity-200 transition-opacity duration-300"
              />
            ))}
          </div>

          {/* Bottom row */}
          <div ref={panoramaRef2} className="flex gap-6 whitespace-nowrap">
            {[...images2, ...images2].map((src, idx) => (
              <Image
                key={`bottom-${idx}`}
                src={src}
                alt={`Panorama2 ${idx}`}
                width={80}
                height={80}
                className="w-[80px] h-[80px] object-contain opacity-50 hover:opacity-200 transition-opacity duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
