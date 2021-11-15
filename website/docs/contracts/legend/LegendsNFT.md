### `LegendsNFT.sol`

``` sol title="imports  | pragma solidity 0.8.4"
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../lab/LegendsLaboratory.sol";
import "./ILegendMetadata.sol";
```

```sol title="onlyLab | modifier"
onlyLab(); →  only LegendsLaboratory Contract can call
```

```sol title="KinBlendingLevel | enum"
{ None, Parents, Siblings }
```


```sol title="Private State Variables"
Counters.Counter private _legendIds;

KinBlendingLevel private _kinBlendingLevel;

uint256 private _blendingLimit;

uint256 private _baseBlendingCost;

uint256 private _incubationPeriod;

mapping(uint256 => LegendMetadata) private _legendMetadata; | legendId → metadata 

mapping(uint256 => string) private _legendURI; | legendId → ipfsHash 

mapping(uint256 => bool) private _noIncubation; | legendId → skipIncubation
 
mapping(uint256 => mapping(uint256 => bool)) private _parentOf; | parentId → childId → isParent 
```

The **LegendsNFT** contract creates and manages the lifecycle of an ERC721 Legend NFT.
Inherits from [**ILegendMetadata**](./ILegendMetadata) to define a Legend NFT.

:::important

#### New Legend NFTs can only be created by one of (2) methods:

 1. Redeeming a *promo ticket* obtained from a Legendary Lab's event. This method calls `createLegend`.
 2. Blending two Legend NFTs together to make a *child Legend*. This method utilizes `blendLegends`.

:::

:::tip Note

NFT Laboratory state variables such as `_kinBlendingLevel` and `_baseBlendingCost` are all managed and set by [**LegendsLaboratory**](../lab/LegendsLaboratory#setters)

Each of these variables are private, and have a corresponding public getter function within this contract. 

:::

<br/>

## Functions

### createLegend 
---

``` sol title="createLegend | external | onlyLab"
createLegend(address recipient, uint256 promoId, bool isLegendary)
```


Creates a new Legend NFT via redemption of a *promo ticket*.
Called by [`redeemPromoTicket`](../lab/LegendsLaboratory#redeemPromoTicket).

:::tip Note

Legends created by this method will be assigned a `address(0)` for both elements in `_legendMetadata.parents`. Any Legend NFT
with a `address(0)` value in `_legendMetadata.parents[i]` will not be eligible to dispense *royalties*.

:::


### blendLegends
---

> *Blend Two Legends Together*

<br/>

``` sol title="blendLegends | external"
blendLegends(address recipient, uint256 parent1, uint256 parent2) → uint256
```

Blends two eligible Legends' DNA together, creating a new *child Legend*.

:::important

During MVP phase, all new Legends created via `blendLegends` will be required to undergo **Incubation**.

:::


### hatchLegend 
---

> *Your New Specimen Awaits*

<br/>

``` sol title="hatchLegend | public"
hatchLegend(uint256 legendId, string ipfsHash)
```

Removes Legend from *incubation stage* and assigns permanent IPFS-URL

:::important

Requires Legend to met `isHatchable` criteria

:::


### nameLegend 
---

> *Name Your Lab Specimen*

<br/>

``` sol title="nameLegend | external"
nameLegend(uint256 legendId, string prefix, string postfix)
```

Allows current Legend owner to modify `_legendMetadata.prefix` and `_legendMetadata.postfix`.

:::tip Note

Currently Legends are minted with empty strings for their `prefix` & `postfix` elements. Legends that are not named will display a base-name schema, i.e. *Lab Specimen #`legendId`*. 

A basing-naming functionality has been written for the smart contracts. However, due to hitting size constraints in this contract, it had to be remove. This functionality will have to be imposed by the front end.

If space were to of allowed, of ends up allowing in the future, this will be added back into the contract.

:::



### destroyLegend 
---

> *You Are Sending Your Legend To It's Death*

<br/>

``` sol title="destroyLegend | public"
destroyLegend(uint256 legendId)
```

Allows current Legend owner to send their Legend NFT token to the *zero address*, destroying it permanently.

:::warning

If this is called on a `legendId` that Legend will cease to exist for all eternity.

:::


### restoreBlendingSlots 
---

Called from [**LegendRejuvenation &rarr; LegendsLaboratory**](../lab/LegendsLaboratory#restoreblendingslots)

``` sol title="restoreBlendingSlots | public | onlyLab"
restoreBlendingSlots(uint256 legendId, uint256 regainedSlots)
```

Function only callable by **LegendsLaboratory** 


### approve
---

``` sol title="approve | external"
function approve(address to, uint256 tokenId)
```

> Gives permission to `to` to transfer `tokenId` token to another account.
> The approval is cleared when the token is transferred.
>
> Only a single account can be approved at a time, so approving the zero address clears previous approvals.
>
> Requirements:
>
> * The caller must own the token or be an approved operator.
> * `tokenId` must exist.
>
> Emits an `Approval` event.
> 

### _formatIncubationURI 
---

``` sol title="_formatIncubationURI | private"
_formatIncubationURI(uint256 newLegendId, string memory data) → string
```
Formats a string to be used as the *incubation stage* URI.

### _randomIncubationChamber 
---

``` sol title="_randomIncubationChamber | private"
_randomIncubationChamber() → uint256
```

Returns a "random" `_incubationViews` index for the Legend to display during the incubation stage.

:::important

Relying on the blockchain for randomness has it's well documented flaws. So it should be noted that
the`incubationChamber` a Legend is assigned has zero influence over the post-incubation appearance
of the Legend, or otherwise influence value in any way.

:::
### _mintLegend 
---

``` sol title="_mintLegend | private"
_mintLegend(
    address recipient,
    uint256 newLegendId,
    uint256[2] memory parents,
    string memory uri,
    bool isLegendary,
    bool skipIncubation
)
```
Mints a brand new Legend NFT and assigns it metadata.

:::tip Note

Legends will be given a temporary *Incubation URI*  when minted, prior to receiving their
permanent *DNA-Generated URI* via `hatchLegend`

:::

:::tip note

To accommodate [**Matching**](../matching/LegendsMatchingBoard), `_legendMetadata.legendCreator` is assigned to a Legend's second parent, `_legendMatching.breeder`, during `_mintLegend`.

:::

### _setLegendURI 
---

``` sol title="_setLegendURI | private"
_setLegendURI(uint256 legendId, string memory ipfsHash)
```

Sets the Legend NFT's URI

### _notSiblings 
---

``` sol title="_notSiblings | private"
_notSiblings(uint256[2] memory parents1,uint256[2] memory parents2) → bool
```

 Inquires if Legends are siblings

### _notParent 
---

``` sol title="_notParent | private"
_notParent(uint256 parent1, uint256 parent2) → bool
```

Inquires if Legends are each other's parents

---

<br/>


## Queries


### isBlendable 
---

``` sol title="isBlendable | public"
isBlendable(uint256 legendId) → bool
```



Queries whether a Legend can be used to create a *child Legend* or not, based on
comparing `_legendsMetadata.blendingInstancesUsed` against the `_blendingLimit`.

### isHatchable 
---

``` sol title="isHatchable | public"
isHatchable(uint256 legendId) → bool
```

Queries whether a Legend is ready to be *hatched* or not, by reading the Legend's age.

:::tip Note

Legends with `_noIncubation == true` will be able to bypass this check

:::

### isHatched 
---

``` sol title="isHatched | public"
isHatched(uint256 legendId) → bool
```

Queries whether a Legend already has *hatched* or not

:::important

Whether a Legend has been hatched or not, will not impact the NFT owner's ability to transfer the token.

:::


### isNoIncubation 
---

``` sol title="isNoIncubation | public"
isNoIncubation(uint256 legendId) → bool
```



Queries whether a Legend is allowed to bypass the incubation period

### isParentOf 
---

``` sol title="isParentOf | public"
isParentOf(uint256 parentLegendId, uint256 childLegendId) → bool
```

Queries whether a Legend is the parent of another Legend

### isListable 
---

``` sol title="isListable | public"
isListable(uint256 legendId) → bool
```



Queries whether a Legend can be used in the [**Marketplace**](../marketplace/LegendsMarketplace), [**MatchingBoard**](../matching/LegendsMatchingBoard), or [**RejuvenationPod**](../rejuvenation/LegendRejuvenation).

---

<br/>

## Getters

### fetchBlendingCost 
---

``` sol title="fetchBlendingCost | public"
fetchBlendingCost(uint256 legendId) → uint256
```

Returns the cost to blend (1) Legend NFT : *baseBlendCost x (totalOffspring + 1) *

### fetchLegendMetadata 
---

``` sol title="fetchLegendMetadata | public"
fetchLegendMetadata(uint256 legendId) → struct ILegendMetadata.LegendMetadata
```



Returns the metadata of a given Legend NFT

### fetchLegendURI 
---

``` sol title="fetchLegendURI | public"
fetchLegendURI(uint256 legendId) → string
```



Returns the URI of a given Legend


### fetchBlendingRules 
---

``` sol title="fetchBlendingRules | public"
fetchBlendingRules() → enum LegendsNFT.KinBlendingLevel, uint256, uint256, uint256
```


Returns the values of the (4) *blending rules*

:::note info
#### Blending Rules:

* `_kinBlendingLevel`
* `_blendingLimit`
* `_baseBlendingCost`
* `_incubationPeriod`

:::

### fetchIncubationViews 
---

``` sol title="fetchIncubationViews | public"
fetchIncubationViews() → string[5]
```

Returns the current array[5] of strings that can be used as `incubationChamber`s

---

### balanceOf
---

``` sol title="balanceOf | external"
function balanceOf(address owner) → uint256
```
>  Returns the number of tokens in ``owner``'s account.

### ownerOf
---

``` sol title="ownerOf | external"
function ownerOf(uint256 tokenId) → address
```

> Returns the owner of the `tokenId` token.
> 
> Requirements:
> 
> * `tokenId` must exist.
>


### tokenOfOwnerByIndex
---

``` sol title="tokenOfOwnerByIndex | external"
function tokenOfOwnerByIndex(address owner, uint256 index) → uint256
```

> Returns a token ID owned by `owner` at a given `index` of its token list.
> Use along with `balanceOf` to enumerate all of ``owner``'s tokens.


### totalSupply
---

``` sol title="totalSupply | external"
function totalSupply() → uint256
```

> Returns the total amount of tokens stored by the contract.


### tokenByIndex
---

``` sol title="tokenByIndex | external"
function tokenByIndex(uint256 index) → uint256
```

> Returns a token ID at a given `index` of all the tokens stored by the contract.
> Use along with `totalSupply` to enumerate all tokens.

---

<br/>

## Setters

### setBlendingRule 
---


``` sol title="setBlendingRule | public | onlyLab"
setBlendingRule(uint256 blendingRule, uint256 newRuleData)
```

Function only callable by [**LegendsLaboratory**](../lab/LegendsLaboratory#setblendingerule).

:::tip Note

Due to smart-contract size limitations, (EIP-170),
the (4) variables that make up the *blending limits* share the same setter.

:::

:::note info
#### Setting Blending Rules:

* `_kinBlendingLevel` &rarr; { blendingRule : 0, newRuleData: Between (0) and (2) }
* `_blendingLimit` &rarr; { blendingRule : 1, newRuleData: Standard number }
* `_baseBlendingCost` &rarr; { blendingRule : 2, newRuleData: In LGND tokens }
* `_incubationPeriod` &rarr; { blendingRule : 3, newRuleData: In seconds }

:::



### setIncubationViews 
---

``` sol title="setIncubationViews | public | onlyLab"
setIncubationViews(string[5] newIncubationViews)
```


Function only callable by **LegendsLaboratory** [`setIncubationViews`](../lab/LegendsLaboratory#setincubationviews) 
../lab/LegendsLaboratory#setincubationviews

### resetLegendName 
---

``` sol title="resetLegendName | public | onlyLab"
resetLegendName(uint256 legendId)
```

Resets a Legends NFT's `prefix` & `postfix` elements to empty strings. Function only callable by **LegendsLaboratory** [`resetLegendName`](../lab/Admin%20Overrides#reset-legend-name) 

---

<br/>

## Terminology
---

* *Blending* &rarr; The process where (2) Legend NFTs store their DNA information together to create a *child Legend*.
* *Child Legend* &rarr; A new Legend NFT that is created from two existing Legend NFTs *blending*.
* *Incubation* &rarr; The gestation phase *child Legends* undergo where their parents' DNA is unraveled and combines to form the new Legend's DNA.
* *Hatched* &rarr; After a *child Legend* is fully formed it is ready to be removed from incubation.
* *Legendary* &rarr; A Legend NFT with genetic data so rare, that there might only ever be one in existence.
* *Incubation URI* &rarr; The URI assigned to a *child Legend* composed of its parent Legends DNA. 
* *DNA Generated URI* &rarr; The permanent URI assigned to a *child Legend* when it is *hatched* from its *incubator*.

