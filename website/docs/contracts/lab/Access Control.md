
---
<br/>

## Renounce Lab Adminship


Resets the [`_ReJuNeededPerSlot`](docs/LegendsRejuvenation#setReJuNeededPerSlot) to restore a *blending instance*. Only callable by *the* `LAB_ADMIN`.

### Dispenses Promo Ticket
---

``` sol title="transferLaboratoryAdmin(address newAdmin)` (public)

There Can Only Be One..



Only callable by *the* `LAB_ADMIN`. Function calls *this* contract to revoke the current `LAB_ADMIN`'s
authorization and grant authorization to the incoming admin in the same block.

:::note

Many of the functions the `LAB_ADMIN` has authorization to call should only be called rarely, if ever.
In order to prevent more than (1) `LAB_ADMIN` existing at one time, *this* contract is given sole ability
to revoke and grant `LAB_ADMIN` access. This should be the only way a `LAB_ADMIN` role can be granted.

:::

:::warning

By calling this function you will give up you privileges as `Lab_ADMIN`. If the `newAdmin`is supplied the *0 address*,
a burn address, or any otherwise inaccessible address, full control over the Legendary Labs project would be renounced.

:::