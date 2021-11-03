## `LegendsEscrow`



Base escrow contract, holds funds designated for a payee until they
withdraw them.

Intended usage: This contract (and derived escrow contracts) should be a
standalone contract, that only interacts with the contract that instantiated
it. That way, it is guaranteed that all Ether will be handled according to
the `Escrow` rules, and there is no need to check for payable functions or
transfers in the inheritance tree. The contract that uses the escrow as its
payment method should be its owner, and provide public methods redirecting
to the escrow's deposit and withdraw.


### `depositPayment(uint256 marketplaceFee, uint256 royaltyFee, address payable legendCreator, address payable payee)` (public)

Collects fees and then credits seller with listing-payment to be later withdrawn.



This function does the actual collection of {_marketplaceFee} and {_royaltyFee}
prior to crediting payment to the seller. Fee collection at this step makes it easier to
incorporate auction and offer logic into the Escrow and Pull-over-Push patterns.
Collecting here also allows an address to withdraw the accumulation of payments
from successful sales, rather than having to collect payment from each individual sale/



### `depositBid(uint256 listingId, address payer)` (public)

Stores auction-bid or offer-amount as a credit attributed to the payer address.





### `refundBid(uint256 listingId, address payable payee)` (public)

Refunds auction-bid or offer-amount back to the payer address.



It is imperative to set the {_bidPlaced} amount of the payee back to 0 prior to refunding the bid.



### `closeBid(uint256 listingId, address payable payer, uint256 marketplaceFee, uint256 royaltyFee, address payable legendCreator, address payable payee)` (public)

Refunds auction-bid or offer-amount back to the payer address.



It is imperative to set the {_bidPlaced} amount of the payee back to 0 prior to refunding the bid.



### `withdrawPayments(address payable payee)` (external)



Withdraw accumulated balance for a payee, forwarding all gas to the
recipient.

WARNING: Forwarding all gas opens the door to reentrancy vulnerabilities.
Make sure you trust the recipient, or are either following the
checks-effects-interactions pattern or using {ReentrancyGuard}.



### `withdrawRoyalties(address payable payee)` (external)





### `fetchPaymentsPending(address payee) → uint256` (public)

Amount returned is the sum of all unclaimed successful sales and auctions.



Returns the amount owed to an address through Legend sales and auctions.



### `fetchBidPlaced(uint256 listingId, address bidder) → uint256` (public)

Amount returned is the individual bid an address has placed on each unique auction Id.



Returns the bid amount an address has placed on a Legend auction.



### `fetchRoyaltiesAccrued(address payee) → uint256` (public)

Amount returned is the sum of all royalties owed to the Legend-Creator-Address,
from all Legends the Creator address has previously Blended.



Returns the amount of royalties accumulated through sales and auctions owed to a Legend's creator.




### `PaymentDeposited(address payee, uint256 amount)`





### `PaymentsWithdrawn(address payee, uint256 amount)`





### `RoyaltiesWithdrawn(address payee, uint256 amount)`





### `BidPlaced(uint256 listingId, address payer, uint256 amount)`





### `BidRefunded(uint256 listingId, address payer, uint256 amount)`







