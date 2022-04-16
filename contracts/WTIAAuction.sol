// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract WTIAAuction {
  using SafeMath for uint256;

  struct Auction {
    // block.timestamp returns uint hence dates are in uint
    uint256 startDate;
    uint256 endDate;
    uint256 startPrice;
    address creator;
  }

  mapping(uint256 => Auction) public Auctions;

  /* ID would be passed through the UI or could be kept track adding a sperate variable
  _endDate would be passed through UI as the time in seconds to be directly added to
  current time an example of this would be 3600 for 1 Hour */
  function createAuction(uint256 id, uint256 _endDate, uint256 _startPrice) public {
    Auctions[id] = Auction(block.timestamp, (block.timestamp.add(_endDate)), _startPrice, msg.sender);
  }

  // Refreshes every second
  function getPrice(uint256 _id) public view returns (uint256) {
    uint256 startPrice = uint256(Auctions[_id].startPrice);
    uint256 startDate = uint256(Auctions[_id].startDate);
    uint256 timeDifference = uint256(Auctions[_id].endDate.sub(startDate)); // Total time difference
    uint256 slope = uint256(startPrice.div(timeDifference)); // Cost to decrease per second
    uint256 currentTime = uint256(block.timestamp); // Current Time
    uint256 timePassed = uint256(currentTime.sub(startDate)); // Time in seconds since
    uint256 priceDecreased = uint256(slope.mul(timePassed));
    uint256 price = uint256(startPrice.sub(priceDecreased));
    return uint256(price);
  }
}
