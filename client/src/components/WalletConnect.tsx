"use client";

import { Button } from "@/components/ui/button";
import { CurrencyIcon, WalletIcon } from "lucide-react";
import {
    useAppKit,
    useAppKitAccount,
    useAppKitNetwork,
} from "@reown/appkit/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBalance } from "wagmi";
import { Address } from "viem";
import { getNetworkInfo } from "@/hooks/web3Features";
interface BalanceType {
    decimals: number;
    formatted: string;
    symbol: string;
    value: bigint;
}
export function WalletConnect() {
    const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { open } = useAppKit();
    const { address, status, isConnected } = useAppKitAccount();
    const { chainId } = useAppKitNetwork();
    const [isMounted, setIsMounted] = useState(false);
    const [balance, setBalance] = useState<BalanceType | null>(null);
    const { refetch } = useBalance({
        address: address as Address,
        chainId: chainId as number,
    });
    const handleGetBalance = useCallback(async () => {
        const balance = await refetch();
        if (balance.data?.decimals && balance.data?.formatted && chainId) {
            const networkInfo = getNetworkInfo(chainId);
            setBalance({
                decimals: balance.data.decimals,
                formatted: balance.data.formatted,
                value: balance.data.value,
                symbol: networkInfo?.name || "ETH",
            });
        }
    }, [refetch, chainId]);

    useEffect(() => {
        if (!isMounted) setIsMounted(true);

        if (!isConnected && isMounted) {
            timerId.current = setTimeout(() => {
                if (!isConnected) {
                    open();
                }
            }, 2000);
        }

        // Clear the timeout if the wallet gets connected
        return () => {
            if (timerId.current) {
                clearTimeout(timerId.current);
                timerId.current = null;
            }
        };
    }, [isConnected, status, isMounted, open, chainId]);

    useEffect(() => {
        if (isConnected && isMounted && chainId) {
            handleGetBalance();
        }
    }, [isConnected, isMounted, chainId, handleGetBalance]);

    if (!isMounted) {
        return null; // Prevent rendering until the component is mounted
    }

    if (isConnected) {
        return (
            <div className="flex items-center justify-center gap-3">
                <Button
                    variant="outline"
                    className="border-dex-purple/30 hover:border-dex-purple/50 bg-dex-glass"
                    onClick={() => open()}
                >
                    <CurrencyIcon className="h-4 w-4 text-dex-purple-light" />
                    {Number(balance?.formatted) > 0
                        ? Number(balance?.formatted).toFixed(4)
                        : 0}{" "}
                    {balance?.symbol ? balance?.symbol : "?"}{" "}
                </Button>

                <Button
                    variant="outline"
                    className="border-dex-purple/30 hover:border-dex-purple/50 bg-dex-glass"
                    onClick={() => open()}
                >
                    <WalletIcon className="h-4 w-4 text-dex-purple-light" />

                    {address && address.slice(0, 4) + "..." + address.slice(-4)}
                </Button>
            </div>
        );
    }

    return (
        <Button
            variant="outline"
            className="border-dex-purple/30 hover:border-dex-purple/50 bg-dex-glass cursor-pointer capitalize"
            onClick={() => open()}
        >
            <WalletIcon className="mr-2 h-4 w-4 text-dex-purple-light" />
            {status !== "disconnected" ? status + "..." : "Connect Wallet"}
        </Button>
    );
}
