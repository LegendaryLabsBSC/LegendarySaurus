<!-- ## `LaboratoryGovernor`


``` sol title="imports  | pragma solidity 0.8.4"
import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
```

### constructor


``` sol title="constructor(contract ERC20Votes _token)` (public)


### votingDelay


``` sol title="votingDelay() → uint256` (public)


### votingPeriod


``` sol title="votingPeriod() → uint256` (public)


### quorum


``` sol title="quorum(uint256 blockNumber) → uint256` (public)



### getVotes

``` sol title="getVotes(address account, uint256 blockNumber) → uint256` (public)


---
<br/>

## Events 

### Proposal Canceled (uint256)

ProposalCanceled (uint256)
Parameters
uint256 proposalId

### ProposalCreated (uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)

ProposalCreated (uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)
Parameters
uint256 proposalId
address proposer
address[] targets
uint256[] values
string[] signatures
bytes[] calldatas
uint256 startBlock
uint256 endBlock
string description

### ProposalExecuted (uint256)

ProposalExecuted (uint256)
Parameters
uint256 proposalId

### QuorumNumeratorUpdated (uint256,uint256)

QuorumNumeratorUpdated (uint256,uint256)
Parameters
uint256 oldQuorumNumerator
uint256 newQuorumNumerator

### VoteCast (address,uint256,uint8,uint256,string)

VoteCast (address,uint256,uint8,uint256,string)
Parameters
address voter
uint256 proposalId
uint8 support
uint256 weight
string reason


## Terminology
--- -->

![Under Construction](../../../static/img/underConstruction.png)