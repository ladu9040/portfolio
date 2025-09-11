// 'use client';

// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';

// export default function FloatingImages() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const imagesRef = useRef<HTMLDivElement[]>([]);
//   const textContainerRef = useRef<HTMLDivElement>(null);
//   const subtitleRef = useRef<HTMLHeadingElement>(null);
//   const buttonRef = useRef<HTMLButtonElement>(null);

//   const images = [
//     'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=150&fit=crop&crop=face',
//     'https://images.unsplash.com/photo-1494790108755-2616c78746d4?w=150&h=150&fit=crop&crop=face',
//     'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
//     'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
//     'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
//     'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
//     'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
//     'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
//     'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
//   ];

//   const animText = [
//     "Websites that perform",
//     "Apps that deliver",
//     "Designs that resonate"
//   ];

//   useEffect(() => {
//     const container = containerRef.current;
//     const imageElements = imagesRef.current;
//     const textContainer = textContainerRef.current;
//     const subtitle = subtitleRef.current;
//     const button = buttonRef.current;

//     if (!container || imageElements.length === 0) return;

//     const radius = 380;
//     const centerX = 0;
//     const centerY = 0;

//     // Master timeline for the entire sequence
//     const masterTL = gsap.timeline();

//     // Step 1: Initialize all images at center, stacked
//     imageElements.forEach((img, index) => {
//       gsap.set(img, {
//         x: 0,
//         y: 0,
//         rotation: 0,
//         rotationY: 0,
//         opacity: 0.8,
//         zIndex: images.length - index // Stack them with different z-indexes
//       });
//     });

//     // Hide text elements initially
//     gsap.set([textContainer, subtitle, button], {
//       opacity: 0,
//       y: 20
//     });

//     // Step 2: Move images to their circular positions (2 seconds)
//     masterTL.to(imageElements, {
//       duration: 2,
//       ease: "power2.out",
//       x: (index) => {
//         const angle = (index * 360) / images.length;
//         const radian = (angle * Math.PI) / 180;
//         return centerX + radius * Math.cos(radian);
//       },
//       y: (index) => {
//         const angle = (index * 360) / images.length;
//         const radian = (angle * Math.PI) / 180;
//         return centerY + radius * Math.sin(radian);
//       },
//       stagger: 0.1 // Slight stagger for visual appeal
//     });

//     // Step 3: Start text animation during positioning (starts at 1 second)
//     masterTL.call(() => {
//       startTextAnimation();
//     }, [], 1);

//     // Step 4: Fade in subtitle and button after text starts
//     masterTL.to([subtitle, button], {
//       opacity: 1,
//       y: 0,
//       duration: 1,
//       stagger: 0.2,
//       ease: "power2.out"
//     }, 2.5);

//     // Step 5: Start continuous rotations and flips after positioning is complete
//     masterTL.call(() => {
//       // Container rotation
//       gsap.to(container, {
//         rotation: 360,
//         duration: 160,
//         ease: "none",
//         repeat: -1
//       });

//       // // Individual image flip animations
//       // imageElements.forEach((img, index) => {
//       //   gsap.to(img, {
//       //     rotationY: 360,
//       //     duration: 5 + (index * 0.9),
//       //     ease: "linear",
//       //     repeat: -1,
//       //     yoyo: false,
//       //     delay: index * 0.1
//       //   });
//       // });
//       gsap.to(imageElements, {
//   rotation: (i, target) => -360, // counter rotation
//   duration: 160,
//   ease: "none",
//   repeat: -1,
//   transformOrigin: "center center"
// });
//     }, null, 3);

//     // Text Animation Function
//     function startTextAnimation() {
//       let currentTextIndex = 0;

//       const showNextText = () => {
//         // Clear previous content
//         if (textContainer) {
//           textContainer.innerHTML = '';
          
//           const currentText = animText[currentTextIndex];
//           const words = currentText.split(' ');
          
//           // Create spans for each word
//           words.forEach((word, index) => {
//             const wordSpan = document.createElement('div');
//             wordSpan.textContent = word;
//             wordSpan.className = 'inline-block opacity-0';
//             wordSpan.style.marginRight = '1rem';
//             textContainer.appendChild(wordSpan);
//           });

//           const wordElements = textContainer.querySelectorAll('div');

//           // Timeline for showing words
//           const textTL = gsap.timeline();
          
//           // Animate words appearing one by one
//           wordElements.forEach((word, index) => {
//             textTL.to(word, {
//               opacity: 1,
//               y: 0,
//               duration: 1,
//               ease: "power2.out"
//             }, index * 0.3);
//           });

//           // Hold for 2 seconds
//           textTL.to({}, { duration: 2 });

//           // Animate words disappearing one by one
//           wordElements.forEach((word, index) => {
//             textTL.to(word, {
//               opacity: 0,
//               y: -20,
//               duration: 0.4,
//               ease: "power2.in"
//             }, `disappear+=${index * 0.2}`);
//           });

//           // Move to next text
//           textTL.call(() => {
//             currentTextIndex = (currentTextIndex + 1) % animText.length;
//             setTimeout(showNextText, 500);
//           });
//         }
//       };

//       // Show text container first
//       gsap.to(textContainer, {
//         opacity: 1,
//         y: 0,
//         duration: 0.5,
//         onComplete: showNextText
//       });
//     }

//   }, [images.length]);

//   const addToRefs = (el: HTMLDivElement | null) => {
//     if (el && !imagesRef.current.includes(el)) {
//       imagesRef.current.push(el);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-full bg-transparent p-8">
//       <div className="relative w-[900px] h-[900px]">
//         {/* Rotating images container */}
//         <div 
//           ref={containerRef}
//           className="absolute inset-0 flex items-center justify-center"
//           style={{ transformOrigin: 'center center' }}
//         >
//           {images.map((src, index) => (
//             <div
//               key={index}
//               ref={addToRefs}
//               className="absolute w-32 h-40 overflow-hidden shadow-xl rounded-2xl "
//               style={{ transformOrigin: 'center center' }}
//             >
//               <img
//                 src={src}
//                 alt={`Floating image ${index + 1}`}
//                 className="w-full h-full object-cover rounded-xl"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Center content */}
//            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 gap-3">
//           {/* Animated Text Container */}
//           <div className="relative animation-text h-fit w-fit p-7 flex justify-center items-center ">
//             <div 
//               ref={textContainerRef}
//               className="text-7xl font-semibold text-gray-900 h-full w-[70%] flex items-center justify-center flex-wrap"
//             >
//               {/* Text will be dynamically inserted here */}
//             </div>
//           </div>

//           <h2 ref={subtitleRef} className="text-lg font-normal text-gray-600 mb-2 opacity-0">
//             A designer, ready to serve — always.
//           </h2>
          
//           {/* <button ref={buttonRef} className="mt-4 px-10 py-6 bg-black text-white rounded-3xl hover:bg-gray-800 transition-colors duration-300 opacity-0">
//             Learn more
//           </button> */}
//         </div>
//       </div>
//     </div>
//   );
// }
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
  const buttonRef = useRef<HTMLButtonElement>(null);

  const images = [
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1627199219038-e8263f729e3d?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
  const button = buttonRef.current;

  if (!container || imageElements.length === 0) return;

  const radius = 380;
  const centerX = 0;
  const centerY = 0;

  // Master timeline
  const masterTL = gsap.timeline();

  // Step 1: Initialize images
  imageElements.forEach((img, index) => {
    gsap.set(img, {
      x: 0,
      y: 0,
      rotation: 0,
      rotationY: 0,
      opacity: 0.8,
      zIndex: images.length - index,
    });
  });

  // Hide text elements initially
  gsap.set([textContainer, subtitle, button], { opacity: 0, y: 20 });

  // Step 2: Move images to circular positions
  masterTL.to(imageElements, {
    duration: 2,
    ease: "power2.out",
    x: (index) => {
      const angle = (index * 360) / images.length;
      const radian = (angle * Math.PI) / 180;
      return centerX + radius * Math.cos(radian);
    },
    y: (index) => {
      const angle = (index * 360) / images.length;
      const radian = (angle * Math.PI) / 180;
      return centerY + radius * Math.sin(radian);
    },
    stagger: 0.1,
  });

  // Step 3: Trigger text animation
  masterTL.call(() => startTextAnimation(), [], 1);

  // Step 4: Fade in subtitle and button
  masterTL.to([subtitle, button], {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out",
  }, 2.5);

  // Step 5: Continuous rotation
  masterTL.call(() => {
    gsap.to(container, {
      rotation: 360,
      duration: 160,
      ease: "none",
      repeat: -1,
    });

    gsap.to(imageElements, {
      rotation: -360,
      duration: 160,
      ease: "none",
      repeat: -1,
      transformOrigin: "center center",
    });
  }, null, 3);

  function startTextAnimation() {
    let currentTextIndex = 0;

    const showNextText = () => {
      if (textContainer) {
        textContainer.innerHTML = "";

        const currentText = animText[currentTextIndex];
        const words = currentText.split(" ");

        words.forEach((word) => {
          const wordSpan = document.createElement("div");
          wordSpan.textContent = word;
          wordSpan.className = "inline-block opacity-0";
          wordSpan.style.marginRight = "1rem";
          textContainer.appendChild(wordSpan);
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

        textTL.to({}, { duration: 2 });

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
      }
    };

    gsap.to(textContainer, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      onComplete: showNextText,
    });
  }

}, [startAnimation, images.length]); // <-- depend on startAnimation


  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el);
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-transparent p-8">
      <div className="relative w-[900px] h-[900px]">
        {/* Rotating images container */}
        <div 
          ref={containerRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformOrigin: 'center center' }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="absolute w-32 h-40 overflow-hidden shadow-xl rounded-2xl "
              style={{ transformOrigin: 'center center' }}
            >
              <img
                src={src}
                alt={`Floating image ${index + 1}`}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>

        {/* Center content */}
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 gap-3">
          {/* Animated Text Container */}
          <div className="relative animation-text h-fit w-fit p-7 flex justify-center items-center ">
            <div 
              ref={textContainerRef}
              className="text-7xl font-semibold text-gray-900 h-full w-[70%] flex items-center justify-center flex-wrap"
            >
              {/* Text will be dynamically inserted here */}
            </div>
          </div>

          <h2 ref={subtitleRef} className="text-lg font-normal text-gray-600 mb-2 opacity-0">
            A designer, ready to serve — always.
          </h2>
          
          {/* <button ref={buttonRef} className="mt-4 px-10 py-6 bg-black text-white rounded-3xl hover:bg-gray-800 transition-colors duration-300 opacity-0">
            Learn more
          </button> */}
        </div>
      </div>
    </div>
  );
}


