## `LegendsLaboratory.sol`



Primary controller contract for the Legendary Labs Project






### Create Promo Event
---

```sol title="createPromoEvent | (external)"                               
createPromoEvent(string eventName, uint256 duration, bool isUnrestricted, 
uint256 maxTickets, bool skipIncubation) 
``` 

Creates A New Legendary Labs' Promo Event!

Calls `_createPromoEvent` from [`TicketMachine`](/docs/TicketMachine). Can only be called by a `LAB_TECH`.

**Promo Events** can be created (1) of (2) ways:
 1. Unrestricted Promo Event => @param isUnrestricted == true
 2. Restricted Promo Event => @param isUnrestricted == false

[`TicketMachine`](/docs/TicketMachine) had been extended by this contract with `_promoIncubated`. Which allows
the Promo creator to specify whether Legends minted from that particular event are required to undergo incubation
prior to being hatched. If `skipIncubation` is passed (true), all Legend NFTs created via that *Promo Event* will
be allowed to bypass the incubation duration and have [`hatchLegend`](/docs/LegendNFT) called immediately after being minted.

:::note

The only addresses that should be able to call this function is one approved with the `LAB_TECH` **Access Control Role**.
To check if an address is approved to use this function `hasRole(LAB_TECH, account)` can be called.

:::

:::note

If `maxTickets` is set to (0) no *maximum ticket count* will be applied to the event, only a duration.
If `maxTickets` is passed a number greater than (0) a *maximum ticket count* will be applied, and will override the remaining duration if met.

:::

:::caution

For **Legendary Labs** purposes it is generally NOT recommended to include a `maxTicket` value greater
than (0) for *Unrestricted* Promo Events. This is due to the fact that there is no way to prevent an individual
from using multiple addresses to claim multiple tickets. While this still holds true regardless of a ticket limit
existing, by only limiting a Promo Event with `duration` we remove the possibility of one individual claiming **all**
of an event's tickets, and ruining the fun for every one else.

The `maxTickets` functionality could be used to create *Promo Events* in a more centralized/organized environment
where the organizers can verify one address per individual.

However, we will primarily use `maxTickets` alongside *Restricted* events, and more likely gear it towards internal accountability.

:::

### Dispenses Promo Ticket
---

```sol title="dispensePromoTicket | (public)"
dispensePromoTicket(uint256 promoId, address recipient, uint256 ticketAmount)"
```

Dispenses Tickets For A Legendary Labs Promo Event



Calls `_dispensePromoTicket` from [`TicketMachine`](/docs/TicketMachine).

:::note

### In an *Unrestricted* **Promo Event**:

 * Players have the opportunity to call `dispensePromoTicket` without having admin access.
 * Tickets can only be dispensed to the calling address, as `_recipient` is automatically set to `msg.sender`
 * Each address is permitted to claim (1) ticket from the **Ticket Dispenser**.

### In an *Restricted* **Promo Event**:

 * Only addresses with `LAB_TECH` access are allowed to dispense tickets.
 * The admin-caller has the ability to dispense a ticket and specify a receiving address other than their own.
 * More than (1) ticket can be dispensed per call, however, the recieveing address must stay the same.
:::

:::caution

 Promo tickets are non-transferable

:::



### Redeem Promo Ticket
---

### `redeemPromoTicket(uint256 promoId)` (public)

Redeems (1) Legendary Labs' Promo Event Tickets For A Brand Spankin New Legend NFT



Calls `_redeemPromoTicket` from [`TicketMachine`](/docs/TicketMachine). Once a ticket has been successfully redeemed, `createLegend` is called
from [LegendsNFT](/docs/LegendsNFT). Which mints and issues a new Legend NFT token to the ticket redeemer.


### Dispenses Promo Ticket
---

### `closePromoEvent(uint256 promoId)` (public)

Close Promo Event



Calls `_closePromoEvent` from [`TicketMachine`](/docs/TicketMachine).

:::note

Promo Event must be expired to call, only callable by a `LAB_TECH`

:::

### Dispenses Promo Ticket
---

### `restoreBlendingSlots(uint256 legendId, uint256 regainedSlots)` (public)

### Dispenses Promo Ticket
---

Function only callable by [`LegendsRejuvenation`](/docs/LegendRejuvenation)

### `mintLegendaryLegend(uint256 promoId, address recipient)` (public)

A True Legend Is Born..

### Dispenses Promo Ticket
---

This function is the only way a *Legendary* Legend NFT can be minted. Only *the* `LAB_ADMIN` can
create a *Legendary*. Calls [`createLegend`](/docs/LegendsNFT#createLegend) with the `isLegendary` bool
switched to (true).

:::note

In order to create a Legendary, a valid **Promo Event** must first have a ticket redeemed by the calling address

:::


### Dispenses Promo Ticket
---

### `labBurn(uint256 amount)` (public)

Destroy LGND Tokens PERMANENTLY



Generic function allowing the lab to burn LGND tokens owed by this contract. Only callable by *the* `LAB_ADMIN`.

:::note

Could be used to extend functionality prior to a full v2 launch if a concept was thought of

:::

### Dispenses Promo Ticket
---
### Dispenses Promo Ticket
---
### `isPromoIncubated(uint256 promoId) → bool` (public)



Queries whether a PromoEvent permits a Legend to bypass incubation


### Dispenses Promo Ticket
---

### `isBlendable(uint256 legendId) → bool` (public)



Queries whether a Legend is blendable or not, [`isBlendable`](/docs/LegendsNFT#isBlendable).


### Dispenses Promo Ticket
---

### `isHatched(uint256 legendId) → bool` (public)

### Dispenses Promo Ticket
---

Queries whether a Legend has *hatched* or not, [`isHatched`](/docs/LegendsNFT#isHatched).

### Dispenses Promo Ticket
---

### `isListable(uint256 legendId) → bool` (public)



Queries whether a Legend is listable or not, [`isListable`](/docs/LegendsNFT#isListable).

### Dispenses Promo Ticket
---

### `fetchSeason() → string` (public)



Returns the current **Legendary Labs** Season

### Dispenses Promo Ticket
---

### `fetchBlendingCount(uint256 legendId) → uint256` (public)



Returns a given Legend's `blendingInstancesUsed`


:::info

A Legend has (2) variables that are tracked via **Blending*: `blendingInstancesUsed` and `totalOffspringCount`
`blendingInstancesUsed` is utilized when determining whether a `isBlendable` or not by
comparing against the [`_blendingLimit`](/docs/LegendsNFT). Whereas `totalOffspring` is utilized
when determining [`_blendingCost`](/docs/LegendsNFT#blendLegends).

:::

### Dispenses Promo Ticket
---

### `fetchBlendingCost(uint256 legendId) → uint256` (public)



Returns the cost to blend a particular Legend

### Dispenses Promo Ticket
---

### `fetchRoyaltyRecipient(uint256 legendId) → address payable` (public)



Returns the original creator of a particular Legend

:::note

Only Legends created via `[blendLegends`](/docs/LegendsNFT#blendLegends) are eligible to pay royalties to the *creator address*.
Legends created via `[createLegend`](/docs/LegendsNFT#createLegend) should return the *0 address*.

:::

### Dispenses Promo Ticket
---

### `setSeason(string newSeason)` (public)

A New Season Begins..



Sets a new season. Only callable by *the* `LAB_ADMIN`.

### Dispenses Promo Ticket
---

### `setKinBlendingLevel(uint256 newKinBlendingLevel)` (public)

Set New Kin Blending Level



Resets the [`_kinBlendingLevel`](docs/LegendsNFT/#setBlendingRule). Only callable by *the* `LAB_ADMIN`.

:::info Kin Blending Level Codes:

* 0 => **None** Legend can **not** *blend* with either siblings or parents
* 1 => **Parents** Legend can *blend* with parent Legends but not siblings
* 2 => **Siblings** Legend has no restrictions on other Legends it can *blend* with

:::


### Dispenses Promo Ticket
---

### `setIncubationViews(string[5] newIncubationViews)` (public)

Set New IPFS URLs For The Incubation Chambers



Allows the resetting of the "randomly" chosen IPFS URLs assigned to a pre-hatched Legend. Only callable by *the* `LAB_TECH`.

### Dispenses Promo Ticket
---

### `setBlendingLimit(uint256 newBlendingLimit)` (public)

Set New Blending Limit



Resets the [`_blendingLimit`](docs/LegendsNFT/#setBlendingRule). Only callable by *the* `LAB_ADMIN`.

### Dispenses Promo Ticket
---

### `setBaseBlendingCost(uint256 newBaseBlendingCost)` (public)

Set New Base Blending Cost



Resets the [`_baseBlendingCost`](docs/LegendsNFT/#setBlendingRule). Only callable by *the* `LAB_ADMIN`.

### Dispenses Promo Ticket
---

### `setIncubationPeriod(uint256 newIncubationPeriod)` (public)

Set New Incubation Period



Resets the [`_incubationPeriod`](docs/LegendsNFT/#setBlendingRule). Only callable by *the* `LAB_ADMIN`.

### Dispenses Promo Ticket
---

### `setRoyaltyFee(uint256 newRoyaltyFee)` (public)

Set New Marketplace Royalty Fee



Resets the [`_royaltyFee`](docs/LegendsMarketplace/#setMarketplaceRule). Only callable by *the* `LAB_ADMIN`.

### Dispenses Promo Ticket
---

### `setMarketplaceFee(uint256 newMarketplaceFee)` (public)

Set New Marketplace Fee



Resets the [`_marketplaceFee`](docs/LegendsMarketplace/#setMarketplaceRule). Only callable by *the* `LAB_ADMIN`.

### Dispenses Promo Ticket
---

### `setOfferDuration(uint256 newOfferDuration)` (public)

Set New Marketplace Offer Duration



Resets the [`_offerDuration`](docs/LegendsMarketplace/#setMarketplaceRule). Only callable by a `LAB_TECH`.

### Dispenses Promo Ticket
---

### `setAuctionDurations(uint256[3] newAuctionDurations)` (public)

Set New Marketplace Auction Durations



Resets the [`_auctionDurations`](docs/LegendsMarketplace/#setMarketplaceRule) array. Only callable by *the* `LAB_ADMIN`.

### Dispenses Promo Ticket
---

### `setAuctionExtension(uint256 newAuctionExtension)` (public)

Set New Marketplace Auction Extension Duration



Resets the [`_auctionExtension`](docs/LegendsMarketplace/#setMarketplaceRule) duration. Only callable by *the* `LAB_ADMIN`.

### Dispenses Promo Ticket
---

### `setMinimumSecure(uint256 newMinimumSecure)` (public)

Set New Rejuvenation Minimum Secure



Resets the [`_minimumSecure`](docs/LegendsRejuvenation#setMinimumSecure) amount. Only callable by *the* `LAB_ADMIN`.

### Dispenses Promo Ticket
---

### `setMaxMultiplier(uint256 newMaxMultiplier)` (public)

Set New Rejuvenation Max Multiplier



Resets the [`_maxMultiplier`](docs/LegendsRejuvenation#setMaxMultiplier). Only callable by *the* `LAB_ADMIN`.

### Dispenses Promo Ticket
---

### `setReJuPerBlock(uint256 newReJuEmissionRate)` (public)

Set New Rejuvenation ReJu Emission Rate



Resets the [`_reJuPerBlock`](docs/LegendsRejuvenation#setReJuPerBlock) rate. Only callable by *the* `LAB_ADMIN`.

### Dispenses Promo Ticket
---

### `setReJuNeededPerSlot(uint256 newReJuNeededPerSlot)` (public)

Set New Rejuvenation Slot Threshold



Resets the [`_ReJuNeededPerSlot`](docs/LegendsRejuvenation#setReJuNeededPerSlot) to restore a *blending instance*. Only callable by *the* `LAB_ADMIN`.

### Dispenses Promo Ticket
---

### `transferLaboratoryAdmin(address newAdmin)` (public)

There Can Only Be One..



Only callable by *the* `LAB_ADMIN`. Function calls *this* contract to revoke the current `LAB_ADMIN`'s
authorization and grant authorization to the incoming admin in the same block.

:::note

Many of the functions the `LAB_ADMIN` has authorization to call should only be called rarely, if ever.
In order to prevent more than (1) `LAB_ADMIN` existing at one time, *this* contract is given sole ability
to revoke and grant `LAB_ADMIN` access. This should be the only way a `LAB_ADMIN` role can be granted.

:::

:::warning

By calling this function you will give up you privileges as `Lab_ADMIN`. If the `newAdmin`is supplied the *0 address*,
a burn address, or any otherwise inaccessible address, full control over the Legendary Labs project would be renounced.

:::