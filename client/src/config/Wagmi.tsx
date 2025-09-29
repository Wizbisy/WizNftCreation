/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { wagmiAdapter, projectId, config } from "@/config/wagmiConfig";
import { createAppKit } from "@reown/appkit/react";
import {
    base,
} from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

if (!projectId) {
    throw new Error("Project ID is not defined");
}
// Set up queryClient
const queryClient = new QueryClient(); // it is just using for Wagmi.

// Set up metadata
const metadata = {
    name: "W-N-C",
    description: "create and mint your nft onchain",
    url: "https://mint-nft-dapp-lyart.vercel.app/", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create the modal
const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [
        base,
    ],
    defaultNetwork: base,
    metadata: metadata,
    // features: {
    //     analytics: true, // Optional - defaults to your Cloud configuration
    // },
});

function ContextProvider({
    children,
    cookies,
}: {
    children: ReactNode;
    cookies: string | null;
}) {
    const initialState = cookieToInitialState(
        wagmiAdapter.wagmiConfig as Config,
        cookies
    );

    return (
        <WagmiProvider config={config as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default ContextProvider;
