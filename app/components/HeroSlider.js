// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";
// import { useState, useEffect, useCallback } from "react";
// import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// import "swiper/css";
// import "swiper/css/effect-fade";

// export default function HeroSlider() {
//   const [autoplayPlaying, setAutoplayPlaying] = useState(true);
//   const [swiperInstance, setSwiperInstance] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isHovering, setIsHovering] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const slides = [
//     {
//       id: 1,
//       title: "Find The Perfect Job That You Deserved",
//       description:
//         "Discover thousands of job opportunities from top companies and startups.",
//       image: "/carousel-1.jpg",
//       ctaPrimary: { text: "Search a Job", href: "/jobs" },
//       ctaSecondary: { text: "Find a Talent", href: "/talents" },
//       overlayOpacity: 50,
//     },
//     {
//       id: 2,
//       title: "Find The Best Startup Job That Fits You",
//       description:
//         "Build your career with fast-growing startups worldwide.",
//       image: "/carousel-2.jpg",
//       ctaPrimary: { text: "Search a Job", href: "/jobs" },
//       ctaSecondary: { text: "Find a Talent", href: "/talents" },
//       overlayOpacity: 50,
//     },
//   ];

//   const toggleAutoplay = useCallback(() => {
//     if (!swiperInstance) return;

//     if (autoplayPlaying) {
//       swiperInstance.autoplay.stop();
//     } else {
//       swiperInstance.autoplay.start();
//     }
//     setAutoplayPlaying(!autoplayPlaying);
//   }, [swiperInstance, autoplayPlaying]);

//   const nextSlide = () => {
//     swiperInstance && swiperInstance.slideNext();
//   };

//   const prevSlide = () => {
//     swiperInstance && swiperInstance.slidePrev();
//   };

//   const goToSlide = (index) => {
//     swiperInstance && swiperInstance.slideToLoop(index);
//     setProgress(0);
//   };

//   useEffect(() => {
//     let interval;

//     if (autoplayPlaying && !isHovering && isMounted) {
//       interval = setInterval(() => {
//         setProgress((prev) => (prev >= 100 ? 100 : prev + 0.25));
//       }, 10);
//     }

//     return () => clearInterval(interval);
//   }, [autoplayPlaying, isHovering, isMounted]);

//   if (!isMounted) return null;

//   return (
//     <div
//       className="relative w-full h-[90vh]"
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       <Swiper
//         modules={[Autoplay, EffectFade]}
//         autoplay={{ delay: 4000, disableOnInteraction: false }}
//         effect="fade"
//         loop
//         speed={800}
//         onSwiper={setSwiperInstance}
//         onSlideChange={(swiper) => {
//           setCurrentSlide(swiper.realIndex);
//           setProgress(0);
//         }}
//         className="w-full h-full"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id}>
//             <div className="relative w-full h-full">
//               {/* Background Image */}
//               <Image
//                 src={slide.image}
//                 alt={slide.title}
//                 fill
//                 priority={slide.id === 1}
//                 className="object-cover"
//               />

//               {/* Overlay */}
//               <div
//                 className="absolute inset-0 z-10"
//                 style={{
//                   backgroundColor: `rgba(0,0,0,${
//                     slide.overlayOpacity / 100
//                   })`,
//                 }}
//               />

//               {/* Content */}
//               <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
//                 <div className="max-w-2xl text-white">
//                   <h1 className="text-4xl md:text-6xl font-bold mb-4">
//                     {slide.title}
//                   </h1>
//                   <p className="text-lg mb-6">{slide.description}</p>

//                   <div className="flex gap-4">
//                     <Link
//                       href={slide.ctaPrimary.href}
//                       className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
//                     >
//                       {slide.ctaPrimary.text}
//                     </Link>
//                     <Link
//                       href={slide.ctaSecondary.href}
//                       className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
//                     >
//                       {slide.ctaSecondary.text}
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Controls */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl">
//         <button onClick={prevSlide}>
//           <ChevronLeft className="text-white" />
//         </button>

//         <button onClick={toggleAutoplay}>
//           {autoplayPlaying ? (
//             <Pause className="text-white" />
//           ) : (
//             <Play className="text-white" />
//           )}
//         </button>

//         <button onClick={nextSlide}>
//           <ChevronRight className="text-white" />
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useState, useEffect, useCallback } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/effect-fade";

export default function HeroSlider() {
  const [autoplayPlaying, setAutoplayPlaying] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Find The Perfect Job That You Deserved",
      description:
        "Discover thousands of job opportunities from top companies and startups.",
      image: "/pic3.webp",
      ctaPrimary: { text: "Search a Job", href: "/jobs" },
      
      overlayOpacity: 50,
    },
    {
      id: 2,
      title: "Find The Best Startup Job That Fits You",
      description:
        "Build your career with fast-growing startups worldwide.",
      image: "/pic2.jpg",
      ctaPrimary: { text: "Search a Job", href: "/jobs" },
     
      overlayOpacity: 50,
    },
  ];

  // Autoplay progress (4 seconds = 4000ms)
  useEffect(() => {
    if (!autoplayPlaying || isHovering || !isMounted) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / 2000) * 10; // 10ms ticks
        return newProgress >= 100 ? 0 : newProgress;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [autoplayPlaying, isHovering, isMounted]);

  // Reset progress on slide change
  useEffect(() => {
    setProgress(0);
  }, [currentSlide]);

  // Pause autoplay on hover
  useEffect(() => {
    if (!swiperInstance) return;

    if (isHovering) {
      swiperInstance.autoplay.stop();
    } else if (autoplayPlaying) {
      swiperInstance.autoplay.start();
    }
  }, [isHovering, swiperInstance, autoplayPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [swiperInstance]);

  const toggleAutoplay = useCallback(() => {
    if (!swiperInstance) return;

    if (autoplayPlaying) {
      swiperInstance.autoplay.stop();
    } else {
      swiperInstance.autoplay.start();
    }
    setAutoplayPlaying(!autoplayPlaying);
  }, [swiperInstance, autoplayPlaying]);

  const nextSlide = () => swiperInstance?.slideNext();
  const prevSlide = () => swiperInstance?.slidePrev();
  const goToSlide = (index) => {
    swiperInstance?.slideToLoop(index);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className="relative w-full h-[90vh] overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      role="region"
      aria-label="Hero carousel"
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect="fade"
        loop
        speed={800}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />

              {/* Dark Overlay */}
              <div
                className="absolute inset-0 z-10 bg-black"
                style={{ opacity: slide.overlayOpacity / 100 }}
              />

              {/* Content */}
              <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
                <div
                  className="max-w-2xl text-white animate-fadeIn"
                  key={slide.id} // Triggers animation on slide change
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 opacity-90">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={slide.ctaPrimary.href}
                      className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-medium transition"
                      aria-label={`Primary call to action: ${slide.ctaPrimary.text}`}
                    >
                      {slide.ctaPrimary.text}
                    </Link>
                    
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="text-white hover:text-gray-300 transition"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={toggleAutoplay}
          aria-label={autoplayPlaying ? "Pause autoplay" : "Play autoplay"}
          className="text-white hover:text-gray-300 transition"
        >
          {autoplayPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="text-white hover:text-gray-300 transition"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Progress Bar & Dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}