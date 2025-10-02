import WizNftCreation from "@/config/abi/BaseNFT.json";
import { Abi, Address } from "viem";

export const BaseNFT = {
    abi: WizNftCreation.abi as Abi,
    address: "0xd6B7f55c666504b35FEeCfe052574EF21D95261F" as Address,
};
export const Contracts = {
    BaseNFT,
};
