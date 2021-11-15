### `ILegendMetadata.sol`



Interface used by [**LegendsNFT**](./LegendsNFT). Outlines the metadata of a Legend NFT.


## Legend Metadata
---


```sol title="LegendMetadata"
uint256 id

string season

string prefix

string postfix

uint256[2] parents

uint256 birthday

uint256 blendingInstancesUsed

uint256 totalOffspring

address payable legendCreator

bool isLegendary

bool isHatched

bool isDestroyed
```
:::note Info

 * `id` &rarr; Numerical ID of a Legend NFT.
 * `season` &rarr; Season Legend NFT was created during.
 * `prefix` &rarr; First element of Legend NFT naming scheme.
 * `postfix` &rarr; Second element of Legend NFT naming scheme.
 * `parents[2]` &rarr; IDs of Legend NFTs used to create *this* Legend.
 * `birthday` &rarr; Time Legend NFT was minted, in Block/UNIX time.
 * `blendingInstancesUsed` &rarr; *Blending Slots* used by a Legend. Can be decreased in the [**LegendRejuvenation**](../rejuvenation/LegendRejuvenation#restoreblendingslot).
 * `totalOffspring` &rarr; Total number of times a Legend NFT has created a *child Legend*. Can never be decreased.
 * `legendCreator` &rarr; Address of Legend NFT creator. Legends created via a *promo event* will be assigned the *zero address*.
 * `isLegendary` &rarr; Indicates if a Legend NFT is Legendary or not.
 * `isHatched` &rarr; Indicates if a Legend NFT has been *hatched* or not.
 * `isDestroyed` &rarr; Indicates if a Legend NFT has been sent to the burn address, destroyed for eternity, or not.
 
:::
---

<br/>

## Getters

### fetchLegendMetadata
---

``` sol title="fetchLegendMetadata | external"
fetchLegendMetadata(uint256 legendId) → struct ILegendMetadata.LegendMetadata
```

Implemented in [**LegendsNFT**](./LegendsNFT)


---
<br/>

## Events 

### LegendCreated
---

``` sol title="LegendCreated"
LegendCreated(uint256 legendId, address creator)
```

Emitted when a new Legend is minted.


### LegendHatched
---

``` sol title="LegendHatched"
LegendHatched(uint256 legendId, uint256 birthday)
```
Emitted when a Legend is hatched.

### LegendNamed
---

``` sol title="LegendNamed"
LegendNamed(uint256 legendId, string prefix, string postfix)
```

Emitted when a Legend has it's Prefix & Postfix changed.


### LegendsBlended
---

``` sol title="LegendsBlended"
LegendsBlended(uint256 parent1, uint256 parent2, uint256 childId)
```

Emitted when two Legends are Blended together.


### LegendDestroyed
---

``` sol title="LegendDestroyed"
LegendDestroyed(uint256 legendId)
```

Emitted when a Legend NFT is sent to the burn address.




