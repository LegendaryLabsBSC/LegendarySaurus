### `LegendsMarketplace.sol`

``` sol title="imports  | pragma solidity 0.8.4"
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../lab/LegendsLaboratory.sol";
import "./escrow/LegendsMarketClerk.sol";
import "./listings/LegendAuction.sol";
```

```sol title="onlyLab | modifier"
onlyLab(); →  only LegendsLaboratory Contract can call
```

```sol title="Private State Variables"
uint256 private _royaltyFee;

uint256 private _marketplaceFee;

mapping(uint256 => bool) private _paymentTransferred; | listingId → isPaymentTransferred
```

The **LegendMarketplace** contract establishes a marketplace for Legend NFTs to be traded utilizing various listing types. This contracts inherits [**LegendAuction**](./listings/LegendAuction) to implement marketplace *listings*. This contract also inherits [**LegendsMarketClerk**](./escrow/LegendsMarketClerk), which deploys and manages the [**LegendsEscrow**](./escrow/LegendsEscrow) contract isolated from the rest of the **Legendary Labs** contracts.

! talk about how fees royalties work

:::important


All payments made on **Legendary Labs Marketplace** are sent to and held by the **LegendsEscrow** contract. These payments can only be released by the appropriate address when valid conditions are met. 

:::

<br/>

### Listing Types
---

:::important Sale:

A `Sale` is the base marketplace listing type of the **Legends Marketplace**. The listing is created by the current Legend NFT owner (`seller`), with a fixed price. 

Once a *payment* has been made on this listing, and sent to the [**LegendsEscrow**](./escrow/LegendsMarketClerk#_asynctransfer), it is closed and the `buyer`'s *payment* is immediately *credited* to the `seller`'s address.

A `Sale` can be cancelled at anytime by the `seller` so long as the listing is `Open`.

:::

:::important Offer:

An `Offer` is an extension of the `Sale` listing type. This listing is created by the prospective Legend NFT owner (`buyer`), as opposed to the current Legend NFT owner (`seller`). 

When an *offer* is created the *payment* sent by the `buyer` is treated similar to an *auction* bid by the [**LegendsEscrow**](./escrow/LegendsMarketClerk#_asynctransferbid). The *payment* will be *credited* to the `buyer`/`payer` rather than the `seller`/`payee`, but will not be withdrawable. 

If the *offer* is rejected by the `legendOwner` then the listing with be cancelled and the `buyer` will be permitted to [withdraw](#refundbid) their bid.

If the *offer* is accepted by the `legendOwner` the [**LegendsEscrow**](./escrow/LegendsEscrow#depositpayment) will transfer the *credit* owed to the `buyer` to the `seller`. The `buyer`'s *credit* for the particular *offer* will be set to `(0)`.

And *offer* has only (1) set duration, which is set by a **Legendary Labs** `LAB_TECH`. If this duration is reached before the `legendOwner` makes a [decision](#decidelegendoffer) on the *offer*, the the `legendOwner` will no longer be able to call `decideLegendOffer` and the `buyer` will be permitted to call [`cancelLegendListing`](#cancellegendlisting).

A `Offer` can be cancelled at anytime by the `buyer` so long as the listing is `Open`.

:::

:::important Auction:

An `Auction` is an extension of the `Sale` listing type. The listing is created by the current Legend NFT owner (`seller`), but does not include a fixed price. 

Instead a `startingPrice` is set, and at the discretion of the `seller`, an `instantBuyPrice`. The `seller` will also be allowed to set the *auction* to run for (1) of (3) *auction* durations.


Bids are placed on *auction* listings and the *payments* will be *credited* to the `bidder`/`payer` by the [**LegendsEscrow**](./escrow/LegendsMarketClerk#_asynctransferbid) rather than the `seller`/`payee`, but will not be withdrawable. 

If an *auction* is won, or a `instantBidPrice` met, the [**LegendsEscrow**](./escrow/LegendsEscrow#depositpayment) will transfer the *credit* owed to the `highestBidder` to the `seller`. The `highestBidders`'s *credit* for the particular *auction* will be set to `(0)`.

`Auction` durations will be extended if a bid is placed within the `_auctionExtension` threshold.

A `Auction` can be cancelled by the `seller` **ONLY** if (0) bids have been placed on the listing.

:::

---

<br/>

## Functions

### createLegendSale
---

> *List Your Legend NFT On The Marketplace*

<br/>

``` sol title="createLegendSale | external | nonReentrant"
createLegendSale(address nftContract, uint256 legendId, uint256 price)
```

Creates a new *sale* listing. Calls [`_createLegendSale`](./listings/LegendSale#_createlegendsale).


:::caution Requirements:

* Legend must be considered [*listable*](../lab/LegendsLaboratory#islistable)
* `price` must not be `(0)`

:::

:::tip Note

Calling this function will transfer the listed Legend NFT to this contract.

:::

### buyLegend
---

> *Buy A Legend NFT From The Marketplace*

<br/>

``` sol title="buyLegend | external | nonReentrant"
buyLegend(uint256 listingId)
```

Purchases a *sale* listing. Calls [`_buyLegend`](./listings/LegendSale#_buylegend).


:::caution Requirements:

* Listing must be `Open`
* `msg.sender` must not be the seller
* `msg.value` must be the correct price

:::

### makeLegendOffer
---

> *Make An Offer On A Legend NFT*

<br/>


``` sol title="makeLegendOffer | external | nonReentrant"
makeLegendOffer(address nftContract, uint256 legendId)
```

Creates a new *offer* listing. Calls [`_makeLegendOffer`](./listings/LegendSale#_makelegendoffer).


:::caution Requirements:

* `msg.sender` must not be owner of Legend NFT
* Legend must be considered [*hatched*](../lab/LegendsLaboratory#ishatched)
* `price` must not be `(0)`

:::


:::tip Note

Payment is stored in the **LegendsEscrow** contract as a bid, until a decision has been made on the *offer* or it expires.

:::

### decideLegendOffer
---

> *Accept Or Reject An Offer For Your Legend NFT*

<br/>


``` sol title="decideLegendOffer | external | nonReentrant"
decideLegendOffer(uint256 listingId, bool isAccepted)
```

Allows the owner of an Legend NFT to accept or reject an *offer* made on their NFT. Calls  [`_decideLegendOffer`](./listings/LegendSale#_decidelegendoffer).

:::caution Requirements:

* Listing must be `Open`
* Offer must not be expired
* Legend NFT owner must be the same address the offer was originally made for

:::

:::tip Note

If the *offer* is rejected the address which placed the *offer* will be allowed to withdraw their bid.

:::

:::tip Note

If the *offer* is accepted the Legend NFT will be transferred to *this* contract.

:::

:::tip Note

If the Legend NFT owner does not wish to pay any gas in order to reject the *offer*, they can just simply allow it to expire. The address which placed the *offer* will be permitted to withdraw their bid once the *offer* has expired.

:::

### createLegendAuction
---

> *Create An Auction For Your Legend NFT On The Marketplace*

<br/>


``` sol title="createLegendAuction | external | nonReentrant"
createLegendAuction(address nftContract, uint256 legendId, uint256 durationIndex, uint256 startingPrice, uint256 instantPrice
```

Creates a new *auction* listing. Calls [`_createLegendAuction`](./listings/LegendAuction#_createlegendauction).


:::caution Requirements:

* Legend must be considered [*listable*](../lab/LegendsLaboratory#islistable)
* `startingPrice` must not be `(0)`
* IF `instantPrice` is not `(0)`, `instantPrice` must be greater than `startingPrice`
* `durationIndex` must not be outside of the allowed parameters

:::


:::tip Note

Calling this function will transfer the listed Legend NFT to *this* contract.

:::

### placeBid
---

> *Bid On A Legend NFT Auction*

<br/>


``` sol title="placeBid | external | nonReentrant"
placeBid(uint256 listingId)
```

Places a bid on an *auction* listing. Calls [`_placeBid`](./listings/LegendAuction#_placebid).


:::caution Requirements:

* Listing must be `Open`
* Listing must not be expired
* `msg.sender` must not be seller
* IF there have been (0) previous bids, bid must not be less than `startingPrice` ; ELSE
the bid must be greater then the current `highestBid`

:::

:::important

When a new bid is placed on an *auction*, the bidder is assigned as the new `highestBidder` and the
previous `highestBidder` is permitted to withdraw their funds.

:::

:::tip Note

If an address is outbid, they are able to submit an additional bid that will increment their existing bid total. Any address that has placed a bid on a particular *auction*, and is not the current `highestBidder` is permitted to withdraw their bid at any time.

:::

:::tip Note

If *instant buying* is permitted for the given *auction* and the bid placed meets or exceeds the `instantBuyPrice`
the *auction* will be closed, regardless of remaining duration, and the bidder will win the *auction*.

:::

### refundBid
---

> *Withdraw A Bid Made On The Marketplace*

<br/>

``` sol title="refundBid | external | nonReentrant"
refundBid(uint256 listingId)
```

Withdraws a bid placed on an *auction* or *offer* listing. Calls [`_refundBid`](./escrow/LegendsMarketClerk#_refundbid).

:::caution Requirements:

* Caller must be authorized to withdraw the bid

:::


### cancelLegendListing
---

> *Cancel Your Marketplace* listing

<br/>

``` sol title="cancelLegendListing | external | nonReentrant"
cancelLegendListing(uint256 listingId)
```

Cancels a marketplace listing, of any type. Calls [`_cancelLegendListing`](./listings/LegendSale#_cancellegendlisting).


:::caution Requirements:

* Listing must be `Open`
* IF listing is an *offer*, `msg.sender` must be `buyer`; ELSE `msg.sender` must be `seller`
* IF listing is an *auction*, there must be (0) bids placed on the listing

:::


:::tip Note

Cancelling a *sale* or *auction* will transfer the NFT back to the owner.
*Offer listings*  will need to call `refundBid` to transfer back their bid.

:::

### closeListing
---

> *Close A Marketplace Listing And Claim Your NFT or Payment*

<br/>


``` sol title="closeListing | external | nonReentrant"
closeListing(uint256 listingId)
```

Closes a marketplace listing.


:::caution Requirements:

* `msg.sender` must be either the `seller`, `buyer`, or `highestBidder`
* IF listing is an *auction*, IF the *auction* is `Open`, *auction* must be expired; ELSE the listing must be `Closed`

:::

:::tip Note

If the listing is an *auction* and is `Open`, [`_closeAuction`](./listings/LegendAuction#_closeauction) will be called.

:::

:::tip Note

If the listing being closed is an *auction* or *offer*, the `highestBidder` or `buyer` bid will be transferred to the `seller` of the Legend NFT via [`_transferPayment`](#_transferpayment). 

This action can only occur once per listing, but will occur regardless of which party (`seller`, `buyer`, `highestBidder`) is the first to call `closeListing`.

:::

:::tip Note

If the `msg.sender` is the seller, [`_withdrawPayments`](./escrow/LegendsMarketClerk#_withdrawpayments) will then be called. 

If the `msg.sender` is the buyer, [`_claimLegend`](#_claimlegend) will then be called.

:::


### collectRoyalties
---

> *Withdraw Your Accumulated Royalties*

<br/>


``` sol title="collectRoyalties | external | nonReentrant"
collectRoyalties()
```

Checks if *royalties* can be collected, if so calls [`_withdrawRoyalties`](./escrow/LegendsMarketClerk#_withdrawroyalties).


:::caution Requirements:

* Royalties accrued must not be `(0)`

:::

### _transferPayment
---

``` sol title="_transferPayment | internal"
_transferPayment(uint256 listingId, bool isBid)
```

Routes a payment or winning-bid made on a marketplace listing through the appropriate escrow call.


:::tip Note

Any applicable marketplace and royalty fees will be calculated during this call, via [`_calculateFees`](#_calculatefees).

:::

### _claimLegend
---

``` sol title="_claimLegend | internal"
_claimLegend(uint256 listingId)
```

Transfers the purchased Legend NFT to the buyer.


:::caution Requirements:

* Legend NFT must not already be claimed

:::

### _calculateFees
---

``` sol title="_calculateFees | public"
_calculateFees(uint256 listingId) → uint256, address payable, uint256
```

Returns any applicable marketplace fee amount, original Legend NFT creator address, and royalties fee amount.


:::important

Fees will be deducted from total price payed.

:::

:::tip

If the Legend NFT was not created via *blending*, royalties will not be deducted.

Additionally, if the buyer is the original creator of the Legend NFT, royalties will not be deducted
and sent to the buyer address.

:::

---

<br/>

## Queries

### isBidWithdrawable
---

``` sol title="isBidWithdrawable | public"
isBidWithdrawable(uint256 listingId, address bidder) → bool
```

Queries whether a bidder is permitted to withdraw their bid or not.

---

<br/>

## Getters

### fetchListingCounts
---

``` sol title="fetchListingCounts | public"
fetchListingCounts() → struct Counters.Counter, struct Counters.Counter, struct Counters.Counter
```

Returns the counts for `_listingIds`, `_listingsClosed`, & `_listingsCancelled`.

### fetchLegendListing
---

``` sol title="fetchLegendListing | public | isValidListing(listingId)"
fetchLegendListing(uint256 listingId) → struct ILegendListing.LegendListing
```

Returns the details of a marketplace listing.

### fetchOfferDetails
---

``` sol title="fetchOfferDetails | public"
fetchOfferDetails(uint256 listingId) → struct LegendSale.OfferDetails
```


Returns an *offer's* additional listing details.


:::caution Requirements:

* Must be an *offer* listing

:::

### fetchAuctionDetails
---

``` sol title="fetchAuctionDetails | public"
fetchAuctionDetails(uint256 listingId) → struct LegendAuction.AuctionDetails
```


Returns an *auction's* additional listing details.


:::caution Requirements:

* Must be an *auction* listing

:::

### fetchInstantBuyPrice
---

``` sol title="fetchInstantBuyPrice | public"
fetchInstantBuyPrice(uint256 listingId) → uint256 
```


Returns an *auction listing's* instant buy price.


:::caution Requirements:

* *Auction* must permit *instant buying*

:::

### fetchBidders
---

``` sol title="fetchBidders | public"
fetchBidders(uint256 listingId) → address[]
```


Returns an array of addresses that have bid on a given *auction* listing.


:::caution Requirements:

* Must be an *auction* listing

:::

### fetchMarketplaceRules
---

``` sol title="fetchMarketplaceRules | public"
fetchMarketplaceRules() → uint256, uint256, uint256, uint256, uint256[3]
```


Returns the values of the (5) *marketplace rules*

:::note Info

#### Marketplace Rules:

* `_royaltyFee`
* `_marketplaceFee`
* `_baseBlendingCost`
* `_auctionExtension`
* `_auctionDurations`

:::

---

<br/>

## Setters

### setMarketplaceRule
---

``` sol title="setMarketplaceRule | public | onlyLab"
setMarketplaceRule(uint256 marketplaceRule, uint256 newRuleData)
```


Function only callable by [**LegendsLaboratory**](../lab/LegendsLaboratory#setmarketplacerule).

### setAuctionDurations
---

``` sol title="setAuctionDurations | public | onlyLab"
setAuctionDurations(uint256[3] newAuctionDurations)
```


Function only callable by [**LegendsLaboratory**](../lab/LegendsLaboratory#setauctiondurations).

---

<br/>

## Admin Restricted Functions

### withdrawMarketplaceFees
---

``` sol title="withdrawMarketplaceFees | public | onlyLab"
withdrawMarketplaceFees()
```


Function only callable by [**LegendsLaboratory**](../lab/LegendsLaboratory#withdrawmarketplacefees).



---
<br/>

## Terminology
---

* *Sale* &rarr; The base listing type for a the **Legendary Labs Marketplace**, a traditional marketplace listing.
* *Offer* &rarr; A marketplace listing where the prospective buyer initiates the listing, rather than the seller.
* *Auction* &rarr; A marketplace listing where multiple parties bid to purchase the NFT.
* *Instant Buy* &rarr; A set price for an *auction* to be closed at.
* *Payment* &rarr; Payment in chain-currency, i.e. ETH, BSC, FTM etc. Not LGND tokens or Legend NFTs.
* *Chain-Currency* &rarr; The currency used by the chain **Legendary Labs** is deployed on.
* *Credit* &rarr; Due to using the *Pull over Push* pattern and an Escrow contract, *payments* from successful listings are credited to the appropriate address. The address will then withdraw what is owed to them directly from the Escrow, rather than being sent from `payer`.
* *Royalties* &rarr; *Chain-Currency* collected from successful marketplace listings, and *credited*
