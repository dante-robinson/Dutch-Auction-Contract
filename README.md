# Dutch Auction Contract

This is a basic Dutch Auction that can be used as a template if you feel like by forking the repo.

## How it works

This auction works by deploying a new smart contract for each separate auction. Once the contract is deployed the user will need to first approve the tokens to be spent externally (Should be set up through a UI calling the .approve function in the provided smart contract address). Then the user will need to run the createAuction() function to add the tokens to the smart contract. The price will be adjusted automatically for the time given and a potential buyer can sell the price by calling the getPrice() function. The buyer can then use that price as the value when they call placeBid(). placeBid() will immediately hand the ERC20 tokens to the buyer and the ETH to the auction creator. The contract is then useless as another auction cannot be created with it.
