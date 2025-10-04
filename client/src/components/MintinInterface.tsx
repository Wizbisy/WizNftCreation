"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import NFTPreview from "@/components/NftPreview";
import MintForm from "@/components/MintForm";
import MintButton from "@/components/MintButton";
import { toast } from "sonner";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { useBalance, useWriteContract } from "wagmi";
import { Address } from "viem";
import { uploadFileToPinata, uploadMetadataToPinata } from "@/utils/IPFS";
import { BaseNFT } from "@/utils/constant";
import { motion } from "framer-motion";

export type Attribute = {
    trait_type: string;
    value: string;
};

export type NftData = {
    name: string;
    description: string;
    image: File | null;
    imageUrl: string;
    attributes: Attribute[];
};

// Define the NftData interface to match MintForm's expectations

export default function MintingInterface() {
    const { address } = useAppKitAccount();
    const { chainId } = useAppKitNetwork();

    const { refetch } = useBalance({
        address: address as Address,
        chainId: chainId as number,
    });
    const {
        data: writeHash,
        error: writeErr,
        writeContractAsync,
    } = useWriteContract();
    const [status, setStatus] = useState<string>("");

    const [nftData, setNftData] = useState<NftData>({
        name: "",
        description: "",
        image: null,
        imageUrl: "",
        attributes: [{ trait_type: "", value: "" }],
    });

    const containerRef = useRef(null);

    useEffect(() => {
        // Initial animation
        gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
    }, []);

    const handleImageUpload = (file: File) => {
        if (file) {
            const url = URL.createObjectURL(file);
            setNftData({
                ...nftData,
                image: file,
                imageUrl: url,
            });

            // Animate the transition
            gsap.fromTo(
                ".preview-container",
                { scale: 0.95, opacity: 0.8 },
                { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    };

    const handleMint = async () => {
        if (!nftData.image) {
            toast.error("Please upload an image for the NFT.");
            return;
        }
        const balance = await refetch();
        if (!balance.data?.formatted || !chainId) {
            toast.error(
                "invalid chain, please switch to Base."
            );
            return;
        }
        if (balance.data?.formatted && chainId) {
            if (Number(balance.data.formatted) < 0.000000000000001) {
                toast.error(
                    "Insufficient balance to mint NFT. Please ensure you have at least 0.00000000000001 ETH."
                );
                return;
            }
        }

        if (!nftData?.attributes) {
            toast.error("Please add at least one attribute to the NFT.");
            return;
        }
        try {
            setStatus("Uploading image");
            const imageUploadRes = await uploadFileToPinata(nftData.image);
            const imageIpfsUri = `${process.env.NEXT_PINATA_BASE_URL}/${imageUploadRes?.IpfsHash}`;
            // Filter out empty attributes before submitting
            const filteredAttributes = nftData?.attributes.filter(
                (attr) =>
                    attr.trait_type.trim() !== "" && attr.value.trim() !== ""
            );

            const newMetadata = {
                name: nftData.name,
                image: imageIpfsUri,
                description: nftData.description,
                attributes: filteredAttributes,
            };
            setStatus("Uploading metadata");
            const metadataUploadRes = await uploadMetadataToPinata(newMetadata);
            const metadataIpfsUri = `${process.env.NEXT_PINATA_BASE_URL}/${metadataUploadRes?.IpfsHash}`;
            setStatus("Minting NFT");
            await writeContractAsync({
                address: BaseNFT.address,
                abi: BaseNFT.abi,
                functionName: "mint",
                args: [metadataIpfsUri],
                value: BigInt(0), // 0.00 ETH in wei // Fixed value for minting
            });
            setStatus("NFT Minted successfully");
            setTimeout(() => {
                setStatus("");
            }, 3000);
            toast.success("NFT Minted successful!");
        } catch (err) {
            setStatus("");
            console.error("Hook Error:", writeErr);
            console.error("Error during Mint:", err);
        }
    };

    return (
        <div
            ref={containerRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
            <NFTPreview imageUrl={nftData.imageUrl} />

            <div className="flex flex-col">
                <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#0052FF] to-[#9F7AEA]">
                    Mint Your NFT On Base Network
                </h2>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <MintForm
                        nftData={nftData}
                        setNftData={setNftData}
                        handleImageUpload={handleImageUpload}
                    />

                    <div className="mt-8">
                        <MintButton status={status} onClick={handleMint} />
                        {writeHash && (
                            <div className="text-sm text-muted-foreground mb-2 break-all">
                                <p>Transaction Hash:</p>
                                <p>{writeHash}</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
