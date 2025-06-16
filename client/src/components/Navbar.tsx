"use client";
import { WalletConnect } from "@/components/WalletConnect";
import Link from "next/link";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/20 backdrop-blur-xl">
            <div className="container flex h-16 items-center justify-between mx-auto px-4">
                <div className="items-center gap-6 hidden md:flex">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r from-dex-purple to-dex-blue">
                            <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                                NFT
                            </div>
                        </div>
                        <span className="hidden font-bold text-xl sm:inline-block gradient-text">
                            Minting Dapp
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    <WalletConnect />
                </div>
            </div>
        </header>
    );
}
