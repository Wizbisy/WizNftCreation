import BaseNFTCollection from "@/config/abi/BaseNFT.json";
import { Abi, Address } from "viem";

export const BaseNFT = {
    abi: BaseNFTCollection.abi as Abi,
    address: "0xa9f2eF241F2E5923744CD9717F3175aACc3276c1" as Address, // Replace with the actual deployed contract address
};
export const Contracts = {
    BaseNFT,
};
