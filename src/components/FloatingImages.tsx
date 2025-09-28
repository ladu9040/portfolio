'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FloatingImagesProps {
  startAnimation?: boolean;
}

export default function FloatingImages({ startAnimation = false }: FloatingImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  const images = [
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1627199219038-e8263f729e3d?q=80&w=1631&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
  ];

  const animText = [
    "Websites that perform",
    "Apps that deliver",
    "Designs that resonate"
  ];

  useEffect(() => {
    if (!startAnimation) return;

    const container = containerRef.current;
    const imageElements = imagesRef.current;
    const textContainer = textContainerRef.current;
    const subtitle = subtitleRef.current;

    if (!container || imageElements.length === 0) return;

   const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const base = Math.min(screenWidth, screenHeight);
const radius = Math.min(base * 0.37, 380);


    const masterTL = gsap.timeline();

    // Init images
    imageElements.forEach((img, index) => {
      gsap.set(img, {
        x: 0,
        y: 0,
        opacity: 0.8,
        zIndex: images.length - index,
      });
    });

    gsap.set([textContainer, subtitle], { opacity: 0, y: 20 });

    // Images to circle
    masterTL.to(imageElements, {
      duration: 2,
      ease: "power2.out",
      x: (index) => {
        const angle = (index * 360) / images.length;
        const radian = (angle * Math.PI) / 180;
        return radius * Math.cos(radian);
      },
      y: (index) => {
        const angle = (index * 360) / images.length;
        const radian = (angle * Math.PI) / 180;
        return radius * Math.sin(radian);
      },
      stagger: 0.1,
    });

    // 🔥 Trigger text animation
    masterTL.call(() => startTextAnimation(), [], 1);

    // Subtitle fade in
    masterTL.to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    }, 2.5);

    // Rotation loop
    masterTL.call(() => {
      gsap.to(container, { rotation: 360, duration: 160, ease: "none", repeat: -1 });
      gsap.to(imageElements, { rotation: -360, duration: 160, ease: "none", repeat: -1 });
    }, [], 3);

    // Text animation logic
    function startTextAnimation() {
      let currentTextIndex = 0;

      const showNextText = () => {
        if (!textContainer) return;
        textContainer.innerHTML = "";

        const currentText = animText[currentTextIndex];
        const words = currentText.split(" ");

        words.forEach((word) => {
          const span = document.createElement("div");
          span.textContent = word;
          span.className = "inline-block opacity-0";
          span.style.marginRight = "0.5rem";
          textContainer.appendChild(span);
        });

        const wordElements = textContainer.querySelectorAll("div");
        const textTL = gsap.timeline();

        wordElements.forEach((word, index) => {
          textTL.to(word, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          }, index * 0.3);
        });

        textTL.to({}, { duration: 2 }); // pause

        wordElements.forEach((word, index) => {
          textTL.to(word, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.in",
          }, `disappear+=${index * 0.2}`);
        });

        textTL.call(() => {
          currentTextIndex = (currentTextIndex + 1) % animText.length;
          setTimeout(showNextText, 500);
        });
      };

      gsap.to(textContainer, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        onComplete: showNextText,
      });
    }
  }, [startAnimation, images.length]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-transparent p-4">
      <div className="relative w-full max-w-[900px] aspect-square">
        {/* Rotating images */}
        <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
          {images.map((src, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="absolute w-16 h-20 sm:w-24 sm:h-28 md:w-28 md:h-36 lg:w-32 lg:h-40 overflow-hidden shadow-xl rounded-2xl"
            >
              <img src={src} alt={`Floating image ${index + 1}`} className="w-full h-full object-cover rounded-xl" />
            </div>
          ))}
        </div>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 gap-2">
          <div className="relative h-fit w-[60%] max-w-[90%] p-4 md:p-7 flex justify-center items-center">
            <div
              ref={textContainerRef}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
                         font-semibold text-gray-900 text-center flex flex-wrap justify-center gap-2"
            ></div>
          </div>
          <h2 ref={subtitleRef} className="text-[12px] sm:text-base md:text-lg lg:text-xl font-normal text-gray-600 mb-2 opacity-0 ">
            A designer, ready to serve — always.
          </h2>
        </div>
      </div>
    </div>
  );
}
