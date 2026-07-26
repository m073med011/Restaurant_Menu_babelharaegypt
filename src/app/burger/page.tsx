"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import BurgerPremium3D from "../../components/BurgerPremium3D";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PremiumBurgerPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lenis Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.5, // Slower, heavier feel for premium experience
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Background color transitions
    const mm = gsap.matchMedia();
    mm.add("(min-width: 320px)", () => {
      // Transition to dark mode for ingredients (Section 2)
      gsap.to(containerRef.current, {
        backgroundColor: "#111111",
        color: "#ffffff",
        ease: "none",
        scrollTrigger: {
          trigger: "#section-2",
          start: "top center",
          end: "center center",
          scrub: true,
        }
      });
      
      // Transition to a premium white/cream for quality (Section 3)
      gsap.to(containerRef.current, {
        backgroundColor: "#f5f5f0",
        color: "#111111",
        ease: "none",
        scrollTrigger: {
          trigger: "#section-3",
          start: "top center",
          end: "center center",
          scrub: true,
        }
      });

      // Back to Orange for CTA (Section 4)
      gsap.to(containerRef.current, {
        backgroundColor: "#f19c32",
        color: "#ffffff",
        ease: "none",
        scrollTrigger: {
          trigger: "#section-4",
          start: "top center",
          end: "center center",
          scrub: true,
        }
      });

      // Typography Entrance Animations
      gsap.utils.toArray(".text-reveal").forEach((elem: any) => {
        gsap.fromTo(elem, 
          { y: 100, opacity: 0 }, 
          {
            y: 0, opacity: 1, duration: 1.2, ease: "power4.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
            }
          }
        );
      });
    });

    return () => {
      mm.revert();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <main 
      ref={containerRef}
      className="flex flex-col w-full min-h-screen bg-[#f19c32] text-white font-sans relative overflow-x-hidden transition-colors duration-100"
    >
      {/* Fixed 3D Canvas Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BurgerPremium3D />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference text-white">
        <Link href="/" className="flex items-center gap-2 hover:text-white/80 transition-colors">
          <ArrowLeft size={24} />
          <span className="font-bold tracking-widest uppercase text-sm hidden sm:block">Back</span>
        </Link>
        <div className="text-xl md:text-2xl font-black tracking-widest uppercase">BURGER.</div>
      </header>

      {/* Scrollable Content Layers */}
      <div className="relative z-10 w-full max-w-[1900px] mx-auto">
        
        {/* Section 1: Hero */}
        <section id="section-1" className="h-screen w-full flex flex-col items-center justify-center pointer-events-none px-4">
          <h1 className="text-reveal text-[15vw] leading-[0.8] font-black uppercase tracking-tighter mix-blend-overlay opacity-50 whitespace-nowrap">
            The Perfect
          </h1>
          <h1 className="text-reveal text-[15vw] leading-[0.8] font-black uppercase tracking-tighter text-white drop-shadow-2xl whitespace-nowrap">
            Burger.
          </h1>
        </section>

        {/* Section 2: Ingredients */}
        <section id="section-2" className="h-[120vh] w-full flex items-center px-6 md:px-20 pointer-events-none">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h2 className="text-reveal text-5xl md:text-7xl font-bold uppercase tracking-tight">100% Angus<br/>Beef</h2>
            <p className="text-reveal text-lg md:text-2xl font-light max-w-md opacity-80 leading-relaxed">
              Sourced from the finest farms. Grilled to absolute perfection. Juicy, tender, and packed with flavor in every single bite.
            </p>
          </div>
        </section>

        {/* Section 3: Quality */}
        <section id="section-3" className="h-[120vh] w-full flex items-center justify-end px-6 md:px-20 pointer-events-none">
          <div className="w-full md:w-1/2 flex flex-col gap-6 text-right items-end">
            <h2 className="text-reveal text-5xl md:text-7xl font-bold uppercase tracking-tight">Artisanal<br/>Buns</h2>
            <p className="text-reveal text-lg md:text-2xl font-light max-w-md opacity-80 leading-relaxed">
              Baked fresh daily. Soft on the inside, perfectly toasted on the outside. The perfect vessel for culinary excellence.
            </p>
          </div>
        </section>

        {/* Section 4: CTA */}
        <section id="section-4" className="h-screen w-full flex flex-col items-center justify-end pb-32 md:pb-40 pointer-events-auto px-4">
          <h2 className="text-reveal text-[10vw] md:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-2xl mb-10 z-20 leading-none text-center">
            Taste It.
          </h2>
          <button className="text-reveal px-12 py-5 bg-white text-black font-bold tracking-widest uppercase rounded-full hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 z-20 shadow-2xl">
            Order Now
          </button>
        </section>

      </div>
    </main>
  );
}
