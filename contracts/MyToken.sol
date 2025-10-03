// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyToken is ERC721 {
    uint public tokenCounter;

    constructor() ERC721("MyToken", "MTK") {
        tokenCounter = 0;
    }

    function mint(address to) public {
        _safeMint(to, tokenCounter);
        tokenCounter++;
    }
}
