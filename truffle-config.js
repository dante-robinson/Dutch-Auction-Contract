require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const privateKey = [process.env.DEPLOYER_KEY];

module.exports = {
  contracts_directory: "./contracts/",
  contracts_build_directory: "./artifacts",
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    mumbai: {
      provider: () => {
        return new HDWalletProvider(
          privateKey,
          `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API}`
        );
      },
      network_id: 80001,
    },
  },
  compilers: {
    solc: {
      version: "^0.8.12",
      enabled: true,
      runs: 200000,
    },
  },
};
