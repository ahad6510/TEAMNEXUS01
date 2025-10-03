// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CarbonToken is ERC20 {
    constructor() ERC20("CarbonToken", "CARB") {
        _mint(msg.sender, 1000 * 10 ** decimals()); // Mint initial supply to deployer
    }
}
