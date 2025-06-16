import "@nomicfoundation/hardhat-toolbox";
const config = {
    solidity: {
        compilers: [
            {
                version: "0.8.24", // ✅ Match your contract version
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        baseSepolia: {
            url: "BASE_SEPOLIA RPC URL HERE", // Base Sepolia RPC URL (e.g. alchemy or infura)
            accounts: [
                "0fb1c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3", // Replace with your private key, do not use this example key
            ],
        },
    },
    etherscan: {
        apiKey: {
            baseSepolia: "YOUR_API_KEY", // Replace with your actual BASE-SEPOLIA API key
        },
    },
    customChains: [
        {
            network: "baseSepolia",
            chainId: 84532,
            urls: {
                apiURL: "https://api-sepolia.basescan.org/api", // Change it if going to deploy on mainnet
                browserURL: "https://sepolia.basescan.org", // Change it if going to deploy on mainnet
            },
        },
    ],
};

export default config;
// npx hardhat flatten contracts/BaseNFT.sol > flattenedBaseNFT.sol // Flatten the contract for verification
// npx hardhat run scripts/deploy.js --network baseSepolia   // Deploy the contract to Base Sepolia
// npx hardhat verify --network baseSepolia YOURCONTRACTADDRESS  // Verify the contract on Base Sepolia