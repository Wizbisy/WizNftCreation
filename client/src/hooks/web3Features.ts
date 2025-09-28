import {
    base,
} from "@reown/appkit/networks";

const knownChains = {
    [base.id]: base,
};

export function getNetworkInfo(chainId: number | string) {
    return knownChains[chainId as keyof typeof knownChains] || null;
}
