import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
        NEXT_PINATA_BASE_URL: process.env.NEXT_PINATA_BASE_URL,
        NEXT_PINATA_JWT: process.env.NEXT_PINATA_JWT,
        NEXT_PINATA_API_SECRET: process.env.NEXT_PINATA_API_SECRET,
        NEXT_PINATA_API_KEY: process.env.NEXT_PINATA_API_KEY,
        NEXT_PINATA_GATEWAY_URL: process.env.NEXT_PINATA_GATEWAY_URL,
    },
    webpack: (config) => {
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
    },
};

export default nextConfig;