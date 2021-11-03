## `LegendAuction`






### `_createLegendAuction(address nftContract, uint256 legendId, uint256 duration, uint256 startingPrice, uint256 instantPrice)` (internal)





### `_placeBid(uint256 listingId, uint256 bidAmount)` (internal)





### `_closeAuction(uint256 listingId)` (internal)





### `isExpired(uint256 listingId) → bool` (public)





### `_shouldExtend(uint256 listingId) → bool` (internal)





### `fetchAuctionDurations() → uint256[3]` (public)



Getters implemented in parent contract LegendsMarketplace

### `fetchAuctionDetails(uint256 listingId) → struct LegendAuction.AuctionDetails` (public)





### `fetchInstantBuyPrice(uint256 listingId) → uint256` (public)





### `fetchBidders(uint256 listingId) → address[]` (public)






### `AuctionExtended(uint256 listingId, uint256 newDuration)`





### `BidPlaced(uint256 listingId, address newHighestBidder, uint256 newHighestBid)`






### `AuctionDetails`


uint256 duration


uint256 startingPrice


uint256 highestBid


address payable highestBidder


bool isInstantBuy



