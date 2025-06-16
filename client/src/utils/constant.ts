import BaseNFTCollection from "@/config/abi/BaseNFT.json";
import { Abi, Address } from "viem";

export const BaseNFT = {
    abi: BaseNFTCollection.abi as Abi,
    address: "0x" as Address, // Replace with the actual deployed contract address
};
export const Contracts = {
    BaseNFT,
};
