// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BackerMint is ERC721URIStorage, Ownable {
    uint256 public nextTokenId = 1;
    mapping(address => uint256) public totalDonated;
    mapping(uint256 => uint256) public mintCount;

    event Donated(address indexed backer, uint256 amount, uint256 tokenId);
    event Minted(address indexed minter, uint256 tokenId, uint256 reward);

    constructor() ERC721("BackerNFT", "BNFT") Ownable(msg.sender) {}

    function donate(string calldata metadataURI) external payable {
        require(msg.value > 0, "No donation sent");

        totalDonated[msg.sender] += msg.value;
        uint256 tokenId = nextTokenId++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, metadataURI);

        emit Donated(msg.sender, msg.value, tokenId);
    }

    function mintFromBacker(address backer, uint256 tokenId) external {
        require(ownerOf(tokenId) == backer, "Token not owned by backer");

        mintCount[tokenId] += 1;

        uint256 reward = totalDonated[backer] / 100;
        require(address(this).balance >= reward, "Insufficient balance");

        payable(msg.sender).transfer(reward);
        emit Minted(msg.sender, tokenId, reward);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function contractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
