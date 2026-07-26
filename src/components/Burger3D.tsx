"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function BurgerModel() {
  const { scene } = useGLTF('/uploads_files_6763780_burger-less-size.glb');
  const modelRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={2.5} 
      position={[0, -1.5, 0]} 
    />
  );
}

export default function Burger3D() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 1, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        <BurgerModel />
        
        <Environment preset="city" />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/uploads_files_6763780_burger-less-size.glb');
