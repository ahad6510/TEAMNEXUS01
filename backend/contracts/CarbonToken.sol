// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonToken is ERC20, Ownable {
    
    // Mapping projectId => verified carbon (in tons)
    mapping(uint256 => uint256) public projectCarbonCredits;

    // Event when credits are issued
    event CreditsIssued(uint256 indexed projectId, address indexed to, uint256 amount);

    // Fixed constructor: pass msg.sender to Ownable
    constructor() ERC20("CarbonToken", "CBT") Ownable(msg.sender) {}

    /**
     * @dev Mint tokens to a user representing verified carbon credits
     * @param projectId The ID of the verified project
     * @param to Recipient address
     * @param amount Number of tokens (1 token = 1 ton CO2)
     */
    function mintCredits(uint256 projectId, address to, uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than 0");
        _mint(to, amount);
        projectCarbonCredits[projectId] += amount;
        emit CreditsIssued(projectId, to, amount);
    }

    /**
     * @dev Get total carbon credits issued for a project
     */
    function getProjectCredits(uint256 projectId) external view returns (uint256) {
        return projectCarbonCredits[projectId];
    }
}
