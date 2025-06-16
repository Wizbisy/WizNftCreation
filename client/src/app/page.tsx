"use client";

import MintingInterface from "@/components/MintinInterface";

export default function MintNFT() {
    return (
        <>
            <main className="h-full text-white w-full">
                <MintingInterface />

                <footer className="mt-20 text-center text-sm text-gray-500">
                    <p>Powered by Base Network</p>
                </footer>
            </main>
        </>
    );
}
