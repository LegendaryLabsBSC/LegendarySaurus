### `LegendsLaboratory.sol`

``` sol title="imports  | pragma solidity 0.8.4"
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "./LaboratoryGovernor.sol";
import "../legend/LegendsNFT.sol";
import "../token/LegendToken.sol";
import "../rejuvenation/LegendRejuvenation.sol";
import "../marketplace/LegendsMarketplace.sol";
import "../matching/LegendsMatchingBoard.sol";
import "./TicketMachine.sol";
```



Primary controller contract for the Legendary Labs Project




<br/>

## Functions

### createPromoEvent
---

> *Creates A New Legendary Labs Promo Event!*

<br/>

```sol title="createPromoEvent | external | onlyRole(LAB_TECH)"                               
createPromoEvent(string eventName, uint256 duration, bool isUnrestricted, 
uint256 maxTickets, bool skipIncubation) 
``` 

Calls `_createPromoEvent` from [`TicketMachine`](./TicketMachine#_createpromoevent). Can only be called by a [`LAB_TECH`](./Access%20Control#terms).

:::info Important

**promo events** can be created (1) of (2) ways:
 1. Unrestricted Promo Event &rarr; `isUnrestricted == true`
 2. Restricted Promo Event &rarr; `isUnrestricted == false`

[`TicketMachine`](./TicketMachine) had been extended by this contract with `_promoIncubated`. Which allows
the promo-creator to specify whether Legends minted from that particular event are required to undergo incubation
prior to being hatched. 

If `skipIncubation` is passed `(true)`, all Legend NFTs created via that *promo event* will
be allowed to bypass the incubation duration and have [`hatchLegend`](../legend/LegendsNFT#hatchLegend) called immediately after being minted.

:::

:::tip Note

The only addresses that should be able to call this function is one approved with the `LAB_TECH` **Access Control Role**.

To check if an address is approved to use this function `hasRole(LAB_TECH, account)` can be called.

:::

:::tip Note

If `maxTickets` is set to (0) no *max *ticket limit** will be applied to the event, only a duration.
If `maxTickets` is passed a value greater than (0) a *max *ticket limit** will be applied, and will override the remaining duration if met.

:::

:::caution

For **Legendary Labs** purposes it is generally **NOT** recommended to include a `maxTicket` value greater
than (0) for *unrestricted promo events*. Due to the fact that there is currently no way to prevent an individual
from using multiple addresses to claim multiple tickets. 

While this still holds true regardless of a *max ticket limit*
existing, by only limiting a *promo event* with a `duration` we remove the possibility of one individual claiming **all**
of *promo tickets*, and ruining the fun for every one else.

The `maxTickets` functionality could be used to create *promo events* in a more centralized/organized environment
where the organizers can verify one address per individual.

However, we will primarily use `maxTickets` alongside *restricted events*, and more likely gear it towards internal accountability.

:::

### dispensePromoTicket
---

> *Dispenses Tickets For A Legendary Labs Promo Event*

<br/>


```sol title="dispensePromoTicket | public"
dispensePromoTicket(uint256 promoId, address recipient, uint256 ticketAmount)
```





Calls `_dispensePromoTicket` from [`TicketMachine`](./TicketMachine#_dispensepromoticket).

:::note Info

#### In an *Unrestricted* *promo event*:

 * Players have the opportunity to call `dispensePromoTicket` without having admin access.
 * Tickets can only be dispensed to the calling address, as `_recipient` is automatically set to `msg.sender`
 * Each address is permitted to claim (1) ticket from the **Ticket Machine**.

#### In an *Restricted* *promo event*:

 * Only addresses with `LAB_TECH` access are allowed to dispense tickets.
 * The admin-caller has the ability to dispense a ticket and specify a receiving address other than their own.
 * More than (1) ticket can be dispensed per call, however, the receiving address must stay the same.
:::

:::caution

 Promo tickets are non-transferable

:::



### redeemPromoTicket
---

> *Redeems (1) Legendary Labs Promo Event Tickets For A Brand Spankin New Legend NFT*

<br/>

``` sol title="redeemPromoTicket | public"
redeemPromoTicket(uint256 promoId)
```

Calls `_redeemPromoTicket` from [`TicketMachine`](./TicketMachine#_redeempromoticket). Once a ticket has been successfully redeemed, `createLegend` is called
from [LegendsNFT](../legend/LegendsNFT#createlegend).


### closePromoEvent
---

> *Close Promo Event*

<br/>

``` sol title="closePromoEvent | public | onlyRole(LAB_TECH)"
closePromoEvent(uint256 promoId)
```

Calls `_closePromoEvent` from [**TicketMachine**](./TicketMachine#_closepromoevent).

:::info Important

*Promo event* must be expired to call, only callable by a `LAB_TECH`

:::



### restoreBlendingSlots
---

``` sol title="restoreBlendingSlots | public"
restoreBlendingSlots(uint256 legendId, uint256 regainedSlots)
```

Calls `restoreBlendingSlots` from [**LegendsRejuvenation**](../rejuvenation/LegendRejuvenation#resto).


:::info Important

Function only callable by [`LegendsRejuvenation`](../rejuvenation/LegendRejuvenation#restoreBlendingSlots)

:::


### mintLegendaryLegend
---

> *A True Legend Is Born..*

<br/>

``` sol title="mintLegendaryLegend | public | onlyRole(LAB_ADMIN)"
mintLegendaryLegend(uint256 promoId, address recipient)
```

Calls [`createLegend`](/docs/LegendsNFT#createLegend) passing `isLegendary` 
as `(true)`.

:::info Important

In order to create a Legendary, a valid *promo event* must first have a ticket *redeemed* by the calling address

:::

:::tip Note

This function is the only way a *Legendary* Legend NFT can be minted. Only *the* `LAB_ADMIN` can
create a *Legendary*.

:::


### labBurn
---

> *Destroy LGND Tokens PERMANENTLY*

<br/>

``` sol title="labBurn | public | onlyRole(LAB_ADMIN)"
labBurn(uint256 amount)
```

Generic function allowing the lab to burn LGND tokens owed by this contract. Only callable by *the* `LAB_ADMIN`.

:::tip Note

Could be used to extend functionality prior to a full v2 launch if a concept was thought of

:::
---

<br/>


## Queries

### isPromoIncubated
---
``` sol title="isPromoIncubated | public"
isPromoIncubated(uint256 promoId) → bool
```

Queries whether a *promo event* permits a Legend to bypass incubation.


### isBlendable
---

``` sol title="isBlendable | public"
isBlendable(uint256 legendId) → bool
```

Queries whether a Legend is blendable or not, [`isBlendable`](../legend/LegendsNFT#isblendable).


### isHatched
---

``` sol title="isHatched | public"
isHatched(uint256 legendId) → bool
```

Queries whether a Legend has *hatched* or not, [`isHatched`](../legend/LegendsNFT#ishatched).

### isListable
---

``` sol title="isListable | public"
isListable(uint256 legendId) → bool
```

Queries whether a Legend is listable or not, [`isListable`](../legend/LegendsNFT#islistable).

---

<br/>

## Getters

```sol title="Private State Variables"
string private _season = "Phoenix"; | Legendary Labs Season

mapping(uint256 => bool) private _promoIncubated; | promoId → skipIncubation
```

### fetchSeason
---

``` sol title="fetchSeason | public"
fetchSeason() → string
```

Returns the current **Legendary Labs** Season

### fetchBlendingCount
---

``` sol title="fetchBlendingCount | public"
fetchBlendingCount(uint256 legendId) → uint256
```

Returns a given Legend's `blendingInstancesUsed`


:::note Info

A Legend has (2) variables that are tracked via *blending*: `blendingInstancesUsed` and `totalOffspringCount`
* `blendingInstancesUsed` is utilized when determining whether a Legend `isBlendable` or not, by
comparing against the [`_blendingLimit`](../legend/LegendsNFT#getters). 

Whereas 
* `totalOffspring` is utilized
when determining [`_blendingCost`](../legend/LegendsNFT#blendLegends).

:::

### fetchBlendingCost
---

``` sol title="fetchBlendingCost | public"
fetchBlendingCost(uint256 legendId) → uint256
```

Returns the cost to blend a particular Legend(1)

### fetchRoyaltyRecipient
---

``` sol title="fetchRoyaltyRecipient | public"
fetchRoyaltyRecipient(uint256 legendId) → address payable
```

Returns the original creator of a particular Legend

:::info Important

Only Legends created via [`blendLegends`](../legend/LegendsNFT#blendLegends) are eligible to pay royalties to the *creator address*.

Legends created via [`createLegend`](../legend/LegendsNFT#createLegend) should return the *zero address*, and take (0%) *royalty fee* from [**LegendsMarketPlace**](../marketplace/LegendsMarketplace).

:::
---

<br/>

## Setters

### setSeason
---

> *A New Season Begins..*

<br/>

``` sol title="setSeason | public | onlyRole(LAB_ADMIN)"
setSeason(string newSeason)
```

Sets a new season. Only callable by *the* `LAB_ADMIN`.



### setKinBlendingLevel
---

> *Set New Kin Blending Level*

<br/>

``` sol title="setKinBlendingLevel | public | onlyRole(LAB_ADMIN)"
setKinBlendingLevel(uint256 newKinBlendingLevel)
```
Resets the [`_kinBlendingLevel`](../legend/LegendsNFT/#setblendingrule). Only callable by *the* `LAB_ADMIN`.

:::note Info
#### Kin Blending Level Codes:

* 0 &rarr; **None**; Legend can **not** *blend* with either siblings or parents
* 1 &rarr; **Parents**; Legend can *blend* with parent Legends, but not siblings
* 2 &rarr; **Siblings**; Legend has no restrictions on other Legends it can *blend* with

:::




### setIncubationViews
---

> *Set New IPFS URLs For The Incubation Chambers*

<br/>

``` sol title="setIncubationViews | public | onlyRole(LAB_TECH)"
setIncubationViews(string[5] newIncubationViews)
```

Allows the resetting of the IPFS URLs assigned to a pre-hatched Legend. Only callable by *the* `LAB_TECH`.

### setBlendingLimit
---

> *Set New Blending Limit*

<br/>

``` sol title="setBlendingLimit | public | onlyRole(LAB_ADMIN)"
setBlendingLimit(uint256 newBlendingLimit)
```

Resets the [`_blendingLimit`](../legend/LegendsNFT/#setblendingRule). Only callable by *the* `LAB_ADMIN`.

### setBaseBlendingCost
---

> *Set New Base Blending Cost*

<br/>

``` sol title="setBaseBlendingCost | public | onlyRole(LAB_ADMIN)"
setBaseBlendingCost(uint256 newBaseBlendingCost)
```

Resets the [`_baseBlendingCost`](../legend/LegendsNFT/#setblendingrule). Only callable by *the* `LAB_ADMIN`.

### setIncubationPeriod
---

> *Set New Incubation Period*

<br/>

``` sol title="setIncubationPeriod | public | onlyRole(LAB_ADMIN)"
setIncubationPeriod(uint256 newIncubationPeriod)
```

Resets the [`_incubationPeriod`](../legend/LegendsNFT/#setblendingrule). Only callable by *the* `LAB_ADMIN`.

### setRoyaltyFee
---

> *Set New Marketplace Royalty Fee*

<br/>

``` sol title="setRoyaltyFee | public | onlyRole(LAB_ADMIN)"
setRoyaltyFee(uint256 newRoyaltyFee)
```

Resets the [`_royaltyFee`](../marketplace/LegendsMarketplace/#setmarketplacerule). Only callable by *the* `LAB_ADMIN`.

### setMarketplaceFee
---

> *Set New Marketplace Fee*

<br/>

``` sol title="setMarketplaceFee | public | onlyRole(LAB_ADMIN)"
setMarketplaceFee(uint256 newMarketplaceFee)
```

Resets the [`_marketplaceFee`](../marketplace/LegendsMarketplace/#setmarketplacerule). Only callable by *the* `LAB_ADMIN`.

### setOfferDuration
---

> *Set New Marketplace Offer Duration*

<br/>

``` sol title="setOfferDuration | public | onlyRole(LAB_TECH)"
setOfferDuration(uint256 newOfferDuration)
```

Resets the [`_offerDuration`](../marketplace/LegendsMarketplace/#setmarketplacerule). Only callable by a `LAB_TECH`.

### setAuctionDurations
---

> *Set New Marketplace Auction Durations*

<br/>

``` sol title="setAuctionDurations | public | onlyRole(LAB_ADMIN)"
setAuctionDurations(uint256[3] newAuctionDurations)
```

Resets the [`_auctionDurations`](../marketplace/LegendsMarketplace/#setmarketplacerule) array. Only callable by *the* `LAB_ADMIN`.

### setAuctionExtension
---

> *Set New Marketplace Auction Extension Duration*

<br/>

``` sol title="setAuctionExtension | public | onlyRole(LAB_ADMIN)"
setAuctionExtension(uint256 newAuctionExtension)
```

Resets the [`_auctionExtension`](../marketplace/LegendsMarketplace/#setmarketplacerule) duration. Only callable by *the* `LAB_ADMIN`.

### setMinimumSecure
---

> *Set New Rejuvenation Minimum Secure*

<br/>

``` sol title="setMinimumSecure | public | onlyRole(LAB_ADMIN)"
setMinimumSecure(uint256 newMinimumSecure)
```

Resets the [`_minimumSecure`](../rejuvenation/LegendsRejuvenation#setminimumsecure) amount. Only callable by *the* `LAB_ADMIN`.

### setMaxMultiplier
---

> *Set New Rejuvenation Max Multiplier*

<br/>

``` sol title="setMaxMultiplier | public | onlyRole(LAB_ADMIN)"
setMaxMultiplier(uint256 newMaxMultiplier)
```

Resets the [`_maxMultiplier`](../rejuvenation/LegendsRejuvenation#setmaxmultiplier). Only callable by *the* `LAB_ADMIN`.

### setReJuPerBlock
---

> *Set New Rejuvenation ReJu Emission Rate*

<br/>

``` sol title="setReJuPerBlock | public | onlyRole(LAB_ADMIN)"
setReJuPerBlock(uint256 newReJuEmissionRate)
```


Resets the [`_reJuPerBlock`](../rejuvenation/LegendsRejuvenation#setrejuperblock) rate. Only callable by *the* `LAB_ADMIN`.

### setReJuNeededPerSlot
---

> *Set New Rejuvenation Slot Threshold*

<br/>

``` sol title="setReJuNeededPerSlot | public | onlyRole(LAB_ADMIN)"
setReJuNeededPerSlot(uint256 newReJuNeededPerSlot)
```

Resets the [`_ReJuNeededPerSlot`](../rejuvenation/LegendsRejuvenation#setrejuneededperslot) to restore a *blending instance*. Only callable by *the* `LAB_ADMIN`.

## Terminology
---

 * *Restricted Promo Event* &rarr; A *promo event* where only addresses assigned `LAB_TECH` access can dispense *promo tickets*.
 * *Unrestricted Promo Event* &rarr; A *promo event* where any address can dispense up to (1) *promo ticket*.
 * *Creator Address* &rarr; Any non-*zero address*, resposible for *blending* two Legends together. This address will recieve *royalties* every time their Legend NFT is sold on the [**LegendsMarketplace](../marketplace/LegendsMarketplace). After the first initial sale, where the *creator address* is listing. 
 * *Zero Address* &rarr; `0x0000000000000000000000000000000000000000` **The Black Hole**, any Legend NFT or LGND tokens sent to this address can **NEVER** be retrieved.