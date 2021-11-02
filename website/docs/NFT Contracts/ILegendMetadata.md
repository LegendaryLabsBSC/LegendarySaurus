## `ILegendMetadata`



Interface used by {LegendsNFT}. Outlines the metadata of a Legend NFT.


### `fetchLegendMetadata(uint256 legendId) → struct ILegendMetadata.LegendMetadata` (external)



Implemented in {LegendsNFT}


### `LegendCreated(uint256 legendId, address creator)`



Emitted when a new Legend is minted.

### `LegendHatched(uint256 legendId, uint256 birthday)`



Emitted when a Legend is hatched.

### `LegendNamed(uint256 legendId, string prefix, string postfix)`



Emitted when a Legend has it's Prefix & Postfix changed.

### `LegendsBlended(uint256 parent1, uint256 parent2, uint256 childId)`



Emitted when two Legends are Blended together.

### `LegendDestroyed(uint256 legendId)`



Emitted when a Legend NFT is sent to the burn address.


### `LegendMetadata`


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



