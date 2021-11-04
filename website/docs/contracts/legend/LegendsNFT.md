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


:::important

Legends will be given a temporary *Incubation URI*  when minted, prior to recieveing their
permanent *DNA-Generated URI* via `hatchLegend`

:::

:::note

If space were to of allowed, of ends up allowing in the future, this would be reset to
a Legend base-naming scheme

:::


### `onlyLab()`






### `createLegend(address recipient, uint256 promoId, bool isLegendary)` (external)



Creates a new Legend NFT via redemption of a *promo ticket*.
Called by [`redeemPromoTicket`](docs/lab/LegendsLaboratory#redeemPromoTicket)

:::note

Legends created by this method will be assigned a (0) for both elements in `_legendMetadata.parents[2]`. Any Legend NFT
with (0)s in it's `_legendMetadata.parents[2]` will not be eligible to receive [**Royalties**](docs/info/royalties)

:::




### `blendLegends(address recipient, uint256 parent1, uint256 parent2) → uint256` (external)

Blend Two Legends Together



Blends two eligible Legends DNA, creating a new *child Legend*

:::note

During MVP phase, all new Legends created via the *blending* method will be required to undergo **Incubation**

:::




### `hatchLegend(uint256 legendId, string ipfsHash)` (public)

Your New Specimen Awaits



Removes Legend from *incubation* stage and assigns permanent IPFS-URL

:::note

Requires Legend to met `isHatchable` criteria

:::




### `nameLegend(uint256 legendId, string prefix, string postfix)` (external)

Name Your Lab Specimen



Allows current Legend owner to modify `_legendMetadata.prefix` and `_legendMetadata.postfix`



### `destroyLegend(uint256 legendId)` (public)

You Are Sending Your Legend To It's Death



Allows current Legend owner to send their Legend NFT token to the burn address, destroying it permanently

:::warning

If this is called on a `legendId` that Legend will cease to exist for all eternity.

:::



### `restoreBlendingSlots(uint256 legendId, uint256 regainedSlots)` (public)



Function only callable by [`LegendsLaboratory`](/docs/lab/LegendsLaboratory#restoreBlendingSlots)

### `isBlendable(uint256 legendId) → bool` (public)



Queries whether a Legend can be used to create a *child Legend* or not, based on
comparing `_legendsMetadata.blendingInstancesUsed` against the `_blendingLimit`



### `isHatchable(uint256 legendId) → bool` (public)



Queries whether a Legend is ready to be *hatched* or not, by reading the Legend's age.

:::note

Legends with `_noIncubation(true)` will be able to bypass this check

:::



### `isHatched(uint256 legendId) → bool` (public)



Queries whether a Legend already has *hatched* or not

:::important

Whether a Legend has been hatched or not will not incluence the NFT owner's ability to transfer the token.

:::




### `isNoIncubation(uint256 legendId) → bool` (public)



Queries whether a Legend is allowed to bypass the incubation period



### `isParentOf(uint256 parentLegendId, uint256 childLegendId) → bool` (public)



Queries whether a Legend is the parent of another Legend



### `isListable(uint256 legendId) → bool` (public)



Queries whether a Legend can be used in the **Marketplace**, **MatchingBoard, or **RejuvenationPod**.



### `fetchBlendingCost(uint256 legendId) → uint256` (public)



Returns the cost to blend (2) Legend's together. *baseBlendCost x (totalOffspring + 1) *

:::note

`_legendMetadata.totalOffspring starts at (0), hence the need to increment the *offspring count*
for the purpose of calculating the *blending cost*.

:::




### `fetchLegendMetadata(uint256 legendId) → struct ILegendMetadata.LegendMetadata` (public)



Returns the metadata of a given Legend NFT



### `fetchLegendURI(uint256 legendId) → string` (public)



Returns the URI of a given Legend



### `fetchBlendingRules() → enum LegendsNFT.KinBlendingLevel, uint256, uint256, uint256` (public)



Returns the values of the (4) *blending rules*

:::note Blending Rules:

* [`_kinBlendingLevel`](/docs/info#kinBlendingLevel)
* [`_blendingLimit`](/docs/info#blendingLimit)
* [`_baseBlendingCost`](/docs/info#baseBlendingCost)
* [`_incubationPeriod`](/docs/info#incubationPeriod)

:::


### `fetchIncubationViews() → string[5]` (public)



Returns the current array[5] of strings being used as `incubationChamber`s

### `setBlendingRule(uint256 blendingRule, uint256 newRuleData)` (public)



Function only callable by [**LegendsLaboratory**](/docs/LegendsLaboratory#setBlendingRule)'s `setBlendingRule`

### `setIncubationViews(string[5] newIncubationViews)` (public)



Function only callable by [**LegendsLaboratory**](/docs/LegendsLaboratory#setIncubationViews)'s `setIncubationViews`

### `resetLegendName(uint256 legendId)` (public)



Function only callable by [**LegendsLaboratory**](/docs/LegendsLaboratory#resetLegendName)'s `resetLegendName`




### `KinBlendingLevel`











