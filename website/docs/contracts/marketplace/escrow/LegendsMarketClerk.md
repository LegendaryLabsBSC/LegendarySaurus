### `LegendsMarketClerk.sol` 

#### &ast; Contract inspired by and modified from OpenZeppelin's [**PullPayment**](https://docs.openzeppelin.com/contracts/4.x/api/security#PullPayment) contract.

``` sol title="imports  | pragma solidity 0.8.4"
import "./LegendsEscrow.sol";
```

```sol title="Internal State Variables"
mapping(uint256 => mapping(address => bool)) internal _isBidRefundable; | listingId → bidderAddress → canWithdrawBid
```

```sol title="Private State Variables"
LegendsEscrow private immutable _escrow;
```

The **LegendsMarketClerk** contract is used by the [**LegendsMarketplace**](../LegendsMarketplace) to handle the transferring of bids and payments to the [**LegendsEscrow**](./LegendsEscrow) contract. 

:::important

The functions inside this contract can **ONLY** be called when certain conditions are met. Additionally, the functions inside this contract are the **ONLY** functions capable of calling functions inside the **LegendsEscrow** contract.

:::


---
<br/>

## Functions

### _asyncTransfer
---

``` sol title="_asyncTransfer | internal"
_asyncTransfer(uint256 price, uint256 marketplaceFee, uint256 royaltyFee, address payable legendCreator, address payable payee)
```

> Called by the payer to store the sent amount as *credit* to be pulled.
Funds sent in this way are stored in an intermediate Escrow contract, so
there is no danger of them being spent before withdrawal. 

Calls `depositPayment` from [**LegendsEscrow**](./LegendsEscrow#depositpayment).

### _asyncTransferBid
---

``` sol title="_asyncTransferBid | internal"
_asyncTransferBid(uint256 amount, uint256 listingId, address payer)
```

Calls `depositBid` from [**LegendsEscrow**](./LegendsEscrow#depositbid).

:::important

Both *auction* and *offer listings* utilize `_asyncTransferBid` in order to protect the funds of the payer as well as guarantee the existence of the funds for the payee.

The bid is stored as a *credit* attributed to the payers address, as opposed to the payees address.

Should a payer be outbid, or in the case of an *offer* the seller not accept their offerAmount,
the bid is unlocked for the payer to later withdraw via calling [`refundBid`](../LegendsMarketplace#refundbid).

  
:::

### _refundBid
---

Called from [**LegendsMarketplace**](./LegendsMarketplace#refundbid)

``` sol title="_refundBid | internal"
_refundBid(uint256 listingId, address payable payee)
```

Calls `refundBid` from [**LegendsEscrow**](./LegendsEscrow#refundbid).

### _closeBid
---

Called from [**LegendsMarketplace**](./LegendsMarketplacew#closebid)

``` sol title="_closeBid | internal"
_closeBid(uint256 listingId, address payable payer, uint256 marketplaceFee, uint256 royaltyFee, address payable legendCreator, address payable payee)
```


Calls `closeBid` from [**LegendsEscrow**](./LegendsEscrow#closebid).

### _withdrawPayments
---

Called from [**LegendsMarketplace**](./LegendsMarketplace#withdrawpayments).

``` sol title="_withdrawPayments | internal"
_withdrawPayments(address payable payee
```

> Withdraw accumulated payments, forwarding all gas to the recipient.

Calls `withdrawPayments` from [**LegendsEscrow**](./LegendsEscrow#withdrawpayments).

:::caution Requirements:

* Payments pending must be greater than (0)

:::

### _withdrawRoyalties
---

Called from [**LegendsMarketplace**](./LegendsMarketplace#withdrawroyalties)

``` sol title="_withdrawRoyalties | internal"
_withdrawRoyalties(address payable payee) 
```

Calls `withdrawRoyalties` from [**LegendsEscrow**](./LegendsEscrow#withdrawroyalties).

---

<br/>

## Getters

### fetchPaymentsPending
---

``` sol title="fetchPaymentsPending | public"
fetchPaymentsPending(address payee) → uint256
```

Returns the total amount of payments pending for a given address. Calls `fetchPaymentsPending` from [**LegendsEscrow**](./LegendsEscrow#fetchpaymentspending).

### fetchBidPlaced
---

``` sol title="fetchBidPlaced | public"
fetchBidPlaced(uint256 listingId, address bidder) → uint256
```

Returns the total bid amount a given address has placed on a particular listing. Calls `fetchBidPlaced` from [**LegendsEscrow**](./LegendsEscrow#fetchbidplaced).

### fetchRoyaltiesAccrued
---

``` sol title="fetchRoyaltiesAccrued | public"
fetchRoyaltiesAccrued(address payee) → uint256
```


Returns the total amount of royalties accrued for a given address. Calls `fetchRoyaltiesAccrued` from [**LegendsEscrow**](./LegendsEscrow#fetchroyaltiesaccrued).




