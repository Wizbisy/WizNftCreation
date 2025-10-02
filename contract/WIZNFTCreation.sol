// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WIZNFTCreation is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    uint256 public mintPrice = 0.00 ether;

    event Minted(address indexed minter, uint256 indexed tokenId, string tokenURI);
    event Withdrawn(address indexed owner, uint256 amount);
    event MintPriceUpdated(uint256 newPrice);

    constructor() ERC721("WIZ NFT CREATION", "WNC") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mint(string memory tokenURI) public payable returns (uint256) {
        require(msg.value >= mintPrice, "Insufficient ETH sent");
        require(bytes(tokenURI).length > 0, "tokenURI required");

        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        emit Minted(msg.sender, newTokenId, tokenURI);

        tokenCounter += 1;
        return newTokenId;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");

        payable(owner()).transfer(balance);
        emit Withdrawn(owner(), balance);
    }

    function updateMintPrice(uint256 _newPrice) public onlyOwner {
        mintPrice = _newPrice;
        emit MintPriceUpdated(_newPrice);
    }

    function totalSupply() public view returns (uint256) {
        return tokenCounter;
    }
}
