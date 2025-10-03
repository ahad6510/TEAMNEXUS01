const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CarbonToken", function () {
  let Token, token, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("CarbonToken");
    token = await Token.deploy();
    await token.deployed();
  });

  it("Should assign total supply to owner", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    const totalSupply = await token.totalSupply();
    expect(ownerBalance).to.equal(totalSupply);
  });

  it("Should transfer tokens correctly", async function () {
    await token.transfer(addr1.address, 100);
    const addr1Balance = await token.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(100);
  });

  it("Should fail if sender doesn’t have enough tokens", async function () {
    // addr1 has 0 tokens
    await expect(
      token.connect(addr1).transfer(addr2.address, 50)
    ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
  });

  it("Should update balances after transfers", async function () {
    const initialOwnerBalance = await token.balanceOf(owner.address);

    await token.transfer(addr1.address, 100);
    await token.transfer(addr2.address, 50);

    const finalOwnerBalance = await token.balanceOf(owner.address);
    const addr1Balance = await token.balanceOf(addr1.address);
    const addr2Balance = await token.balanceOf(addr2.address);

    expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));
    expect(addr1Balance).to.equal(100);
    expect(addr2Balance).to.equal(50);
  });
});
