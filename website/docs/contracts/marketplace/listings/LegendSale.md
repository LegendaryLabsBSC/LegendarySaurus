### `LegendSale.sol`

``` sol title="imports  | pragma solidity 0.8.4"
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ILegendListing.sol";
```

```sol title="isValidListing | modifier"
isValidListing(uint256 listingId); → listingId must exist
```

```sol title="Internal State Variables"
Counters.Counter internal _listingIds;

Counters.Counter internal _listingsClosed;

Counters.Counter internal _listingsCancelled;

uint256 internal _offerDuration;

mapping(uint256 => LegendListing) internal _legendListing; | listingId → listingDetails

mapping(uint256 => OfferDetails) internal _offerDetails; | listingId → offerDetails

mapping(uint256 => mapping(address => uint256)) internal _legendPending; | listingId → buyerAddress → legendId
```


The **LegendSale** contract inherits from [**ILegendListing**](./ILegendListing) to define Legend NFT marketplace listing.
This contract acts as a ledger for *sale listings* & *offer listings*, recording important data and events during the
lifecycle of these listing types.
This contract is inherited by the [**LegendAuction**](./LegendAuction) contract.

:::tip Note

Counters initialized in *this* contract are used for all (3) marketplace listing types.

:::

<br/>

### Offer Details
---

``` sol title="OfferDetails"
uint256 expirationTime

address payable legendOwner

bool isAccepted
```

:::note Info

* `expirationTime` &rarr; *Offer listing's* creation `block.timestamp` + `_offerDuration`.
* `legendOwner` &rarr; Address that owns the Legend NFT.
* `isAccepted` &rarr; Indicates if an *offer* listing is accepted or not.
:::

---
<br/>

## Functions

### _createLegendSale
---

``` sol title="_createLegendSale | internal"
_createLegendSale(address nftContract, uint256 legendId, uint256 price)
```

Creates a new Legend NFT *sale* listing, and changes the state to `Open`.
Called from [**LegendsMarketplace**](../LegendsMarketplace#createlegendsale).

### _buyLegend
---

``` sol title="_buyLegend | internal"
_buyLegend(uint256 listingId)
```


Changes the state of a *sale* listing to `Closed`, and credits the Legend NFT to the buyer.
Called from [**LegendsMarketplace**](../LegendsMarketplace#buylegend).

### _makeLegendOffer
---

``` sol title="_makeLegendOffer | internal"
_makeLegendOffer(address nftContract, address payable legendOwner, uint256 legendId) → uint256
```

Creates a new Legend NFT *offer* listing and returns the listing ID.
Called from [**LegendsMarketplace**](../LegendsMarketplace#makelegendoffer).

### _decideLegendOffer
---

``` sol title="_decideLegendOffer | internal"
_decideLegendOffer(uint256 listingId, bool isAccepted)
```


Records whether an *offer* listing is accepted or rejected by the Legend NFT's owner. Called from [**LegendsMarketplace**](../LegendsMarketplace#decidelegendoffer)

:::important 

If the offer is accepted, the state of the *offer* listing is changed to `Closed` and the address
which placed the *offer* listing is credited the Legend NFT.

If the offer is rejected, the state of the *offer* listing is changed to `Cancelled`.

:::

### _cancelLegendListing
---

``` sol title="_cancelLegendListing | internal"
_cancelLegendListing(uint256 listingId)
```

Changes the state of a marketplace listing to `Cancelled`. Used by all marketplace listing types.
Called from [**LegendsMarketplace**](../LegendsMarketplace#cancellegendlisting).

---

<br/>

## Getters


### fetchListingCounts
---

``` sol title="fetchListingCounts | public"
fetchListingCounts() → struct Counters.Counter, struct Counters.Counter, struct Counters.Counter
```


Implemented in [**LegendsMarketplace**](../LegendsMarketplace#fetchlistingcounts)

### fetchOfferDetails
---

``` sol title="fetchOfferDetails | public"
fetchOfferDetails(uint256 listingId) → struct LegendSale.OfferDetails
```

Implemented in [**LegendsMarketplace**](../LegendsMarketplace#fetchofferdetails)

---
<br/>

## Events 


### OfferMade
---

``` sol title="OfferMade"
OfferMade(uint256 listingId, uint256 price)
```


Emitted when an *offer* is placed on a Legend NFT.
[`makeLegendOffer`](../LegendsMarketplace#makelegendoffer)

### OfferDecided
---

``` sol title="OfferDecided"
OfferDecided(uint256 listingId, bool isAccepted)
```


Emitted when an *offer* listing is either accepted or rejected.
[`decidelegendoffer`](../LegendsMarketplace#decidelegendoffer)





