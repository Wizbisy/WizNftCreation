"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";

interface LiquidAnimationProps {
    progress: number;
    color1?: string;
    color2?: string;
}

function LiquidSphere({
    progress,
    color1 = "#7c3aed",
    color2 = "#3b82f6",
}: LiquidAnimationProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
            meshRef.current.position.y =
                Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial
                color={new THREE.Color(color1).lerp(
                    new THREE.Color(color2),
                    progress
                )}
                distort={0.4}
                speed={2}
                roughness={0.2}
                metalness={0.8}
            />
        </mesh>
    );
}

export function LiquidAnimation({
    progress,
    color1,
    color2,
}: LiquidAnimationProps) {
    return (
        <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <LiquidSphere progress={progress} color1={color1} color2={color2} />
        </Canvas>
    );
}
