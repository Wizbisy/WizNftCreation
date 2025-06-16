import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import ContextProvider from "@/config/Wagmi";
import { headers } from "next/headers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Base NFT Collection",
    description: "A modern NFT Minting Dapp built with Next.js",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const headersObj = await headers();
    const cookies = headersObj.get("cookie");
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.className} min-h-screen antialiased bg-gradient-to-br from-black to-[#121212]`}
                cz-shortcut-listen="true"
                suppressHydrationWarning
            >
                <ContextProvider cookies={cookies}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem={false}
                    >
                        <div className="relative flex min-h-screen flex-col container mx-auto px-4">
                            <Navbar />
                            <main className="flex-1 min-h-[92vh] flex items-center justify-center">
                                {children}
                            </main>
                            <Toaster />
                        </div>
                    </ThemeProvider>
                </ContextProvider>
            </body>
        </html>
    );
}
