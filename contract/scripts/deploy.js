import hre from "hardhat";
async function main() {
    const BaseNFT = await hre.ethers.getContractFactory("BaseNFT");

    // These are the constructor arguments: name and symbol
    const baseNFT = await BaseNFT.deploy();

    console.log("BaseNFT deployed to:", baseNFT.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
