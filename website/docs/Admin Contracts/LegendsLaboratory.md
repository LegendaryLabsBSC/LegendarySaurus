## `LegendsLaboratory`






### `getChildContracts() → contract LegendsNFT, contract LegendToken, contract LegendRejuvenation, contract LegendsMarketplace, contract LegendsMatchingBoard` (public)





### `createPromoEvent(string eventName, uint256 duration, bool isUnrestricted, uint256 maxTickets, bool skipIncubation)` (external)

Creates A New Legendary Labs' Promo Event!



Calls `_createPromoEvent` from [`TicketMachine`](/docs/TicketMachine). Can only be called by a `LAB_TECH`.

**Promo Events** can be created (1) of (2) ways:
 1. Unrestricted Promo Event => @param isUnrestricted == true
 2. Restricted Promo Event => @param isUnrestricted == false

In an *Unrestricted* **Promo Event** users have the opportunity to call `dispensePromoTicket` without having admin access.
Each address is permitted to claim one ticket from the **Ticket Dispenser**.

In a *Restricted* **Promo Event** only addresses with `LAB_TECH` access are allowed to dispense tickets for promos.
Another major difference with *Restricted* events is that admin have the ability to dispense a ticket
to an address other than the one calling `dispensePromoTicket`. Whereas addresses calling `dispensePromoTicket` in an *Unrestricted*
event should only be allowed to dispense a ticket to the calling address.


:::caution

The only addresses that should be able to call this function is one approved with the `LAB_TECH` **Access Control Role**.
To check if an address is approved to use this function `hasRole(LAB_TECH, account)` can be called.

:::



### `dispensePromoTicket(uint256 promoId, address recipient, uint256 ticketAmount)` (public)

Redeems (1) Legendary Labs' Promo Event Tickets For A Brand Spankin New Legend NFT



Calls `_redeemPromoTicket` from [`TicketMachine`](/docs/TicketMachine). Once a ticket has been successfully redeemed, `createLegend` is called
from {LegendsNFT}. This mints and issues a new Legend NFT token to the ticket redeemer.



### `redeemPromoTicket(uint256 promoId)` (public)

Redeems (1) Legendary Labs' Promo Event Tickets For A Brand Spankin New Legend NFT



Calls `_redeemPromoTicket` from [`TicketMachine`](/docs/TicketMachine). Once a ticket has been successfully redeemed, `createLegend` is called
from {LegendsNFT}. This mints and issues a new Legend NFT token to the ticket redeemer.



### `closePromoEvent(uint256 promoId)` (public)





### `restoreBlendingSlots(uint256 legendId, uint256 regainedSlots)` (public)





### `mintLegendaryLegend(address recipient, uint256 promoId)` (public)





### `labBurn(uint256 amount)` (public)





### `isHatched(uint256 legendId) → bool` (public)





### `isListable(uint256 legendId) → bool` (public)





### `isBlendable(uint256 legendId) → bool` (public)





### `isPromoIncubated(uint256 promoId) → bool` (public)





### `fetchSeason() → string` (public)





### `fetchBlendingCount(uint256 legendId) → uint256` (public)





### `fetchBlendingCost(uint256 legendId) → uint256` (public)





### `fetchRoyaltyRecipient(uint256 legendId) → address payable` (public)





### `setSeason(string newSeason)` (public)





### `setIncubationViews(string[5] newIncubationViews)` (public)





### `setBlendingRule(uint256 blendingRule, uint256 newRuleData)` (public)





### `setMarketplaceRule(uint256 marketplaceRule, uint256 newRuleData)` (public)





### `setAuctionDurations(uint256[3] newAuctionDurations)` (public)





### `setMinimumSecure(uint256 newMinimumSecure)` (public)





### `setMaxMultiplier(uint256 newMaxMultiplier)` (public)





### `setReJuPerBlock(uint256 newReJuEmissionRate)` (public)





### `setReJuNeededPerSlot(uint256 newReJuNeededPerSlot)` (public)





### `transferLaboratoryAdmin(address currentAdmin, address newAdmin)` (public)





### `reportVulgarLegend(uint256 legendId)` (public)

Once an address reports a @param legendId they can not report
that @param legendId again, even after the name reset.
This is to help prevent abuse with the reporting system.



### `resetLegendName(uint256 legendId)` (public)

In order for admin to call, a @param legendId must have
a _reportCount equal to or greater than the _reportThreshold.


Calls resetLegendName from LegendsNFT contract, then resets report count to 0.

### `setReportThreshold(uint256 newReportThreshold)` (public)








