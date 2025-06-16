"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type MintButtonProps = {
    status: string;
    onClick: () => void;
};

export default function MintButton({ status, onClick }: MintButtonProps) {
    const buttonRef = useRef(null);
    // Store random particle data in state to ensure consistency between SSR and client
    const [particles, setParticles] = useState<
        {
            size: number;
            duration: number;
            x: number;
            y: number;
        }[]
    >([]);

    useEffect(() => {
        if (status !== "NFT Minted successfully" && status !== "") {
            // Above Condition make sure its Minting State
            gsap.to(buttonRef.current, {
                scale: 0.95,
                duration: 0.2,
                repeat: -1,
                yoyo: true,
            });
        } else if (status === "NFT Minted successfully") {
            gsap.killTweensOf(buttonRef.current);
            gsap.to(buttonRef.current, {
                scale: 1.05,
                duration: 0.2,
                onComplete: () => {
                    gsap.to(buttonRef.current, {
                        scale: 1,
                        duration: 0.2,
                    });
                },
            });
        } else {
            gsap.killTweensOf(buttonRef.current);
            gsap.to(buttonRef.current, {
                scale: 1,
                duration: 0.2,
            });
        }
    }, [status]);

    useEffect(() => {
        if (status === "NFT Minted successfully" && particles.length === 0) {
            // Generate random values ONCE per success state
            setParticles(
                Array.from({ length: 20 }, () => ({
                    size: Math.random() * 6 + 2,
                    duration: Math.random() * 0.8 + 0.6,
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                }))
            );
        }
        if (status !== "NFT Minted successfully" && particles.length > 0) {
            setParticles([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return (
        <button
            ref={buttonRef}
            onClick={status === "" ? onClick : undefined}
            className={
                "w-full py-4 rounded-lg font-bold text-white transition-all relative overflow-hidden bg-gradient-to-r from-[#0052FF] to-[#9F7AEA] hover:from-[#0052FF]/90 hover:to-[#9F7AEA]/90"
            }
            disabled={status !== ""}
            style={{
                boxShadow:
                    status === ""
                        ? "0 0 15px rgba(0, 82, 255, 0.5), 0 0 30px rgba(159, 122, 234, 0.3)"
                        : "none",
            }}
        >
            {status === "NFT Minted successfully" && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <span
                className={
                    status === "NFT Minted successfully" ? "opacity-0" : ""
                }
            >
                {status || "Mint NFT"}
            </span>
        </button>
    );
}
