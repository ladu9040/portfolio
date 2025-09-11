// "use client";

// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function Whatido() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const textRef = useRef<HTMLDivElement>(null);

//   const services = [
//     {
//       img: "https://images.unsplash.com/photo-1505685296765-3a2736de412f",
//       title: "Branding",
//       description: "Brands that resonate",
//     },
//     {
//       img: "https://images.unsplash.com/photo-1750630098132-b7567d2128b4?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       title: "Websites",
//       description: "Designed to convert",
//     },
//     {
//       img: "https://images.unsplash.com/photo-1754494837351-cd16d44683bb?q=80&w=1156&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       title: "Apps",
//       description: "User-focused experiences",
//     },
//   ];

//   useEffect(() => {
//     if (!sectionRef.current || !textRef.current) return;

//     ScrollTrigger.create({
//       trigger: sectionRef.current,
//       start: "top top",
//       end: "bottom bottom",
//       pin: textRef.current,
//       pinSpacing: false,
//     });
//   }, []);

//   return (
//     <div
//       ref={sectionRef}
//       className="w-full flex px-16 py-[8rem] gap-64 items-start "
//     >
//       {/* Left: Sticky Text */}
//       <div ref={textRef} className="w-1/2">
//         <div className="h-fit flex w-fit items-center mb-5">
//           <div className="rainbow-line h-[2px] w-[3.5rem] bg-[linear-gradient(90deg,#ff4d00,#e7eb4c_31%,#0b90cb_68%,#0c59c1)]"></div>
//           <span className="ml-2 font-semibold">SERVICES</span>
//         </div>
//         <h1 className="text-6xl font-semibold leading-tight text-black">
//           At Noura, we design brands, websites, and apps with clarity and
//           purpose — clean visuals, smart strategy, and thoughtful detail that
//           move people and ideas forward.
//         </h1>
//       </div>

//       {/* Right: Scrolling Images */}
//       <div className="w-1/3 flex flex-col gap-16">
//         {services.map((service, index) => (
//           <div key={index}>
//             <img
//               src={service.img}
//               alt={service.title}
//               className="rounded-xl w-full h-auto object-cover"
//             />
//             <h3 className="mt-4 font-semibold text-lg">{service.title}</h3>
//             <p className="text-gray-500 text-sm">{service.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Whatido() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
    if (!sectionRef.current || !textRef.current) return;

    // Sticky effect
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: textRef.current,
      pinSpacing: false,
    });

    // Scroll-scrubbed word animation
    const words = textRef.current.querySelectorAll("span.word");

    gsap.fromTo(
      words,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        stagger: {
          each: 0.2,
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true, // 👈 tie animation to scroll
        },
      }
    );
  }, []);

  const headingText =
    "I design brands, websites, and apps with clarity and purpose — clean visuals, smart strategy, and thoughtful detail that move people and ideas forward.";

  return (
    <div
      ref={sectionRef}
      className="w-full flex px-16 py-[8rem] gap-64 items-start "
    >
      {/* Left: Sticky Text */}
      <div ref={textRef} className="w-1/2">
        <div className="h-fit flex w-fit items-center mb-5">
          <div className="rainbow-line h-[2px] w-[3.5rem] bg-[linear-gradient(90deg,#ff4d00,#e7eb4c_31%,#0b90cb_68%,#0c59c1)]"></div>
          <span className="ml-2 font-semibold">SERVICES</span>
        </div>

        <h1 className="text-6xl font-semibold leading-tight text-black flex flex-wrap gap-2">
          {headingText.split(" ").map((word, i) => (
            <span key={i} className="word opacity-20">
              {word}
            </span>
          ))}
        </h1>
      </div>

      {/* Right: Scrolling Images */}
      <div className="w-1/3 flex flex-col gap-16">
        {services.map((service, index) => (
          <div key={index}>
            <img
              src={service.img}
              alt={service.title}
              className="rounded-xl w-full h-auto object-cover"
            />
            <h3 className="mt-4 font-semibold text-lg">{service.title}</h3>
            <p className="text-gray-500 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
