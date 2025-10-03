async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const Carbon = await ethers.getContractFactory("CarbonCredit");
  const carbon = await Carbon.deploy();
  await carbon.deployed();

  console.log("CarbonCredit deployed to:", carbon.address);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
