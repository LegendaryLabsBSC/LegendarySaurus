## `LegendsMarketplace`





### `onlyLab()`






### `createLegendSale(address nftContract, uint256 legendId, uint256 price)` (external)





### `buyLegend(uint256 listingId)` (external)





### `makeLegendOffer(address nftContract, uint256 legendId)` (external)





### `decideLegendOffer(uint256 listingId, bool isAccepted)` (external)





### `createLegendAuction(address nftContract, uint256 legendId, uint256 durationIndex, uint256 startingPrice, uint256 instantPrice)` (external)





### `placeBid(uint256 listingId)` (external)





### `refundBid(uint256 listingId)` (external)





### `cancelLegendListing(uint256 listingId)` (external)





### `closeListing(uint256 listingId)` (external)





### `collectRoyalties()` (external)





### `_transferPayment(uint256 listingId, bool isBid)` (internal)





### `_claimPayment(uint256 listingId)` (internal)





### `_claimLegend(uint256 listingId)` (internal)





### `_calculateFees(uint256 listingId) → uint256, address payable, uint256` (public)

fees are removed from total price



### `isBidWithdrawable(uint256 listingId, address bidder) → bool` (public)





### `fetchListingCounts() → struct Counters.Counter, struct Counters.Counter, struct Counters.Counter` (public)





### `fetchLegendListing(uint256 listingId) → struct ILegendListing.LegendListing` (public)





### `fetchOfferDetails(uint256 listingId) → struct LegendSale.OfferDetails` (public)





### `fetchAuctionDurations() → uint256[3]` (public)





### `fetchAuctionDetails(uint256 listingId) → struct LegendAuction.AuctionDetails` (public)





### `fetchInstantBuyPrice(uint256 listingId) → uint256` (public)





### `fetchBidders(uint256 listingId) → address[]` (public)





### `fetchMarketplaceRules() → uint256, uint256, uint256, uint256` (public)



Due to contract size limits, made a single getter for state variables in
both {LegendSale} and {LegendAuction} contracts.

### `setMarketplaceRule(uint256 marketplaceRule, uint256 newRuleData)` (public)





### `setAuctionDurations(uint256[3] newAuctionDurations)` (public)

Do not delete below functions until after adding docs to above ;; if still not enough size may just use individual






