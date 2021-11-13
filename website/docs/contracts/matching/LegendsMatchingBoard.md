### `LegendsMatchingBoard.sol`

``` sol title="imports  | pragma solidity 0.8.4"
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../lab/LegendsLaboratory.sol";
import "../token/LegendToken.sol";
import "./match/LegendMatching.sol";
```

```sol title="onlyLab | modifier"
onlyLab(); →  only LegendsLaboratory Contract can call
```

The **LegendMatchingBoard** contract establishes a marketplace so that Legend NFTs can be listed for the purpose of *blending* with. This contracts inherits [**LegendMatching**](./match/LegendMatching) to implement *matching listings*.

<br/>

## Functions

### createLegendMatching
---

> *List Your Legend NFT On The Matching Board*

<br/>

``` sol title="createLegendMatching | external | nonReentrant"
createLegendMatching(address nftContract, uint256 legendId, uint256 price)
```

Creates a new Legend *matching listing*. Calls `_createLegendMatching` from [**LegendMatching**](./match/LegendMatching#_createlegendmatching).


:::caution Requirements:

* Legend must be considered [*listable*](../lab/LegendsLaboratory#islistable)
* Legend must be considered [*blendable*](../lab/LegendsLaboratory#isblendable)
* `price` can not be `(0)`

:::

:::tip Note

Calling this function will transfer the listed Legend NFT to this contract.

:::


### matchWithLegend
---

> *Blend Your Legend NFT With The Listed Legend NFT*

<br/>

``` sol title="matchWithLegend | external | nonReentrant"
matchWithLegend(uint256 matchingId, uint256 legendId)
```

Completes a *matching listing* by creating a new *child Legend* using the `surrogateLegend` and the `blendingLegend`.
 Calls `_matchWithLegend` from [**LegendMatching**](./match/LegendMatching#_matchwithlegend).

:::caution Requirements:

* Listing must be `Open`
* `msg.sender` can not be the same address that placed the listing
* `blenderLegend` must be considered [*listable*](../lab/LegendsLaboratory#islistable)
* `blenderLegend` must be considered [*blendable*](../lab/LegendsLaboratory#isblendable)

:::

:::important

The cost to purchase a *matching listing* is: `_legendMatching.price` + the `blendingCost` for the (2) Legend NFTs being blended.

:::

:::important

This function will transfer the `blendingLegend` to this contract in order to successfully call `blendLegends`
from [**LegendsNFT**](../legend/LegendsNFT#_blendlegends); as `blendLegends` requires both *parent Legends* to be owned
by the `msg.sender`.

:::

:::important

After the *blending* process completes the `blendingLegend` will be returned to the `blender` while the *child Legend*
will be sent to this contract. In order to claim the *child Legend*, the `blender` will need to call `claimEgg`.

:::

### cancelLegendMatching
---

> *Cancel Your Matching Listing*

<br/>


``` sol title="cancelLegendMatching | external | nonReentrant"
cancelLegendMatching(uint256 matchingId)
```

Cancels a *matching listing* and returns the `surrogateLegend` to the `surrogate` address.
 Calls `_cancelLegendMatching` from [**LegendMatching**](./match/LegendMatching#_cancellegendmatching).


:::caution Requirements:

* `msg.sender` must be the same address that placed the listing
* Listing must be `Open`

:::

### decideMatchingRelist
---

> *Decide Whether To Relist Your Legend NFT On The Matching Board*

<br/>

``` sol title="decideMatchingRelist | external | nonReentrant"
decideMatchingRelist(uint256 matchingId, bool isRelisted)
```




Gives the `surrogate`/seller address the opportunity to easily relist their Legend NFT.
Rather than requiring the Legend owner to withdraw the Legend and then manually create a new listing
if they had wished to relist the Legend NFT.


:::caution Requirements:

* `msg.sender` must be the same address that placed the listing
* Listing must be `Closed`
* `surrogateLegend` must still be considered [*blendable*](../lab/LegendsLaboratory#isblendable)

:::

:::tip Note

If Legend NFT is relisted the LGND token price will remain the same as the prior listing.

:::

:::tip Note

If the player decides to not relist their Legend NFT, the NFT will be returned to them.

:::

### claimEgg
---

> *Claim Your New Child Legend NFT!*

<br/>

``` sol title="claimEgg | external | nonReentrant"
claimEgg(uint256 matchingId)
```

Allows the `blender` of a given *matching listing* to claim the *child Legend* that was created.

:::caution Requirements:

* `msg.sender` must be the same address that purchased the listing
* Listing must be `Closed`
* The *child Legend* must not already be claimed

:::

### claimTokens
---

> *Claim Your Pending LGND Tokens!*

<br/>

``` sol title="claimTokens | external | nonReentrant"
claimTokens()
```

Transfers any pending LGND tokens, earned from *matching listings*, to the caller.

:::caution Requirements:

* The amount of LGND tokens owed to the `msg.sender` must not be `(0)`.

:::

---

<br/>

## Getters

### fetchMatchingCounts
---

``` sol title="fetchMatchingCounts | public"
fetchMatchingCounts() → struct Counters.Counter, struct Counters.Counter, struct Counters.Counter
```

Returns the counts for `_matchingIds`, `_matchingsClosed`, & `_matchingsCancelled`.


### fetchLegendMatching
---

``` sol title="fetchLegendMatching | public  | isValidMatching(matchingId)"
fetchLegendMatching(uint256 matchingId) → struct ILegendMatch.LegendMatching
```

Returns the details for a given Legend *matching listing*.


### fetchTokensPending
---

``` sol title="fetchTokensPending | public"
fetchTokensPending() → uint256
```

Returns the amount of LGND tokens owned to the caller.


### fetchEggOwed
---

``` sol title="fetchEggOwed | public | isValidMatching(matchingId)"
fetchEggOwed(uint256 matchingId) → uint256
```

Returns the ID of the *child Legend* owed from a given *matching listing* to the `blender`.


---
<br/>

## Terminology
---

* *Matching* &rarr; A marketplace listing type. Allows for *blending* between two Legend NFTs not owned by the same addres, for a price in LGND tokens.
* *Surrogate* &rarr; The address responsible for creating the *matching listing*. In marketplace terms, the seller.
* *Surrogate Legend* &rarr; The Legend NFT being listed in a *matching listing*, belongs to the *surrogate*.
* *Blender* &rarr; The address that purchases the *matching listing*. In marketplace terms, the buyer.
* *Blender Legend* &rarr; The Legend NFT the *blender* uses to *blend* with the *surrogate Legend*.
