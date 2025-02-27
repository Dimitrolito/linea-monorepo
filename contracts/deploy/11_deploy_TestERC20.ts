import { ethers, network } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getRequiredEnvVar, tryVerifyContract, tryStoreAddress, getDeployedContractAddress } from "../common/helpers";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre;

  const contractName = "TestERC20";
  const existingContractAddress = await getDeployedContractAddress(contractName, deployments);

  const tokenName = getRequiredEnvVar("TEST_ERC20_NAME");
  const tokenSymbol = getRequiredEnvVar("TEST_ERC20_SYMBOL");
  const initialSupply = getRequiredEnvVar("TEST_ERC20_INITIAL_SUPPLY");

  if (!existingContractAddress) {
    console.log(`Deploying initial version, NB: the address will be saved if env SAVE_ADDRESS=true.`);
  } else {
    console.log(`Deploying new version, NB: ${existingContractAddress} will be overwritten if env SAVE_ADDRESS=true.`);
  }

  const TestERC20Factory = await ethers.getContractFactory(contractName);
  const contract = await TestERC20Factory.deploy(tokenName, tokenSymbol, ethers.parseEther(initialSupply));

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  const deployTx = contract.deploymentTransaction();
  if (!deployTx) {
    throw "Deployment transaction not found.";
  }

  await tryStoreAddress(network.name, contractName, contractAddress, deployTx.hash);

  const chainId = (await ethers.provider.getNetwork()).chainId;
  console.log(`${contractName} deployed on ${network.name}, chainId=${chainId}, at address: ${contractAddress}`);
  await tryVerifyContract(contractAddress);
};

export default func;
func.tags = ["TestERC20"];
