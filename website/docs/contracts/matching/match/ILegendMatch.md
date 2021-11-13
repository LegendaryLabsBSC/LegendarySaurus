### `ILegendMatch.sol`



Interface used by [**LegendMatching**](./LegendMatching). Outlines a *matching listing*.


``` sol title="MatchingStatus | enum"
{ Null, Open, Closed, Cancelled }
```

## Legend Matching
---

``` sol title="LegendMatching"
uint256 matchingId

uint256 createdAt

address nftContract

address surrogate

uint256 surrogateLegend

address blender

uint256 blenderLegend

uint256 childId

uint256 price

enum ILegendMatch.MatchingStatus status
```

:::note Info

* `matchingId` &rarr; ID of Legend *matching listing*.
* `createdAt` &rarr; Blocktime the listing was created at
* `nftContract` &rarr; Address of the ERC721 contract
* `surrogate` &rarr; Address that created the *matching listing*.
* `surrogateLegend` &rarr; ID of Legend NFT the *surrogate* listed for *matching*.
* `blender` &rarr; Address that purchases the *matching listing*.
* `blenderLegend` &rarr; ID of Legend NFT the *blender* uses to blend with the `surrogateLegend`.
* `childId` &rarr; ID of Legend NFT offspring created via the *matching listing*.
* `price` &rarr; Amount of LGND tokens the `surrogate` request in order for a player to blend with their `surrogateLegend`. This price does not factor in the LGND token burn associated with *blending*.
* `status` &rarr; Indicates whether a given *matching listing* is either `Open`, `Closed`, or `Cancelled`
:::

---

<br/>

## Functions

### fetchLegendMatching
---

``` sol title="fetchLegendMatching | external"
fetchLegendMatching(uint256 matchingId) → struct ILegendMatch.LegendMatching
```

Implemented in [**LegendsMatchingBoard**](../LegendsMatchingBoard#fetchlegendmatching)


---
<br/>

## Events 

### MatchingStatusChanged
---

``` sol title="MatchingStatusChanged"
MatchingStatusChanged(uint256 matchingId, enum ILegendMatch.MatchingStatus status)
```

Emitted when a *matching listing* has a status change.
[[ `_createLegendMatching`](./LegendMatching#_createlegendmatching),
[`_matchWithLegend`](./LegendMatching#_matchwithlegend),
[`_cancelLegendMatching`](./LegendMatching#_cancellegendmatching) ]

### MatchMade
---

``` sol title="MatchMade"
MatchMade(uint256 matchingId, uint256 parent1, uint256 parent2, uint256 childId, uint256 price)
```

Emitted when a match has been made and a new *child Legend* has been created from *blending* via a *matching listing*.
[`matchingWithLegend`](../LegendsMatchingBoard#matchwithlegend)




