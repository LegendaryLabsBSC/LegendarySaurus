
---
<br/>

The Legendary Labs Project includes additional **Access Control** mechanisms built into the contracts. This will allow the project to have a more robust system when it comes to authorizing who should be allowed to call what in the contracts.

**Access Control** is worked into the [**LegendaryLaboratory**](./LegendsLaboratory) via inheritance of OpenZeppelin's `AccessControlEnumerable.sol`





```sol title="onlyRole | modifier"
onlyRole(bytes32 role); →  only address granted correct role can call
```

```sol title="Legendary Labs Access Control Roles"
bytes32 public constant LAB_ADMIN = keccak256("LAB_ADMIN");
bytes32 public constant LAB_TECH = keccak256("LAB_TECH");
```

<br/>

## Basics Of Access Control
---

Legendary Labs' Access Control is defined with (3) roles:
  * `DEFAULT_ADMIN_ROLE` &rarr; Super admin role built into the OpenZeppelin Access Control contracts.
  * `LAB_ADMIN` &rarr; Super admin role defined by **LegendsLaboratory** contract.
  * `LAB_TECH` &rarr; Admin role defined by **LegendsLaboratory** contract.



:::note `DEFAULT_ADMIN_ROLE`

This is default *super admin* role created when deploying a contract that inherits OpenZeppelin's `AccessControlEnumerable.sol`. In order to limit the authorization of this role, without reworking OpenZeppelin's `AccessControlEnumerable.sol`, the  `DEFAULT_ADMIN_ROLE` is grant to the **LegendaryLaboratory** contract when deployed.

This should guarantee that `DEFAULT_ADMIN_ROLE` authority can never be exercised on the contracts. ..  This also allows `LAB_ADMIN` to be ..

:::

:::note `LAB_ADMIN`

This is the *super admin* role established by the **LegendaryLaboratory** contract. This role is granted to the deployer of the **LegendaryLaboratory** contract. Many of the functions this role has the authority to call should only be called if absolutely necessary, and possibly never. This role should only ever be grant to (1) address.

:::


:::note `LAB_TECH`

This is the *standard admin* role established by the **LegendaryLaboratory** contract. This role is, currently*, granted to the deployer of the **LegendaryLaboratory** contract. The functions a `LAB_TECH` can call are those that should not be open any address, but that do not greatly affect the integrity of a decentralized application. There is no limit on how many address can be assigned the `LAB_TECH` role.

It it still recommended best practice that all **Access Control** functions, regardless of authority required, have extreme caution exercised before calling. 

:::

:::tip Note

While `LAB_ADMIN` is granted the highest level of authority over the entire **Legendary Labs** project, any address granted the `LAB_ADMIN` role can not call `LAB_TECH` functions without additionally being granted the `LAB_TECH` role.

:::


<br/>

## Granting And Revoking Access 
---

**Access Control** is granted to and revoked from an address by the set *role admin*. A *role admin* is a **Access Control** role that has been granted the authority to grant and revoke a stated **Access Control** role to an address.

The inherited `AccessControlEnumerable.sol` contract establishes `DEFAULT_ADMIN_ROLE` as the *role admin* over all new role created by the inheriting contract, unless otherwise specified. 


:::important

In the effort to prevent the `LAB_ADMIN` role being granted to more than (1) address at any given time, `DEFAULT_ADMIN_ROLE` is left as the *role admin* for `LAB_ADMIN`. 

Due to `DEFAULT_LAB_ADMIN` being granted to the **LegendaryLaboratory** contract itself, the only address that can grant or revoke the `LAB_ADMIN` role is the contract.

The only way to trigger the **LegendaryLaboratory** contract into granting or revoking the `LAB_ADMIN` role is by the current `LAB_ADMIN` calling `transferLaboratoryAdmin` and passing in the address that will take over the `LAB_ADMIN` role.

:::

:::important

The `LAB_TECH` has its *role admin* set to be `LAB_ADMIN`. This allows the address granted `LAB_ADMIN` to grant and revoke `LAB_TECH` authority as needed. 

The `LAB_TECH` role does not have the ability to grant or revoke any level of **Access Control**.

:::

:::tip Note

It is not a particular address that is assigned as a *role admin*, but the actual *access control role* itself. 

:::

:::tip Note

Any address that has been granted any level of **Access Control** has the ability to renounce their authority by calling `renounceRole`.

:::

<br/>

|         Role         |      Role-Admin      |
| :------------------: | :------------------: |
| `DEFAULT_ADMIN_ROLE` | `DEFAULT_ADMIN_ROLE` |
|     `LAB_ADMIN`      | `DEFAULT_ADMIN_ROLE` |
|      `LAB_TECH`      |     `LAB_ADMIN`      |

<br/>

### grantRole

``` sol title="grantRole | public" 
grantRole(bytes32 role, address account)
```


### revokeRole

``` sol title="revokeRole | public" 
revokeRole(bytes32 role, address account)
```



### renounceRole

``` sol title="renounceRole | public" 
renounceRole(bytes32 role, address account)
```

---

<br/>

## Querying Access Control
---

### hasRole


```sol title="hasRole | public"
hasRole(bytes32 role, address account) → bool
```

Returns whether a given address is granted a particular role or not

### getRoleAdmin


```sol title="getRoleAdmin | public"
 getRoleAdmin(bytes32 role) → bytes32
```

Returns the *role admin* role of a given role

### getRoleMember

``` sol title="getRoleMember | public" 
getRoleMember(bytes32 role, uint256 index) → address
```

Returns the address of a given index for a particular role

### getRoleMemberCount

``` sol title="getRoleMemberCount | public" 
getRoleMemberCount(bytes32 role) → uint256
```

Returns the total number of addresses granted a particular role

---

<br/>


## Renounce Lab Adminship
---

### transferLaboratoryAdmin

> *There Can Only Be One..*

<br/>

``` sol title="transferLaboratoryAdmin | public | onlyRole(LAB_ADMIN)"
transferLaboratoryAdmin(address newAdmin)
```

The only route in which a new address can be granted `LAB_ADMIN` is by the existing `LAB_ADMIN` to renounce their authority via this function. When `transferLaboratoryAdmin` is called, the **LegendaryLaboratory**  contract first makes an internal call to revoke the callers `LAB_ADMIN` role. Then a second internal call is made to grant the `newAdmin` address the `LAB_ADMIN` role.


:::warning

By calling this function the `LAB_ADMIN` will give up all privileges as `Lab_ADMIN`. 

If the `newAdmin` is passed the *zero address*,
a burn address, or any otherwise inaccessible address, full control over the Legendary Labs project would effectively be renounced.

:::

---

<br/>

## Who Can Call What
---

<br/>


|   Access Controlled Function    | `LAB_ADMIN` | `LAB_TECH` | `DEFAULT_ADMIN_ROLE` |
| :-----------------------------: | :---------: | :--------: | :------------------: |
|       `createPromoEvent`        |      ❌      |     ✅      |          ❌           |
|        `closePromoEvent`        |      ❌      |     ✅      |          ❌           |
|      `mintLegendaryLegend`      |      ✅      |     ❌      |          ❌           |
|            `labBurn`            |      ✅      |     ❌      |          ❌           |
|           `setSeason`           |      ✅      |     ❌      |          ❌           |
|    `setNewKinBlendingLevel`     |      ✅      |     ❌      |          ❌           |
|      `setIncubationViews`       |      ❌      |     ✅      |          ❌           |
|       `setBlendingLimit`        |      ✅      |     ❌      |          ❌           |
|      `setBaseBlendingCost`      |      ✅      |     ❌      |          ❌           |
|      `setIncubationPeriod`      |      ✅      |     ❌      |          ❌           |
|         `setRoyaltyFee`         |      ✅      |     ❌      |          ❌           |
|       `setMarketplaceFee`       |      ✅      |     ❌      |          ❌           |
|       `setOfferDuration`        |      ❌      |     ✅      |          ❌           |
|      `setAuctionDurations`      |      ❌      |     ✅      |          ❌           |
|      `setAuctionExtension`      |      ❌      |     ✅      |          ❌           |
|       `setMinimumSecure`        |      ❌      |     ✅      |          ❌           |
|       `setMaxMultiplier`        |      ✅      |     ❌      |          ❌           |
|        `setReJuPerBlock`        |      ✅      |     ❌      |          ❌           |
|     `setReJuNeededPerSlot`      |      ✅      |     ❌      |          ❌           |
|    `transferLaboratoryAdmin`    |      ✅      |     ❌      |          ❌           |
|        `resetLegendName`        |      ❌      |     ✅      |          ❌           |
|      `setReportThreshold`       |      ✅      |     ❌      |          ❌           |
| `grantRole(DEFAULT_ADMIN_ROLE)` |      ❌      |     ❌      |          ✅           |
|     `grantRole(LAB_ADMIN)`      |      ❌      |     ❌      |          ✅           |
|      `grantRole(LAB_TECH)`      |      ✅      |     ❌      |          ❌           |


---

<br/>

## Terminology
---

 * *Role* &rarr; A level of access granted to an address.
 * *Role Admin* &rarr; A *role* with the authority to grant and revoke the *role* it is *role admin* of to addresses. 
 * *Super Admin* &rarr; An address with the highest level of access that is allowed by the **Legendary Labs** contracts. Can call `LAB_ADMIN` access-controlled functions.
 * *Standard Admin* &rarr; An address that can call `LAB_TECH` access-controlled functions .
