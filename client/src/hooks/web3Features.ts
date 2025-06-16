import {
    arbitrum,
    base,
    baseSepolia,
    hardhat,
    mainnet,
    polygon,
    scroll,
    sepolia,
} from "@reown/appkit/networks";

const knownChains = {
    [mainnet.id]: mainnet,
    [base.id]: base,
    [arbitrum.id]: arbitrum,
    [sepolia.id]: sepolia,
    [polygon.id]: polygon,
    [scroll.id]: scroll,
    [baseSepolia.id]: baseSepolia,
    [hardhat.id]: hardhat,
};

export function getNetworkInfo(chainId: number | string) {
    return knownChains[chainId as keyof typeof knownChains] || null;
}
