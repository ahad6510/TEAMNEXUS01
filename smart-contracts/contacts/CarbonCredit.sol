// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCredit is ERC1155, Ownable {
    uint256 public currentId;

    // base URI; token metadata URL pattern: replace {id}
    constructor() ERC1155("https://example.com/api/token/{id}.json") {}

    // Owner (deployer / multisig) mints a specific token id and amount to addr
    function mintCredit(address to, uint256 amount) external onlyOwner returns (uint256) {
        currentId++;
        _mint(to, currentId, amount, "");
        return currentId;
    }

    // Owner can mint more of an existing id (if needed)
    function mintExisting(address to, uint256 id, uint256 amount) external onlyOwner {
        _mint(to, id, amount, "");
    }
}
