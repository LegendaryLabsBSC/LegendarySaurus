## `LegendsNFT`



Contract which creates and manages the lifecycle of an ERC721 Legend NFT.
Inherits from {ILegendMetadata} to define a Legend NFT.

New Legend NFTs can only be created by one of (2) methods:
 1. Redeeming a `promoTicket` obtained from a Legendary Lab's event. This method calls `createLegend`.
 2. Blending two Legend NFTs together to make a `childLegend`. This method utilizes `blendLegends`.

Laboratory State variables such as `_kinBlendingLevel` and `_baseBlendingCost` are all manages and set by {LegendsLaboratory}
Each of these variables are private and have a corresponding public getter function. Due to smart-contract size limitations (EIP-170)
many of these variable's getters have be combines i.e. `fetchBlendingRules' which returns (4) values. Once again due to reaching size limits 
in this contract there are a few state variables with combined setter functions. However, with `setBlendingRule` the **`ADMIN`** caller 
specifies which (1) of the (4) **Blending Rules** they wish to set.



### `onlyLab()`






### `createLegend(address recipient, uint256 promoId, bool isLegendary)` (external)

@dev





### `blendLegends(address recipient, uint256 parent1, uint256 parent2, bool skipIncubation) → uint256` (external)

@dev





### `hatchLegend(uint256 legendId, string ipfsHash)` (public)

@dev





### `nameLegend(uint256 legendId, string prefix, string postfix)` (external)

@dev





### `destroyLegend(uint256 legendId)` (public)

@dev





### `restoreBlendingSlots(uint256 legendId, uint256 regainedSlots)` (public)

@dev





### `isBlendable(uint256 legendId) → bool` (public)

@dev





### `isHatchable(uint256 legendId) → bool` (public)

@dev





### `isHatched(uint256 legendId) → bool` (public)

@dev





### `isNoIncubation(uint256 legendId) → bool` (public)

@dev





### `isParentOf(uint256 parentLegendId, uint256 childLegendId) → bool` (public)

@dev





### `isListable(uint256 legendId) → bool` (public)

@dev





### `fetchBlendingCost(uint256 legendId) → uint256` (public)

@dev





### `fetchLegendMetadata(uint256 legendId) → struct ILegendMetadata.LegendMetadata` (public)

@dev





### `fetchLegendURI(uint256 legendId) → string` (public)

@dev





### `fetchBlendingRules() → enum LegendsNFT.KinBlendingLevel, uint256, uint256, uint256` (public)

@dev





### `fetchIncubationViews() → string[5]` (public)

@dev





### `setBlendingRule(uint256 blendingRule, uint256 newRuleData)` (public)

@dev





### `setIncubationViews(string[5] newIncubationViews)` (public)

@dev





### `resetLegendName(uint256 legendId)` (public)

@dev








### `KinBlendingLevel`











