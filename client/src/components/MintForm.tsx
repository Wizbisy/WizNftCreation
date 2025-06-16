"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { NftData } from "./MintinInterface";

interface MintFormProps {
    nftData: NftData;
    setNftData: React.Dispatch<React.SetStateAction<NftData>>;
    handleImageUpload: (file: File) => void;
}

export default function MintForm({
    nftData,
    setNftData,
    handleImageUpload,
}: MintFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNftData({
            ...nftData,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files) {
            const file = e.target.files[0];
            handleImageUpload(file);
        }
    };

    const handleAttributeChange = (
        index: number,
        field: "trait_type" | "value",
        value: string
    ) => {
        const updatedAttributes = [...nftData.attributes];
        updatedAttributes[index] = {
            ...updatedAttributes[index],
            [field]: value,
        };

        setNftData({
            ...nftData,
            attributes: updatedAttributes,
        });
    };

    const addAttribute = () => {
        const newAttributes = [
            ...nftData.attributes,
            { trait_type: "", value: "" },
        ];

        setNftData({
            ...nftData,
            attributes: newAttributes,
        });

        // Animate new attribute field
        setTimeout(() => {
            const newField = document.querySelector(
                ".attribute-field:last-child"
            );
            if (newField) {
                gsap.fromTo(
                    newField,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.3 }
                );
            }
        }, 0);
    };

    const removeAttribute = (index: number) => {
        const attributeToRemove =
            document.querySelectorAll(".attribute-field")[index];

        gsap.to(attributeToRemove, {
            opacity: 0,
            height: 0,
            marginBottom: 0,
            duration: 0.3,
            onComplete: () => {
                const filteredAttributes = nftData.attributes.filter(
                    (_: unknown, i: number) => i !== index
                );
                setNftData({
                    ...nftData,
                    attributes: filteredAttributes,
                });
            },
        });
    };

    return (
        <form className="space-y-6">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={nftData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#121212] border border-gray-800 rounded-lg focus:ring-2 focus:ring-[#0052FF] focus:border-transparent transition-all"
                    placeholder="Enter NFT name"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                    Description
                </label>
                <textarea
                    name="description"
                    value={nftData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        const { name, value } = e.target;
                        setNftData((prev: typeof nftData) => ({
                            ...prev,
                            [name]: value,
                        }));
                    }}
                    rows={4}
                    className="w-full px-4 py-3 bg-[#121212] border border-gray-800 rounded-lg focus:ring-2 focus:ring-[#0052FF] focus:border-transparent transition-all resize-none"
                    placeholder="Describe your NFT"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                    Image
                </label>
                <div
                    onClick={() =>
                        fileInputRef.current && fileInputRef.current.click()
                    }
                    className="w-full h-32 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#0052FF] transition-colors"
                >
                    {nftData.imageUrl ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={nftData.imageUrl || "/placeholder.svg"}
                                alt="NFT Preview"
                                className="w-full h-full object-contain"
                                width={128}
                                height={128}
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                                <p className="text-white text-sm">
                                    Change Image
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-gray-400">
                                Click to upload image
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG, GIF up to 10MB
                            </p>
                        </div>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-300">
                        Attributes
                    </label>
                    <button
                        type="button"
                        onClick={addAttribute}
                        className="text-sm text-[#0052FF] hover:text-[#0052FF]/80 transition-colors"
                    >
                        + Add Attribute
                    </button>
                </div>

                <div className="space-y-3">
                    {nftData.attributes.map(
                        (
                            attr: {
                                trait_type:
                                    | string
                                    | number
                                    | readonly string[]
                                    | undefined;
                                value:
                                    | string
                                    | number
                                    | readonly string[]
                                    | undefined;
                            },
                            index: number
                        ) => (
                            <div
                                key={index}
                                className="attribute-field flex gap-2 items-center"
                            >
                                <input
                                    type="text"
                                    value={attr.trait_type}
                                    onChange={(e) =>
                                        handleAttributeChange(
                                            index,
                                            "trait_type",
                                            e.target.value
                                        )
                                    }
                                    className="flex-1 px-3 py-2 bg-[#121212] border border-gray-800 rounded-lg focus:ring-2 focus:ring-[#0052FF] focus:border-transparent transition-all"
                                    placeholder="Trait Type"
                                />
                                <input
                                    type="text"
                                    value={attr.value}
                                    onChange={(e) =>
                                        handleAttributeChange(
                                            index,
                                            "value",
                                            e.target.value
                                        )
                                    }
                                    className="flex-1 px-3 py-2 bg-[#121212] border border-gray-800 rounded-lg focus:ring-2 focus:ring-[#0052FF] focus:border-transparent transition-all"
                                    placeholder="Value"
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeAttribute(index)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        )
                    )}
                </div>
            </div>
        </form>
    );
}
