### `IRejuvenationPod.sol`



Interface used by [**LegendRejuvenation**](./LegendRejuvenation). Outlines the *Rejuvenation Pod* functionality.

## Rejuvenation Pod
---


```sol title="RejuvenationPod"
address nftContract

address depositedBy

uint256 checkpointBlock

uint256 blendingInstancesUsed

uint256 tokenAmountSecured

uint256 multiplier

uint256 rolloverReju

bool occupied
```
:::note Info

 * `nftContract` &rarr; Address of the ERC721 contract.
 * `depositedBy` &rarr;  Address that entered the Legend into its *rejuvenation pod*.
 * `checkpointBlock` &rarr; Saved `block` number when a Legend enters a *rejuvenation pod* or has *blending slots* restored.
 * `blendingInstancesUsed` &rarr; Current number of *blending slots* a Legend has used.
 * `tokenAmountSecured` &rarr; Number of LGND secured with the Legend in its *rejuvenation pod*.
 * `multiplier` &rarr; `totalAmountSecured / minimumSecure = multiplier`
 * `rolloverReju` &rarr; Remainder *reJu* stored in a *rejuvenation pod* after a Legend undergoes *blending slot* restoration*. Any `rolloverReju` will reset to `(0)` after a Legend is removed from their *pod*.
 * `occupied` &rarr; Indicates if a Legend NFT is currently in its * rejuvenation pod* or not.
 
:::
---

<br/>

## Functions

### fetchPodDetails
---

``` sol title="fetchPodDetails | external"
fetchPodDetails(uint256 legendId) → struct IRejuvenationPod.RejuvenationPod
```

Implemented in [**LegendRejuvenation**](./LegendRejuvenation#fetchpoddetails)

---
<br/>

## Events 

### PodStatusChanged
---

``` sol title="PodStatusChanged"
PodStatusChanged(uint256 legendId, bool occupied)
```


Emitted when a Legend either enters or leaves their *rejuvenation pod*. [[`enterRejuvenationPod`](./LegendRejuvenation#enterrejuvenationpod),[`leaveRejuvenationPod`](./LegendRejuvenation#leaverejuvenationpod)]

### PodTokensDecreased
---

``` sol title="PodTokensDecreased"
PodTokensDecreased(uint256 legendId, uint256 newAmount)
```

Emitted when LGND tokens are removed from a Legend's *rejuvenation pod*. [`removeSecuredTokens`](./LegendRejuvenation#removesecuredtokens)

### PodTokensIncreased
---

``` sol title="PodTokensIncreased"
PodTokensIncreased(uint256 legendId, uint256 newAmount)
```

Emitted when additional LGND tokens are added to a Legend's *rejuvenation pod*. [`increaseSecuredTokens`](./LegendRejuvenation#increasesecuredtokens)


### BlendingSlotsRestored
---

``` sol title="BlendingSlotsRestored"
BlendingSlotsRestored(uint256 legendId, uint256 slotsRestored)
```

Emitted when a Legend has its `blendingInstancesUsed` value decreased. [`_restoreBlendingSlots`](./LegendRejuvenation#_restoreblendingslot)









