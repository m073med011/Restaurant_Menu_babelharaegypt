"use client";

import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, ShoppingBag, ArrowLeft, ArrowRight, Menu } from "lucide-react";
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Importing the images from the specified path
import food1 from "../Public/images/HeroFoods/Food001.png";
import food2 from "../Public/images/HeroFoods/Food002.png";
import food3 from "../Public/images/HeroFoods/Food003.png";
import food4 from "../Public/images/HeroFoods/Food004.png";
import food5 from "../Public/images/HeroFoods/Food005.png";

const foods = [
  {
    id: 1,
    title: "BURGER",
    desc: "Experience the ultimate taste of our classic burger, made with fresh ingredients and a lot of love.",
    img: food1,
    bgColor: "#f19c32", // Orange
  },
  {
    id: 2,
    title: "POPCORN",
    desc: "Popcorn isn't just a healthy snack for after school, playtime or movies. Popcorn is also a great way to learn how to be your best self, create and explore.",
    img: food2,
    bgColor: "#e74c3c", // Red
  },
  {
    id: 3,
    title: "SALAD", 
    desc: "Fresh, crisp, and packed with nutrients. A perfect choice for a healthy and light meal.",
    img: food3,
    bgColor: "#2ecc71", // Green
  },
  {
    id: 4,
    title: "DRINK",
    desc: "Cool down with our refreshing beverages, perfectly crafted to quench your thirst on a hot day.",
    img: food4,
    bgColor: "#3498db", // Blue
  },
  {
    id: 5,
    title: "DESSERT",
    desc: "Treat yourself to a sweet delight to end your meal on a perfect note. You deserve it!",
    img: food5,
    bgColor: "#9b59b6", // Purple
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const descTextRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const scrollImageRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);

  const targetIndexRef = useRef(0);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const [nextBg, setNextBg] = useState<string | null>(null);

  useEffect(() => {
    // Lenis Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // GSAP animations for initial load with a smooth, premium feel
    const tl = gsap.timeline();

    tl.fromTo(
      textRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      imageRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
      "<0.1" // Starts slightly after text
    ).fromTo(
      ".gsap-ui",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" },
      "<0.2" // Start right after the main items
    ).fromTo(
      btnRef.current,
      { y: -150, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" },
      "<0.4"
    );

    if (descTextRef.current) {
      tl.fromTo(
        descTextRef.current.querySelectorAll(".desc-char"),
        { opacity: 0 },
        { opacity: 1, duration: 0.01, stagger: 0.015, ease: "none" },
        "-=0.5" // Start typing while the container is fading in
      );
    }

    // ScrollTrigger logic
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.to(scrollImageRef.current, {
        x: "-25vw", 
        scale: 0.6,
        rotation: 15,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          pin: scrollImageRef.current,
          pinSpacing: false,
          scrub: 1,
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.to(scrollImageRef.current, {
        scale: 0.5,
        rotation: 10,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          pin: scrollImageRef.current,
          pinSpacing: false,
          scrub: 1,
        }
      });
    });

    // About Section scroll-triggered animations
    if (aboutSectionRef.current) {
      // Heading slide-in
      const aboutHeading = aboutSectionRef.current.querySelector("h2");
      if (aboutHeading) {
        gsap.fromTo(aboutHeading,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            }
          }
        );
      }

      // Divider line
      const aboutDivider = aboutSectionRef.current.querySelector(".w-20");
      if (aboutDivider) {
        gsap.fromTo(aboutDivider,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1, opacity: 1, duration: 0.6, ease: "power3.out",
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            }
          }
        );
      }

      // Letter-by-letter animation for the paragraph
      const aboutChars1 = aboutSectionRef.current.querySelectorAll(".about-char");
      if (aboutChars1.length > 0) {
        gsap.fromTo(aboutChars1,
          { opacity: 0 },
          {
            opacity: 1, duration: 0.02, stagger: 0.018, ease: "none",
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            }
          }
        );
      }

      // Button entrance
      const aboutBtn = aboutSectionRef.current.querySelector(".about-btn");
      if (aboutBtn) {
        gsap.fromTo(aboutBtn,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: "top 40%",
              toggleActions: "play none none none",
            }
          }
        );
      }
    }

    return () => {
      mm.revert(); // clean up matchMedia on unmount
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  const changeSlide = (direction: "next" | "prev") => {
    // Kill any ongoing animations to allow rapid clicking
    if (tlRef.current) tlRef.current.kill();
    
    const targets = [imageRef.current, textRef.current, descRef.current, btnRef.current];
    if (overlayRef.current) targets.push(overlayRef.current);
    gsap.killTweensOf(targets);
    
    if (descTextRef.current) {
      gsap.killTweensOf(descTextRef.current.querySelectorAll(".desc-char"));
    }

    let nextIdx = direction === "next" ? targetIndexRef.current + 1 : targetIndexRef.current - 1;
    if (nextIdx < 0) nextIdx = foods.length - 1;
    if (nextIdx >= foods.length) nextIdx = 0;
    
    targetIndexRef.current = nextIdx;
    const isNext = direction === "next";

    // Use flushSync to guarantee the overlay div with the new bg color is in the DOM
    flushSync(() => {
      if (isNext) {
        setBgIndex(currentIndex);
        setNextBg(foods[nextIdx].bgColor);
      } else {
        setBgIndex(nextIdx);
        setNextBg(foods[currentIndex].bgColor);
      }
    });

    const tl = gsap.timeline();
    tlRef.current = tl;

    const exitYText = isNext ? -80 : 80;
    const exitYDesc = isNext ? -20 : 20;

    // 1. Zoom out current content smoothly
    tl.to(imageRef.current, { scale: 0, opacity: 0, duration: 0.25, ease: "power3.inOut" }, 0);
    tl.to(textRef.current, { y: exitYText, opacity: 0, duration: 0.25, ease: "power3.inOut" }, 0);
    tl.to(descRef.current, { y: exitYDesc, opacity: 0, duration: 0.2, ease: "power3.inOut" }, 0);
    tl.to(btnRef.current, { y: 20, opacity: 0, scale: 0.8, duration: 0.2, ease: "power3.inOut" }, 0);
    
    // 2. Animate background overlay expanding smoothly
    if (overlayRef.current) {
      if (isNext) {
        gsap.set(overlayRef.current, { clipPath: "circle(0% at 100% 0%)" });
        tl.to(overlayRef.current, {
          clipPath: "circle(150% at 100% 0%)",
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            flushSync(() => {
              setBgIndex(nextIdx);
              setNextBg(null);
            });
          }
        }, 0); 
      } else {
        gsap.set(overlayRef.current, { clipPath: "circle(150% at 100% 0%)" });
        tl.to(overlayRef.current, {
          clipPath: "circle(0% at 100% 0%)",
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            flushSync(() => {
              setNextBg(null);
            });
          }
        }, 0); 
      }
    }

    const enterYText = isNext ? 80 : -80;
    const enterYDesc = isNext ? 20 : -20;

    // 3. Swap content midway and zoom in new content smoothly
    tl.call(() => {
      flushSync(() => {
        setCurrentIndex(nextIdx);
      });
      
      gsap.fromTo(
        imageRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(
        textRef.current,
        { y: enterYText, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
      
      // Make the container fully visible immediately so we can see the letters type
      gsap.fromTo(
        descRef.current,
        { y: enterYDesc, opacity: 1 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      
      gsap.fromTo(
        btnRef.current,
        { y: -150, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.4)", delay: 0.3 }
      );

      if (descTextRef.current) {
        gsap.fromTo(
          descTextRef.current.querySelectorAll(".desc-char"),
          { opacity: 0 },
          { opacity: 1, duration: 0.01, stagger: 0.015, ease: "none" }
        );
      }
    }, undefined, 0.25); // Swap exactly as the out-animation finishes
  };

  return (
    <main 
      className="flex flex-col w-full min-h-dvh overflow-x-hidden text-white font-sans relative"
    >
      {/* Fixed Background Wrapper */}
      <div 
        className="fixed inset-0 z-0 transition-colors duration-500"
        style={{ backgroundColor: foods[bgIndex].bgColor }}
      >
        {nextBg && (
          <div
            ref={overlayRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ 
              backgroundColor: nextBg,
              clipPath: "circle(0% at 100% 0%)"
            }}
          />
        )}
      </div>

      <section 
        ref={containerRef} 
        className="relative z-10 w-full h-dvh flex flex-col justify-between px-4 py-4 sm:px-8 sm:py-6 md:px-16 md:py-10 mx-auto max-w-[1900px]"
      >
        {/* Navigation Bar */}
        <header className="gsap-ui flex justify-between items-center z-20 w-full">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Icon */}
            <button aria-label="Menu" className="md:hidden hover:text-white/80 transition-colors">
              <Menu size={24} strokeWidth={2.5} />
            </button>
            {/* Logo placeholder */}
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-lg md:text-xl font-bold text-orange-500 shadow-md">
              🍔
            </div>
          </div>
          
          <nav className="hidden md:flex gap-8 lg:gap-12 text-xs lg:text-sm font-bold tracking-widest text-white/95 uppercase">
            <a href="#" className="hover:text-white transition-colors">All Items</a>
            <a href="#" className="hover:text-white transition-colors">Roll</a>
            <a href="#" className="hover:text-white transition-colors">Burger</a>
            <a href="#" className="hover:text-white transition-colors">New Arrivals</a>
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <button aria-label="Search" className="hover:text-white/80 transition-colors">
              <Search size={20} className="md:w-[22px] md:h-[22px]" strokeWidth={2.5} />
            </button>
            <button aria-label="Cart" className="relative hover:text-white/80 transition-colors">
              <ShoppingBag size={20} className="md:w-[22px] md:h-[22px]" strokeWidth={2.5} />
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] md:text-[10px] font-bold w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative flex-1 flex items-center justify-center z-10 w-full h-full mt-2 md:mt-4">
          {/* Huge Background Text */}
          <h1 
            ref={textRef}
            className="absolute z-0 text-[32vw] sm:text-[28vw] md:text-[20vw] font-black tracking-tighter text-white leading-none select-none uppercase text-center w-full"
            style={{ 
              textShadow: "0 10px 30px rgba(0,0,0,0.1)",
              WebkitTextStroke: "1px rgba(255,255,255,0.8)"
            }}
          >
            {foods[currentIndex].title}
          </h1>

          {/* Food Image Wrapper for Scroll */}
          <div ref={scrollImageRef} className="absolute z-10 flex items-center justify-center pointer-events-none">
            <div 
              ref={imageRef} 
              className="w-[130vw] max-w-[600px] sm:w-[110vw] sm:max-w-[800px] md:w-[90vw] md:max-w-[1350px] drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)] md:drop-shadow-[0_40px_40px_rgba(0,0,0,0.4)] pointer-events-auto"
            >
              <Image 
                src={foods[currentIndex].img} 
                alt={foods[currentIndex].title}
                className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom Elements */}
        <div dir="ltr" className="flex flex-col items-center md:flex-row md:justify-between md:items-end z-0 pb-2 sm:pb-4 w-full gap-6 md:gap-0">
          
          {/* Description */}
          <div 
            ref={descRef}
            className="gsap-ui w-full max-w-[90%] sm:max-w-[80%] md:max-w-[300px] text-center md:text-left text-xs sm:text-sm text-white/90 font-medium leading-relaxed tracking-wide"
          >
            <p ref={descTextRef}>
              {foods[currentIndex].desc.split("").map((char, idx) => (
                <span key={idx} className="desc-char opacity-0">
                  {char}
                </span>
              ))}
            </p>
          </div>

          {/* Order Button */}
          <div ref={btnRef} className="relative md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-12 z-0">
            <button className="bg-black text-white px-8 py-3 md:px-10 md:py-3.5 rounded-xl font-bold text-sm md:text-base tracking-wider hover:bg-neutral-800 transition-colors shadow-2xl hover:shadow-xl transform hover:-translate-y-1">
              Order Now
            </button>
          </div>

          {/* Arrows */}
          <div className="gsap-ui flex gap-4 md:gap-4 justify-center md:justify-end">
            <button 
              onClick={() => changeSlide("prev")}
              aria-label="Previous" 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/50 flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm cursor-pointer z-40"
            >
              <ArrowLeft size={18} className="text-white" />
            </button>
            <button 
              onClick={() => changeSlide("next")}
              aria-label="Next" 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/50 flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm cursor-pointer z-40"
            >
              <ArrowRight size={18} className="text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={aboutSectionRef}
        className="relative z-10 w-full min-h-dvh flex flex-col md:flex-row items-center px-6 sm:px-12 md:px-24 py-16 md:py-0 mx-auto max-w-[1900px] overflow-hidden"
      >
        {/* Image — hidden on mobile (hero scroll image fills this space), visible on desktop */}
        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center order-1 md:order-2 mb-10 md:mb-0">
          <div className="about-image-wrapper w-[70vw] max-w-[400px] md:w-full md:max-w-[550px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
           
          </div>
        </div>

        {/* Text content — shows second on mobile (order-2), first on desktop (md:order-1) */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6 md:pr-10 z-20 order-2 md:order-1 text-center md:text-right">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-lg">
            About Us
          </h2>
          <div className="w-20 h-2 bg-white rounded-full mx-auto md:mx-0 md:ml-auto"></div>
          <p className="about-text-1 text-sm sm:text-base md:text-xl text-white/90 leading-relaxed font-medium mt-2 md:mt-4">
            {"Welcome to our culinary universe. We believe that food isn't just about sustenance; it's an experience, an art form, and a way to bring people together Our passionate chefs craft each dish with the freshest ingredients, pushing the boundaries of flavor to create unforgettable moments with every bite.".split("").map((char, idx) => (
              <span key={`about1-${idx}`} className="about-char" style={{ opacity: 0 }}>
                {char}
              </span>
            ))}
          </p>
          <button className="about-btn mx-auto md:mx-0 md:mr-auto mt-4 md:mt-6 border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-lg uppercase tracking-widest text-sm md:text-base">
            Our Story
          </button>
        </div>
      </section>
    </main>
  );
}
