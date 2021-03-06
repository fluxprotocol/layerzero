import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployFunction: DeployFunction = async function ({
  ethers,
  deployments,
  getNamedAccounts,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const network = await deploy("LayerZeroNetwork", {
    contract: "LayerZeroNetwork",
    from: deployer,
    args: [],
    deterministicDeployment: false,
  });

  console.log("Deployed LayerZeroNetwork: ", network.address);

  const oracle = await deploy("FluxLayerZeroOracle", {
    contract: "FluxLayerZeroOracle",
    from: deployer,
    args: [deployer, deployer],
    deterministicDeployment: false,
  });

  console.log("Deployed FluxLayerZeroOracle: ", oracle.address);
};

export default deployFunction;
deployFunction.tags = ["LayerZeroOracle"];
