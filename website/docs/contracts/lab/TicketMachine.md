## `TicketMachine`






### `_createPromoEvent(string name, uint256 duration, bool isUnrestricted, uint256 maxTickets) → uint256` (internal)

Dispenses Tickets For A Legendary Labs Promo Event



Calls `_dispensePromoTicket` from [`TicketMachine`](/docs/TicketMachine).
setsetewrw3rtwetewtewtetet

### `_dispensePromoTicket(uint256 promoId, address recipient, uint256 ticketAmount)` (internal)





### `_redeemPromoTicket(uint256 promoId, address recipient)` (internal)

@dev






### `_closePromoEvent(uint256 promoId)` (internal)





### `isClaimed(uint256 promoId, address recipient) → bool` (public)





### `fetchTotalPromoCount() → struct Counters.Counter, struct Counters.Counter` (public)





### `fetchPromoEvent(uint256 promoId) → struct TicketMachine.PromoEvent` (public)





### `fetchMaxTicketsDispensable(uint256 promoId) → uint256` (public)





### `fetchRedeemableTickets(uint256 promoId, address recipient) → uint256` (public)






### `PromoCreated(uint256 promoId, string promoName, uint256 expireTime)`





### `PromoClosed(uint256 promoId, uint256 totalDispensed, uint256 totalRedeemed)`





### `TicketDispensed(uint256 promoId, uint256 currentDispensed)`





### `TicketRedeemed(uint256 promoId, uint256 currentRedeemed)`






### `PromoEvent`


string promoName


uint256 promoId


uint256 startTime


uint256 expireTime


bool isUnrestricted


bool ticketLimit


bool promoClosed


struct Counters.Counter ticketsClaimed


struct Counters.Counter ticketsRedeemed



