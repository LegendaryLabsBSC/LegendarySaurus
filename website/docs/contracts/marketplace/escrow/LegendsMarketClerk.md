## `LegendsMarketClerk`



Simple implementation of a
https://consensys.github.io/smart-contract-best-practices/recommendations/#favor-pull-over-push-for-external-calls[pull-payment]
strategy, where the paying contract doesn't interact directly with the
receiver account, which must withdraw its payments itself.

Pull-payments are often considered the best practice when it comes to sending
Ether, security-wise. It prevents recipients from blocking execution, and
eliminates reentrancy concerns.

TIP: If you would like to learn more about reentrancy and alternative ways
to protect against it, check out our blog post
https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].

To use, derive from the `PullPayment` contract, and use {_asyncTransfer}
instead of Solidity's `transfer` function. Payees can query their due
payments with {payments}, and retrieve them with {withdrawPayments}.


### `constructor()` (internal)





### `_asyncTransfer(uint256 price, uint256 marketplaceFee, uint256 royaltyFee, address payable legendCreator, address payable payee)` (internal)



Called by the payer to store the sent amount as credit to be pulled.
Funds sent in this way are stored in an intermediate {Escrow} contract, so
there is no danger of them being spent before withdrawal. --OpenZeppelin

Calls the {depositPayment} function in the {LegendsEscrow} contract.



### `_asyncTransferBid(uint256 amount, uint256 listingId, address payer)` (internal)



Calls the {depositBid} function in the {LegendsEscrow} contract.



### `_refundBid(uint256 listingId, address payable payee)` (internal)



Calls the {refundBid} function in the {LegendsEscrow} contract.



### `_closeBid(uint256 listingId, address payable payer, uint256 marketplaceFee, uint256 royaltyFee, address payable legendCreator, address payable payee)` (internal)



Calls the {closeBid} function in the {LegendsEscrow} contract.



### `_withdrawPayments(address payable payee)` (internal)



Withdraw accumulated payments, forwarding all gas to the recipient.



### `_withdrawRoyalties(address payable payee)` (internal)





### `fetchPaymentsPending(address payee) → uint256` (public)



Calls the getter for {_paymentsPending} inside the {LegendsEscrow} contract.

### `fetchBidPlaced(uint256 listingId, address bidder) → uint256` (public)



Calls the getter for {_bidPlaced} inside the {LegendsEscrow} contract.

### `fetchRoyaltiesAccrued(address payee) → uint256` (public)



Calls the getter for {_royaltiesAccrued} inside the {LegendsEscrow} contract.




