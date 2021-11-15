### `LegendsEscrow.sol`

#### &ast; Contract inspired by and modified from OpenZeppelin's [**Escrow**](https://docs.openzeppelin.com/contracts/4.x/api/utils#Escrow) contract.

``` sol title="imports  | pragma solidity 0.8.4"
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
```

```sol title="Private State Variables"
mapping(address => uint256) private _paymentPending; | payeeAddress → paymentsOwed

mapping(uint256 => mapping(address => uint256)) private _bidPlaced; | listingId → bidderAddress → bidAmount

mapping(address => uint256) private _royaltiesAccrued; | legendCreator → royaltiesAmount
```

Contract which holds payments and bids until the right condition is triggered. 

:::important

This contract is isolated from the rest of the *Laboratory Contracts Ecosystem*. The functions within this contract can only be called by the functions within the [**LegendsMarketClerk**](./LegendsMarketClerk) contract, and only when certain conditions are met.

:::

---
<br/>

## Functions

### depositPayment
---

Called by [**LegendsMarketClerk**](./LegendsMarketClerk#_asynctransfer)

``` sol title="depositPayment | public"
depositPayment(
  uint256 marketplaceFee, 
  uint256 royaltyFee, 
  address payable legendCreator, 
  address payable payee
  )
```

Collects fees and then credits `payee` with payment to be later withdrawn.

:::tip Note

This function is where the collection of `_marketplaceFee` and `_royaltyFee` occurs, prior to crediting payment to the seller. 

Once an *auction* has been won or an *offer* is accepted, the bid placed by the payer will be transferred to the payee via the **Escrow** utilizing this function. That way fees are only collected from the buyer of a listing.

:::

### depositBid
---

Called by [**LegendsMarketClerk**](./LegendsMarketClerk#_asynctransferbid)


``` sol title="depositBid | public"
depositBid(uint256 listingId, address payer) 
```
Stores *auction* and *offer* listing payments as a *credit* attributed to the `payer` address, for a particular listing.

:::important

If the bid is for an *auction* listing and the `payer` has previously bid on the given listing, their previous bid will be incremented with the new bid.

*Offer listings* are not provided functionality to increase their bids.

:::

:::tip Note

If contract space were to allow, or in a future version utilizing EIP-2535, functionality could be extended to provide *offer-makers* and *offer-receivers* the ability to send counter-offers, or simply deny an *offer* of any amount entirely.
     
:::

         

### refundBid
---

Called by [**LegendsMarketClerk**](./LegendsMarketClerk#_refundbid)


``` sol title="refundBid | public"
refundBid(uint256 listingId, address payable payee)
```
Refunds *auction* or *offer* bid back to the `payer` address for a particular listing.

### closeBid
---

Called by [**LegendsMarketClerk**](./LegendsMarketClerk#_closebid)

``` sol title="closeBid | public"
closeBid(uint256 listingId, address payable payer, uint256 marketplaceFee, uint256 royaltyFee, address payable legendCreator, address payable payee)
```

Transfers a winning *auction* bid or accepted *offer* bid from the `payer` and credits it `payee`. 

### withdrawPayments
---

Called by [**LegendsMarketClerk**](./LegendsMarketClerk#_withdrawpayments)


``` sol title="withdrawPayments | external"
withdrawPayments(address payable payee)
```

Transfers all pending *payments* to a payee. 

:::important

This will transfer the sum of all closed listings to the caller. *Auction* and *offer* listings that the caller is owed payment for, but has not had [`closeListing`](../LegendsMarketplace#closelisting) called on by either party, will not be included in the transferred *payment* amount.

:::

### withdrawRoyalties
---

Called by [**LegendsMarketClerk**](./LegendsMarketClerk#_withdrawroyalties)


``` sol title="withdrawRoyalties | external"
withdrawRoyalties(address payable payee)
```

Transfers all accrued *royalties* to a given address. 

---

<br/>

## Getters

### fetchPaymentsPending
---

``` sol title="fetchPaymentsPending | public"
fetchPaymentsPending(address payee) → uint256
```

Returns the amount owed to a given address through successful marketplace *listings*.

### fetchBidPlaced
---

``` sol title="fetchBidPlaced | public"
fetchBidPlaced(uint256 listingId, address bidder) → uint256
```

Returns the bid amount a given address has placed on a particular *auction* or *offer* listing.

### fetchRoyaltiesAccrued
---

``` sol title="fetchRoyaltiesAccrued | public"
fetchRoyaltiesAccrued(address payee) → uint256
```

Returns the amount of royalties accumulated through successful marketplace *listings* owed to a particular address.


---
<br/>

## Events 

### PaymentDeposited
---

``` sol title="PaymentDeposited"
PaymentDeposited(address payee, uint256 amount)
```


Emitted when a *payment* is credited to an address.
[`depositPayment`](#depositpayment)

### PaymentsWithdrawn
---

``` sol title="PaymentsWithdrawn"
PaymentsWithdrawn(address payee, uint256 amount)
```


Emitted when an address collects *payments* owed to them.
[`withdrawPayments`](#withdrawpayments)

### RoyaltiesWithdrawn
---

``` sol title="RoyaltiesWithdrawn"
RoyaltiesWithdrawn(address payee, uint256 amount)
```


Emitted when an address collects *royalties* owed to them.
[`withdrawRoyalties`](#withdrawroyalties)

### BidPlaced
---

``` sol title="BidPlaced"
BidPlaced(uint256 listingId, address payer, uint256 amount)
```


Emitted when a bid is placed on a Legend *auction* or *offer* listing .
[`depositBid`](#depositbid)

### BidRefunded
---

``` sol title="BidRefunded"
BidRefunded(uint256 listingId, address payer, uint256 amount)
```


Emitted when a bid is refunded to the bidder.
[`refundBid`](#refundbid)



