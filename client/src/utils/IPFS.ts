/* eslint-disable @typescript-eslint/no-explicit-any */
import { PinataSDK } from "pinata-web3";
import { v4 as uuidv4 } from "uuid";
const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PINATA_JWT,
    pinataGateway: process.env.NEXT_PINATA_GATEWAY_URL,
});
interface AllCollections {
    publicKey: string;
    uri: string;
}

// Function to upload a single file
const uploadFileToPinata = async (file: File) => {
    try {
        const uploadResponse = await pinata.upload.file(file, {
            metadata: {
                name: uuidv4(),
            },
        });
        console.log("File uploaded successfully:", uploadResponse);
        return uploadResponse; // Return the upload response for further use
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// Function to upload metadata JSON
const uploadMetadataToPinata = async (metadata: object) => {
    try {
        const uploadResponse = await pinata.upload.json(metadata, {
            metadata: {
                name: uuidv4(),
            },
        });
        console.log("Metadata uploaded successfully:", uploadResponse);
        return uploadResponse; // Return the upload response for further use
    } catch (error) {
        console.error("Error uploading metadata:", error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// Function to get from Pinata
const getIPFS = async (cid: string) => {
    try {
        const data = await pinata.gateways.get(cid);
        return data;
    } catch (error) {
        return error;
    }
};

const getIPFSImage = async (allCollections: AllCollections[]) => {
    try {
        const urls: { [key: string]: string } = {};
        await Promise.all(
            allCollections.map(async (collection: AllCollections) => {
                const dataCid = collection?.uri.split("ipfs/")[1];
                // console.log("dataCid", dataCid);
                const ipfsData: any = await pinata.gateways.get(dataCid);
                const imageCid = ipfsData?.data?.image?.split("ipfs/")[1];
                urls[collection.publicKey] = imageCid;
            })
        );
        return urls;
    } catch (error) {
        console.log("GetIPFSImage Error", error);
        return error;
    }
};

export { uploadFileToPinata, uploadMetadataToPinata, getIPFS, getIPFSImage };
