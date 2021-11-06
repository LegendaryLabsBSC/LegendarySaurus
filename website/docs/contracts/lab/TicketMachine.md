### `TicketMachine.sol`

``` sol title="imports  | pragma solidity 0.8.4"
import "@openzeppelin/contracts/utils/Counters.sol";
```

```sol title="Private State Variables"
mapping(uint256 => PromoEvent) internal _promoEvent;| promoId → PromoEvent

mapping(uint256 => uint256) internal _maxTicketsDispensable; | promoId → maxTicketAmount

mapping(uint256 => mapping(address => bool)) private _claimedPromo; | promoId → recipient → isClaimed

mapping(uint256 => mapping(address => uint256)) private _promoTickets; | promoId → recipient → ticketCount
```

The **TicketMachine** contract is used primarily to create Legendary Labs *promo events*. *Promo events* are the
only other method in which new Legend NFTs can be created, when not being create from *blending*.


:::important

* *Promo events* are required to have a duration imposed on them. Once this duration is reached, the *promo event* will
 be consider *expired*. While an *expired promo event*, will no longer have to ability to dispense new tickets, addresses
 that are still credited *promo tickets* can redeem those tickets for a Legend NFT.

* *Promo events* that have been closed via a `LAB_TECH` manually calling [`closePromoEvent`](./LegendsLaboratory#closepromoevent)
will be unable to dispense new tickets or redeem existing tickets.

:::


:::tip Note

While we will initially use this contract to mint new Legends through *promo events*, the concept of being able to issue
and redeem a "ticket" to grant access, can certainly be repurposed through new features we may come up with.

:::

<br/>

## Promo Event
---


```sol title="PromoEvent"
string promoName

uint256 promoId

uint256 startTime

uint256 expireTime

bool isUnrestricted

bool isTicketLimit

bool isPromoClosed

struct Counters.Counter ticketsClaimed

struct Counters.Counter ticketsRedeemed
```
:::note Info

 * `promoName` &rarr; Non-numerical ID of a Legendary Labs *promo event*
 * `promoId` &rarr; Numerical ID of a Legendary Labs *promo event*
 * `startTime` &rarr; Block/UNIX time the *promo event* starts
 * `expireTime` &rarr; `promoEvent.startTime` + `duration`
 * `isUnrestricted` &rarr; Indicates if a *promo event* can have tickets dispensed by any address or not
 * `isTicketLimit` &rarr; Indicates if a *promo event* has a set max number of *promo tickets* to be dispensed or not
 * `isPromoClosed` &rarr; Indicates if a *promo event* has closed or not
 * `ticketsClaimed` &rarr; Number of *promo tickets* that have been *dispensed* from the associated *promo event*
 * `ticketsRedeemed` &rarr; Number of *promo tickets* that have been *redeemed* from the associated *promo event*
 
:::
---

<br/>

## Functions

:::tip Note

All functions in the **TicketMachine** contract are internal

:::

### _createPromoEvent
---

Called from [**LegendsLaboratory**](./LegendsLaboratory#createpromoevent)

```sol title="_createPromoEvent | internal"
_createPromoEvent(string name, uint256 duration, bool isUnrestricted, uint256 maxTickets) → uint256
```

Creates a new *promo event* which is able to dispense and redeem *promo tickets*.

:::important

A *promo event* must have a valid `duration` in order to function correctly, however,
a *max ticket limit* is not required. Passing `(0)` for `maxTickets` will result in a
*promo event* with no *max ticket limit*.

:::





### _dispensePromoTicket
---

Called from [**LegendsLaboratory**](./LegendsLaboratory#dispensepromoticket)

```sol title="_dispensePromoTicket | internal"
_dispensePromoTicket(uint256 promoId, address recipient, uint256 ticketAmount)
```

Dispenses a *promo ticket* that can then be redeemed to mint a Legend NFT.


:::important

*Unrestricted promo events* will reject any value other than `(1)` for `ticketAmount`

:::




### _redeemPromoTicket
---

Called from [**LegendsLaboratory**](./LegendsLaboratory#redeempromoticket)

```sol title="_redeemPromoTicket  | internal"
_redeemPromoTicket(uint256 promoId, address recipient)
```

Redeems (1) *promo ticket* previously dispensed from a *promo event*




### _closePromoEvent
---

Called from [**LegendsLaboratory**](./LegendsLaboratory#closepromoevent)

```sol title="_closePromoEvent | internal"
_closePromoEvent(uint256 promoId)
```

Closes an expired *promo event*.

:::warning

Any address with unredeemed *promo tickets* will be unable to
redeem once the *promo event* has been closed

:::
---
<br/>

## Queries

### isClaimed
---

```sol title="isClaimed | public"
isClaimed(uint256 promoId, address recipient) → bool
```

Returns if a given address has *dispensed* a ticket from a given *promo event* or not

---
<br/>

## Getters





### fetchPromoCounts
---

```sol title="fetchPromoCounts() | public"
fetchPromoCounts() → struct Counters.Counter, struct Counters.Counter
```

Returns the counts for `_promoIds` and `_closedPromos`




### fetchPromoEvent
---

```sol title="fetchPromoEvent | public"
fetchPromoEvent(uint256 promoId) → struct TicketMachine.PromoEvent
```

Returns details pertaining to a given *promo event*




### fetchMaxTicketsDispensable
---

```sol title="fetchMaxTicketsDispensable | public"
fetchMaxTicketsDispensable(uint256 promoId) → uint256
```

Returns, if any, the *max ticket limit* of a *promo event*




### fetchRedeemableTickets
---

```sol title="fetchRedeemableTickets | public"
fetchRedeemableTickets(uint256 promoId, address recipient) → uint256
```

Returns the quantity of *promo tickets* a given address has for a given *promo event*

---
<br/>

## Events 


### PromoCreated
---

```sol title="PromoCreated"
PromoCreated(uint256 promoId, string promoName, uint256 expireTime)
```

Emitted when a new *promo event* is created.

### PromoClosed
---

```sol title="PromoClosed"
PromoClosed(uint256 promoId, uint256 totalDispensed, uint256 totalRedeemed)`
```

Emitted when a *promo event* is closed.

### TicketDispensed
---

```sol title="TicketDispensed"
TicketDispensed(uint256 promoId, uint256 currentDispensed)
```

Emitted when a *promo ticket* is dispensed.

### TicketRedeemed
---

```sol title="TicketRedeemed"
TicketRedeemed(uint256 promoId, uint256 currentRedeemed)
```

Emitted when a *promo ticket* is redeemed.

---
<br/>

## Terminology
---

 * *Promo Event* &rarr; An instance during which addresses can be credited with *promo tickets*.
 * *Promo Ticket* &rarr; An integer credit assigned to an address, associated with a `promoId`. Used for granting access and functionality. Non-transferable asset.
 * *Dispensed* &rarr; To increment the *promo ticket*-credit value assigned to the calling address, for a given *promo event*. 
 * *Redeemed* &rarr; To decrement the *promo ticket*-credit value assigned to the calling address, for a given *promo event*. 
 * *Expired* &rarr; A *promo event* which can not longer dispense new tickets, but can still have existing tickets redeemed.
 * *Max Ticket Limit* &rarr; A set number of *promo tickets* that can be *dispensed* for a given *promo event*. *Promo events* that have not  yet *expired*, but have reached an assoiated *max ticket limit*, will no longer be able to dispense new *promo tickets*

