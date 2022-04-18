require("chai").use(require("chai-as-promised")).should();
const WTIAAuction = artifacts.require("WTIAAuction.sol");
const Token = artifacts.require("Token.sol");

contract("Auction", (accounts) => {
  let auction;
  let token;
  before(async () => {
    auction = await WTIAAuction.deployed();
    token = await Token.deployed();
  });
  describe("Token", () => {
    it("approves tokens for contract to use", async () => {
      await token.approve(auction.address, 20);
      assert.equal(await token.allowance(accounts[0], auction.address), 20);
    });
  });
  describe("Auction", () => {
    it("Can create a new Auction", async () => {
      await auction.createAuction(604800, 20, token.address, 20);
      assert.equal(await auction.getPrice(), 20);
      assert.equal(await token.balanceOf(auction.address), 20);
    });
    it("Prevents the owner from bidding", async () => {
      await auction
        .placeBid({
          from: accounts[0],
          value: 20,
        })
        .should.be.rejectedWith(
          "VM Exception while processing transaction: revert"
        );
    });
    it("Allows a user to bid and checks user was paid", async () => {
      await auction.placeBid({
        from: accounts[1],
        value: 20,
      });
      // Since everything is done in one function everything is in 1 test
      assert.equal(await token.balanceOf(auction.address), 0);
      assert.equal(await token.balanceOf(accounts[1]), 20);
    });
    it("Checks expired function can be called when price is 0", async () => {
      // Deploy new contract
      let auctionTwo = await WTIAAuction.new();

      // Approve 20 tokens for new contract
      await token.approve(auctionTwo.address, 20);

      // Set balance on createAuction to 0
      await auctionTwo.createAuction(604800, 0, token.address, 20);
      assert.equal(await auctionTwo.getPrice(), 0);
      assert.equal(await token.balanceOf(auctionTwo.address), 20);

      await auctionTwo.expired({ from: accounts[0] });
      assert.equal(await token.balanceOf(auctionTwo.address), 0);
    });
  });
});
