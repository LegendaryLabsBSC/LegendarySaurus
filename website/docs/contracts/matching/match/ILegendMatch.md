## `ILegendMatch`






### `fetchLegendMatching(uint256 matchingId) → struct ILegendMatch.LegendMatching` (external)






### `MatchingStatusChanged(uint256 matchingId, enum ILegendMatch.MatchingStatus status)`





### `MatchMade(uint256 matchingId, uint256 parent1, uint256 parent2, uint256 childId, uint256 price, enum ILegendMatch.MatchingStatus status)`






### `LegendMatching`


uint256 matchingId


uint256 createdAt


address nftContract


address surrogate


uint256 surrogateToken


address breeder


uint256 breederToken


uint256 childId


uint256 price


enum ILegendMatch.MatchingStatus status



### `MatchingStatus`














