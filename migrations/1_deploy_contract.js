let WTIAAuction = artifacts.require("WTIAAuction");
let Token = artifacts.require("Token");

module.exports = function (deployer) {
  deployer.deploy(WTIAAuction);
  // Comment out the deploy Token line when deploying to main-net only needed for tests
  deployer.deploy(Token);
};
