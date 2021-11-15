### `LegendAuction.sol`

``` sol title="imports  | pragma solidity 0.8.4"
import "./LegendSale.sol";
```

```sol title="Internal State Variables"
uint256[3] internal _auctionDurations;

uint256 internal _auctionExtension;

mapping(uint256 => AuctionDetails) internal _auctionDetails; | listingId → auctionDetails

mapping(uint256 => uint256) internal _instantBuyPrice; | listingId → instantBuyPrice

mapping(uint256 => address[]) internal _bidders; | listingId → bidderAddresses

mapping(uint256 => mapping(address => bool)) internal _exists; | listingId → bidderAddress → previousBidExist
```

The **LegendAuction** contract inherits from the [**LegendSale**](./LegendSale) contract to further extend the functionality
of Legend NFT *listings*. This contract acts as a ledger for *auction listings*, recording important data and events during the
lifecycle of a **Legends Marketplace** *auction*.
This contract is inherited by the [**LegendsMarketplace**](../LegendsMarketplace).

<br/>

### Auction Details
---

``` sol title="AuctionDetails"
uint256 duration

uint256 startingPrice

uint256 highestBid

address payable highestBidder

bool isInstantBuy
```

:::note Info

* `duration` &rarr; Amount of time in seconds *auction* listing should run for.
* `startingPrice` &rarr; Minimum price seller will start the auction for.
* `highestBid` &rarr; The current highest bid for an *auction* listing.
* `highestBidder` &rarr; Address which placed the current `highestBid`.
* `isInstantBuy` &rarr; Indicates if an *auction* listing permits *instant buying*.
:::

---
<br/>

## Functions

### _createLegendAuction
---

``` sol title="_createLegendAuction | internal"
_createLegendAuction(address nftContract, uint256 legendId, uint256 duration, uint256 startingPrice, uint256 instantPrice)
```


Creates a new Legend NFT *auction* listing, and changes the state to `Open`.
Called from [**LegendsMarketplace**](../LegendsMarketplace#createlegendauction)


:::tip Note

If the value for `instantPrice` is passed `(0)`, the *auction* listing will **NOT** permit *instant buying*.

:::


### _placeBid
---

``` sol title="_placeBid | internal"
_placeBid(uint256 listingId, uint256 bidAmount)
```


Records a bid placed on a *auction* listing.
Called from [**LegendsMarketplace**](../LegendsMarketplace#placebid).


:::tip Note

If an address has already placed a bid on a particular *auction*, their total bid will be incremented.

:::

:::tip Note

If an *auction* listing has a bid placed within the `_auctionExtension` threshold, the auction
duration will be incremented by the `_auctionExtension` amount.

:::

### _closeAuction
---


``` sol title="_closeAuction | internal"
_closeAuction(uint256 listingId)
```


Records the `highestBidder` & `highestBid` for a *auction* listing, changes the state to `Closed`, then credits the
Legend NFT to the `highestBidder`.
Called from [**LegendsMarketplace**](../LegendsMarketplace#closelisting).

---

<br/>

## Queries

### isExpired
---

``` sol title="isExpired | public"
isExpired(uint256 listingId) → bool
```


Queries whether a *auction* listing is expired or not.

### _shouldExtend
---

``` sol title="_shouldExtend | internal"
_shouldExtend(uint256 listingId) → bool
```


Queries whether a *auction* listing should extend or not.

:::tip Note

An *auction* listing will be extended by the same amount of time that the threshold for extension is. For example:

  * if `_auctionExtension` is set to the equivalent of (10) minutes, and a bid is placed within the final (10) minutes of the auction, the auction will be extended by the equivalent of (10) minutes.

:::

---

<br/>

## Getters

### fetchAuctionDetails
---

``` sol title="fetchAuctionDetails | public"
fetchAuctionDetails(uint256 listingId) → struct LegendAuction.AuctionDetails
```


Implemented in [**LegendsMarketplace**](../LegendsMarketplace#fetchauctiondetails)

### fetchInstantBuyPrice
---

``` sol title="fetchInstantBuyPrice | public"
fetchInstantBuyPrice(uint256 listingId) → uint256
```


Implemented in [**LegendsMarketplace**](../LegendsMarketplace#fetchinstantbuyprice)

### fetchBidders
---

``` sol title="fetchBidders | public"
fetchBidders(uint256 listingId) → address[]
```


Implemented in [**LegendsMarketplace**](../LegendsMarketplace#fetchbidders)

---
<br/>

## Events 

### AuctionExtended
---

``` sol title="AuctionExtended"
AuctionExtended(uint256 listingId, uint256 newDuration)
```

Emitted when an *auction* listing is extended.
[`_placeBid`](#_placebid)





