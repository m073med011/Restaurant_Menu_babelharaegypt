"use client";

import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function BurgerModel() {
  const { scene } = useGLTF('/uploads_files_6763780_burger-less-size.glb');
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    
    // We animate this 3D group based on ScrollTriggers linked to the main DOM.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 320px)", () => {
      // Initial state
      gsap.set(groupRef.current.rotation, { y: 0, x: 0.1, z: 0 });
      gsap.set(groupRef.current.position, { x: 0, y: -1.5, z: 0 });
      gsap.set(groupRef.current.scale, { x: 2.5, y: 2.5, z: 2.5 });

      // Transition to Section 2 (Ingredients)
      gsap.fromTo(groupRef.current.rotation, 
        { y: 0, x: 0.1, z: 0 },
        {
          y: Math.PI * 1.5, // Rotate to show the side
          x: 0.3,
          z: 0,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#section-2",
            start: "top bottom",
            end: "center center",
            scrub: 1.5,
          }
        }
      );

      gsap.fromTo(groupRef.current.position, 
        { x: 0, y: -1.5, z: 0 },
        {
          x: 1.5, // Move right
          y: -1.0,
          z: 2, // Move slightly closer
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#section-2",
            start: "top bottom",
            end: "center center",
            scrub: 1.5,
          }
        }
      );

      // Transition to Section 3 (Quality)
      gsap.fromTo(groupRef.current.rotation, 
        { y: Math.PI * 1.5, x: 0.3, z: 0 },
        {
          y: Math.PI * 2.8, // Rotate to show the other side
          x: 0,
          z: 0,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#section-3",
            start: "top bottom",
            end: "center center",
            scrub: 1.5,
          }
        }
      );

      gsap.fromTo(groupRef.current.position, 
        { x: 1.5, y: -1.0, z: 2 },
        {
          x: -1.5, // Move left
          y: -1.5,
          z: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#section-3",
            start: "top bottom",
            end: "center center",
            scrub: 1.5,
          }
        }
      );

      // Transition to Section 4 (CTA)
      gsap.fromTo(groupRef.current.rotation, 
        { y: Math.PI * 2.8, x: 0, z: 0 },
        {
          y: Math.PI * 4, // Full rotations
          x: 0.1,
          z: 0,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#section-4",
            start: "top bottom",
            end: "center center",
            scrub: 1.5,
          }
        }
      );

      gsap.fromTo(groupRef.current.position, 
        { x: -1.5, y: -1.5, z: 1 },
        {
          x: 0, // Back to center
          y: -1.8,
          z: 4, // Zoom in MASSIVELY
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#section-4",
            start: "top bottom",
            end: "center center",
            scrub: 1.5,
          }
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <primitive 
      ref={groupRef} 
      object={scene} 
      scale={2.5} 
      position={[0, -1.5, 0]} 
    />
  );
}

export default function BurgerPremium3D() {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 1, 8], fov: 45 }} className="pointer-events-none">
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-10, 5, -5]} intensity={0.5} />
        
        <BurgerModel />
        
        <Environment preset="city" />
        <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={15} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/uploads_files_6763780_burger-less-size.glb');
