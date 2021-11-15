### `LegendMatching.sol`

``` sol title="imports  | pragma solidity 0.8.4"
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ILegendMatch.sol";
```

```sol title="isValidMatching | modifier"
isValidMatching(uint256 matchingId); → matchingId must exist
```

```sol title="Internal State Variables"
Counters.Counter internal _matchingIds;

Counters.Counter internal _matchingsClosed;

Counters.Counter internal _matchingsCancelled;

mapping(uint256 => LegendMatching) internal _legendMatching; | matchingId → matchingDetails

mapping(address => uint256) internal _tokensPending; | playerAddress → amount

mapping(uint256 => mapping(address => uint256)) internal _eggPending; | matchingId → blenderAddress → childId
```

The **LegendMatching** contract inherits from [**ILegendMatch**](./ILegendMatch) to define a Legend NFT *match* listing.
This contract acts as a ledger for a *match* listing, recording important data and events during the lifecycle of a *match* listing.
This contract is inherited by the [**LegendsMatchingBoard**](../LegendsMatchingBoard).


<br/>

## Functions

### _createLegendMatching
---

``` sol title="_createLegendMatching | internal"
_createLegendMatching(address nftContract, uint256 legendId, uint256 price)
```


Creates a new Legend NFT *match* listing and changes the state to `Open`.
Called from [**LegendsMatchingBoard**](../LegendsMatchingBoard#createlegendmatching).


### _matchWithLegend
---

``` sol title="_matchWithLegend | internal"
_matchWithLegend(uint256 matchingId, address blender, uint256 blenderLegend, uint256 childId, uint256 matchingPayment)
```

Records the details of a successful *match* listing and changes the state to `Closed`.
Called from [**LegendsMatchingBoard**](../LegendsMatchingBoard#cancellegendmatching).

:::important

This function credits the `surrogate`/seller with the LGND tokens owed and the `blender`/buyer
with the *child Legend* owed. These payments are later withdrawn by the players calling the respective functions
`claimTokens` & `claimEgg`.

:::


### _cancelLegendMatching
---

``` sol title="_cancelLegendMatching | internal"
_cancelLegendMatching(uint256 matchingId)
```

Changes the state of a *match* listing to `Cancelled`.
Called from [**LegendsMatchingBoard**](../LegendsMatchingBoard#cancellegendmatching).

---

<br/>

## Getters

### fetchMatchingCounts
---

``` sol title="fetchMatchingCounts | public"
fetchMatchingCounts() → struct Counters.Counter, struct Counters.Counter, struct Counters.Counter
```

Implemented in [**LegendsMatchingBoard**](../LegendsMatchingBoard#fetchmatchingcounts).

### fetchTokensPending
---

``` sol title="fetchTokensPending | public"
fetchTokensPending() → uint256
```

Implemented in [**LegendsMatchingBoard**](../LegendsMatchingBoard#fetchtokenspending).

### fetchEggOwed
---

``` sol title="fetchEggOwed | public"
fetchEggOwed(uint256 matchingId) → uint256
```

Implemented in [**LegendsMatchingBoard**](../LegendsMatchingBoard#fetcheggowed).

---

<br/>

## Events 

### EggClaimed
---

``` sol title="EggClaimed"
EggClaimed(address recipient, uint256 matchingId, uint256 childId)
```

Emitted when a `blending` address has claimed the *child Legend* owed to them from a particular *match* listing.
[`claimEgg`](../LegendsMatchingBoard#claimegg)

### TokensClaimed
---

``` sol title="TokensClaimed"
TokensClaimed(address payee, uint256 amount)
```

Emitted when a `surrogate` address has claimed LGND tokens owed to them from *match listings*.
[`claimTokens`](../LegendsMatchingBoard#claimtokens)

### PromoCreated
---

``` sol title="DecideRelisting"
DecideRelisting(uint256 matchingId, uint256 legendId, bool isRelisted)
```

Emitted when a `surrogateLegend` is relisted on the **LegendsMatchingBoard** rather than immediately returned to the owner.
[`decideMatchingRelist`](../LegendsMatchingBoard#decidematchrelist)



