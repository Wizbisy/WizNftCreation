
# Base NFT Collection

A modern, full-stack NFT Minting Dapp built with [Next.js](https://nextjs.org/) for the [Base Network](https://base.org/).  
This project allows users to mint NFTs with custom metadata and images, storing assets on IPFS via Pinata.

---

## Table of Contents

-   [Features](#features)
-   [Project Structure](#project-structure)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Clone the Repository](#clone-the-repository)
-   [Client (Next.js Dapp)](#client-nextjs-dapp)
    -   [Setup & Running Locally](#setup--running-locally)
    -   [Environment Variables](#environment-variables)
-   [Customization](#customization)
-   [Contributing](#contributing)
-   [License](#license)

---

## Features

-   ERC721 NFT contract with metadata and image support
-   Mint NFTs with custom attributes and images
-   IPFS integration via Pinata for decentralized storage
-   Wallet connection and ETH balance check
-   Modern UI with Tailwind CSS and shadcn/ui
-   Ready for deployment on Base Sepolia or Base Mainnet

---

## Project Structure

```
client/      # Next.js frontend Dapp
  src/
    app/
    components/
    config/
    utils/
  public/
  ...
contract/   
  WIZNFTCreation.sol
```

---

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18+ recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [Pinata](https://pinata.cloud/) account for IPFS storage
-   [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/) for Base RPC endpoints

### Clone the Repository

```bash
git clone https://github.com/Wizbisy/MintNFTDapp.git
cd MintNFTDapp
```

---

## Client (Next.js Dapp)

### Setup & Running Locally

1. **Install dependencies:**

    ```bash
    cd client
    npm install
    ```

2. **Configure Environment Variables:**

    Update `next.config.ts` file in the `client` directory:

    ```
    NEXT_PUBLIC_PROJECT_ID=your_reown_project_id
    NEXT_PINATA_JWT=your_pinata_jwt
    NEXT_PINATA_GATEWAY_URL=https://gateway.pinata.cloud/ipfs
    NEXT_PINATA_BASE_URL=https://gateway.pinata.cloud/ipfs
    ```

    - Replace the values with your actual API keys and endpoints.
    - **Check for comments in the codebase for other places to update contract addresses or API keys.**

3. **Start the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Customization

-   **Contract Address:**  
    Update the contract address and ABI in `client/src/utils/constant.ts` after deployment.

-   **Network Configuration:**  
    Update supported networks in `client/src/config/wagmiConfig.ts` and `client/src/config/Wagmi.tsx` as needed.

-   **Pinata Integration:**  
    The Pinata upload logic is in [`src/utils/IPFS.ts`](client/src/utils/IPFS.ts).  
    Make sure your JWT and gateway URLs are correct.

-   **UI/UX:**  
    The main minting interface is in [`src/components/MintinInterface.tsx`](client/src/components/MintinInterface.tsx) and [`src/components/MintForm.tsx`](client/src/components/MintForm.tsx).

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

-   [Next.js](https://nextjs.org/)
-   [TailwindCss](https://tailwindcss.com/)
-   [Reown](https://reown.com/)
-   [OpenZeppelin](https://openzeppelin.com/)
-   [Pinata](https://pinata.cloud/)
-   [Sepolia Base Network](https://sepolia.basescan.org/)
-   
