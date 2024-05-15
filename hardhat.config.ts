import 'hardhat-typechain'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'

// hardhat.config.js
import { HardhatUserConfig, subtask } from "hardhat/config";

const {
  TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD,
} = require("hardhat/builtin-tasks/task-names");
const path = require("path");

subtask(
    TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD,
    async (
        args: {
          solcVersion: string;
        },
        hre,
        runSuper
    ) => {
      if (args.solcVersion === "0.8.18") {
        const compilerPath = path.join(
            // "/Users/rodia/projects/solidity/cmake-build-debug/solc",
            "/Users/rodia/projects/solidity/build/solc/",
            "solc"
        );

        return {
          compilerPath,
          isSolcJs: false, // if you are using a native compiler, set this to false
          version: args.solcVersion,
          // This is used as extra information in the build-info files,
          // but other than that is not important
          longVersion: "solc",
        };
      }

      // since we only want to override the compiler for version 0.8.24,
      // the runSuper function allows us to call the default subtask.
      return runSuper();
    }
);

// const config: HardhatUserConfig = {
//   solidity: "0.8.24",
// };

// export default config;

export default {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    arbitrumRinkeby: {
      url: `https://arbitrum-rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    arbitrum: {
      url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    optimismKovan: {
      url: `https://optimism-kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    optimism: {
      url: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  solidity: {
    version: '0.8.18',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,
      },
      evmVersion: "shanghai",
      viaIR: true,
      eofVersion: 1,
      metadata: {
        // do not include the metadata hash, since this is machine dependent
        // and we want all generated code to be deterministic
        // https://docs.soliditylang.org/en/v0.7.6/metadata.html
        bytecodeHash: 'none',
      },
    },
  },
}
