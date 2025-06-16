import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        NEXT_PUBLIC_PROJECT_ID: "YOUR_PROJECT_ID", // Replace with your actual project ID
        NEXT_PINATA_BASE_URL: "https://YOUR_GATEWAY_URL.mypinata.cloud/ipfs", // Replace with your actual Pinata base URL
        NEXT_PINATA_JWT: "", // Replace with your actual Pinata JWT
        NEXT_PINATA_API_SECRET:
            "b2Y1ZDY5YjYtYzQ0Ny00N2E3LWIwYzItZDI4M2QyZDU1Mjc0", // Replace with your actual Pinata API secret
        NEXT_PINATA_API_KEY: "1234567890abcdef1234", // Replace with your actual Pinata API key
        NEXT_PINATA_GATEWAY_URL: "YOUR_GATEWAY_URL.mypinata.cloud", // Replace with your actual Pinata gateway URL
    },
    webpack: (config) => {
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
    },
};

export default nextConfig;
