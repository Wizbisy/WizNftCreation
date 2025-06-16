"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import { gsap } from "gsap";

interface NFTPreviewProps {
    imageUrl: string;
}

export default function NFTPreview({ imageUrl }: NFTPreviewProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const cubeRef = useRef<THREE.Mesh | null>(null);
    const particlesRef = useRef<THREE.Points | null>(null);
    const textureRef = useRef<THREE.Texture | null>(null);
    const frameId = useRef<number | null>(null);

    useEffect(() => {
        // Initialize scene
        const container = containerRef.current;
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );
        camera.position.z = 5;
        cameraRef.current = camera;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.innerHTML = "";
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.5;

        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x202040, 1); // Darker blue ambient light
        scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        // Point lights for glow effect
        const pointLight1 = new THREE.PointLight(0x0052ff, 1, 15);
        pointLight1.position.set(3, 3, 3);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x9f7aea, 1, 15);
        pointLight2.position.set(-3, -3, -3);
        scene.add(pointLight2);

        // Create moon
        const createMoon = () => {
            // Default texture if no image is provided
            const defaultTexture = new THREE.TextureLoader().load("");

            // Create moon geometry (sphere)
            const geometry = new THREE.SphereGeometry(1.5, 64, 64);

            // Create moon material with crater-like appearance
            const material = new THREE.MeshPhysicalMaterial({
                map: defaultTexture,
                metalness: 0.1,
                roughness: 0.7,
                transmission: 0.1,
                thickness: 1,
                clearcoat: 0.3,
                clearcoatRoughness: 0.5,
                color: 0xf0f0f0,
                emissive: 0x222222,
                emissiveIntensity: 0.1,
                bumpScale: 0.05,
            });

            const moon = new THREE.Mesh(geometry, material);
            scene.add(moon);
            cubeRef.current = moon; // Still using cubeRef for consistency

            // Add subtle glow effect
            const moonGlow = new THREE.PointLight(0xaaaaff, 1, 10);
            moonGlow.position.set(0, 0, 0);
            moon.add(moonGlow);

            // Animate moon rotation (slower than the cube was)
            gsap.to(moon.rotation, {
                y: Math.PI * 2,
                duration: 30,
                repeat: -1,
                ease: "none",
            });

            gsap.to(moon.rotation, {
                x: Math.PI / 10, // Slight tilt
                duration: 40,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            return moon;
        };

        // Create particles
        const createParticles = () => {
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 1000; // More particles

            const posArray = new Float32Array(particlesCount * 3);

            for (let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 15; // Wider spread
            }

            particlesGeometry.setAttribute(
                "position",
                new THREE.BufferAttribute(posArray, 3)
            );

            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.015, // Smaller particles
                color: 0xffffff, // White stars
                transparent: true,
                opacity: 0.7,
                blending: THREE.AdditiveBlending,
            });

            const particles = new THREE.Points(
                particlesGeometry,
                particlesMaterial
            );
            scene.add(particles);
            particlesRef.current = particles;

            return particles;
        };

        createMoon();
        createParticles();

        // Animation loop
        const animate = () => {
            controls.update();

            if (particlesRef.current) {
                particlesRef.current.rotation.x += 0.0005;
                particlesRef.current.rotation.y += 0.0005;
            }

            renderer.render(scene, camera);
            frameId.current = requestAnimationFrame(animate);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            if (frameId.current !== null) {
                cancelAnimationFrame(frameId.current);
            }

            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
        };
    }, []);

    // Update texture when image changes
    useEffect(() => {
        if (imageUrl && cubeRef.current) {
            // Load new texture
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = imageUrl;

            img.onload = () => {
                const texture = new THREE.Texture(img);
                texture.needsUpdate = true;
                textureRef.current = texture;

                // Apply texture to cube
                if (
                    cubeRef.current &&
                    cubeRef.current.material &&
                    (cubeRef.current.material as THREE.Material).hasOwnProperty(
                        "map"
                    )
                ) {
                    const material = cubeRef.current
                        .material as THREE.MeshPhysicalMaterial;
                    material.map = texture;
                    material.needsUpdate = true;

                    // Animate the cube when texture changes
                    gsap.fromTo(
                        cubeRef.current.scale,
                        { x: 1.2, y: 1.2, z: 1.2 },
                        {
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 1,
                            ease: "elastic.out(1, 0.3)",
                        }
                    );
                }
            };
        }
    }, [imageUrl]);

    return <div ref={containerRef} className="w-full h-full" />;
}
