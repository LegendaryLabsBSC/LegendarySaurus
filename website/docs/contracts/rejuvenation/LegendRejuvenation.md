### `LegendRejuvenation.sol`

``` sol title="imports  | pragma solidity 0.8.4"
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../lab/LegendsLaboratory.sol";
import "./IRejuvenationPod.sol";
```

```sol title="onlyLab | modifier"
onlyLab(); →  only LegendsLaboratory Contract can call
```

```sol title="Private State Variables"

uint256 private _minimumSecure;

uint256 private _maxMultiplier;

uint256 private _reJuPerBlock;

uint256 private _reJuNeededPerSlot;

mapping(uint256 => RejuvenationPod) private _rejuvenationPod; | legendId → podDetails
```
The **LegendRejuvenation** contract allows a Legend NFT to restore decrease the value of its `_legendMetadata.blendingSlotsUsed`. Inherits from [**ILegendRejuvenation**](./IRejuvenationPod) to define a *Rejuvenation Pod*.

<br/>

## Functions

### enterRejuvenationPod
---

> *Rejuvenate Your Legend*

<br/>


``` sol title="enterRejuvenationPod | external"
enterRejuvenationPod(address nftContract, uint256 legendId, uint256 tokensToSecure)
```

Places a Legend NFT into a *rejuvenation pod* where it gains back the ability to blend.

:::caution Requirements:
  * Legend must be considered [*listable*](../lab/LegendsLaboratory#islistable).

:::

:::important

This is not to be confused with "farming" or "staking". *Securing* LGND tokens provides the player with in-game rewards rather than financial rewards.

Those *securing* LGND tokens in a *rejuvenation pod* will neither gain nor lose LGND tokens. The exact amount an address deposits is the exact amount the address can withdraw.

Current and future in-game rewards MAY include:

  * *Rejuvenation* &rarr; *Blending Slots*
  * *Training* &rarr; *Stats EXP Points*
  * *Lotteries/Side-Games* &rarr; *Items & NFTs*

:::


:::important

reju pods will have a set minimum amount of LGND tokens that are needed to enter a Legend into rpod.
Each times the minimum amount is secured into the pod, the rejuvenation rate multiplier increases

:::

:::tip Note

When this function is called the Legend is transferred to the **LegendRejuvenation** contract.

:::

### leaveRejuvenationPod
---

> *Retrieve Your Legend From Rejuvenation*

<br/>


``` sol title="leaveRejuvenationPod | external"
leaveRejuvenationPod(uint256 legendId)
```

Removes a Legend NFT from its *rejuvenation pod* along with all LGND tokens currently secured in the pod and returns them to the owner.

:::tip Note

If a Legend NFT is removed from its *rejuvenation pod* any rollover *ReJu* will be lost.

:::

### removeSecuredTokens
---

> *Retrieve Your Rejuvenation Pod LGND Tokens*

<br/>

``` sol title="removeSecuredTokens | public"
removeSecuredTokens(uint256 legendId, uint256 amountToRemove)
```

Removes LGND tokens from a Legend's *rejuvenation pod*. 

:::important

Any time a *rejuvenation pod* has its secured LGND token amount increase or decrease, the Legend NFT will be automatically
rejuvenated and the `_rejuvenationPod.multiplier` recalculated.

:::

:::tip Note

When calling `removeSecuredTokens` directly, the caller
is not required to removed the entire secured amount. However, the remaining amount must meet the minimum required amount.

:::

### increaseSecuredTokens
---

> *Add To Your Rejuvenation Pod LGND Tokens*

<br/>

``` sol title="increaseSecuredTokens | external"
increaseSecuredTokens(uint256 legendId, uint256 amountToSecure)
```

Adds LGND tokens to a Legend's *rejuvenation pod*.

:::tip Note

The `tokenAmountSecured` can not exceed (`_minimumSecure` * `_maxMultiplier`).

There are checks in place preventing this during `enterRejuvenationPod` & `increaseSecuredTokens`. Additionally, `_calculateMultiplier` will not allow `_rejuvenationPod.multiplier` to exceed `_maxMultiplier`.

:::

---

<br/>

## Getters

### fetchPodDetails
---


``` sol title="fetchPodDetails | public"
fetchPodDetails(uint256 legendId) → struct IRejuvenationPod.RejuvenationPod
```


Returns *rejuvenation pod* details for a given Legend NFT.


### fetchRejuvenationProgress
---


``` sol title="fetchRejuvenationProgress | public"
fetchRejuvenationProgress(uint256 legendId) → uint256, uint256
```




Returns the progress of a given Legend NFT's rejuvenation

:::note Info

#### Rejuvenation Progress:

* `earnedReJu`
* `maxEarnableReJu`
* `restoredSlots`

:::


### fetchRejuvenationRules
---


``` sol title="fetchRejuvenationRules | public"
fetchRejuvenationRules() → uint256, uint256, uint256, uint256
```
Returns the values of the (4) *rejuvenation rules*.


:::note Info

#### Rejuvenation Rules:

* `_minimumSecure`
* `_maxMultiplier`
* `_reJuPerBlock`
* `_reJuNeededPerSlot`

:::

---

<br/>

## Setters

### setMinimumSecure
---


``` sol title="setMinimumSecure | public | onlyLab"
setMinimumSecure(uint256 newMinimumSecure)
```

Function only callable by [**LegendsLaboratory**](../lab/LegendsLaboratory#setminimumsecure)  `setMinimumSecure`


### setMaxMultiplier
---


``` sol title="setMaxMultiplier | public | onlyLab"
setMaxMultiplier(uint256 newMaxMultiplier)
```

Function only callable by [**LegendsLaboratory**](../lab/LegendsLaboratory#setmaxmultiplier) `setMaxMultiplier`

### setReJuPerBlock
---


``` sol title="setReJuPerBlock | public | onlyLab"
setReJuPerBlock(uint256 newReJuEmissionRate)
```

Function only callable by [**LegendsLaboratory**](../lab/LegendsLaboratory#setrejuperblock) `setReJuPerBlock`

### setReJuNeededPerSlot
---


``` sol title="setReJuNeededPerSlot | public | onlyLab"
setReJuNeededPerSlot(uint256 newReJuNeededPerSlot)
```

Function only callable by [**LegendsLaboratory**](../lab/LegendsLaboratory#newrejuneededperslot) `newReJuNeededPerSlot`


---
<br/>

## Terminology
---

* *Rejuvenation Pod* &rarr; Each Legend has their very own *rejuvenation pod* unique to that Legend. When a Legend is occupying their *rejuvenation pod* they can not be placed utilize any functionality that requires them to be in a *listable* state. However, while inside their *pod* a Legends earns *ReJu* to restore used *blending slots*.
* *ReJu* &rarr; In-game unit of measurement used to calculate how much a Legend has *rejuvenated* while inside their *pod*.
* *Blending Slots* &rarr; The **LegendsNFT** contract imposes a `_blendingLimit` on all Legend NFTs. This limit is the number of *blending slots* each legend has. If the `_blendingLimit` is set to `(5)` and a particular Legend has *blended* (3) times, they would of used up `3 of 5` *blending slots*. Once the limit is reached, a Legend can not *blend* again until after restoring some *blending slots*
* *Securing* &rarr; In order to power some of **Legendary Labs** game functionalities, players will need to *secure* LGND tokens. These *secured* token are purely for in-game functionality, not financial. 

