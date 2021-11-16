### `LegendToken.sol`

``` sol title="imports  | pragma solidity 0.8.4"
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../lab/LegendsLaboratory.sol";
```

``` sol title="onlyLab | modifier"
onlyLab() →  only LegendsLaboratory Contract can call
```


``` sol title="onlyMarketplace | modifier"
onlyMarketplace() →  only LegendsMarketplace Contract can call
```


``` sol title="onlyBlending | modifier"
onlyBlending() →  only LegendsNFT Contract can call
```

The **LegendToken** contract is responsible for creating and managing the ERC20 token associated with the **Legendary Labs** project, the **LGND** token. 

---

<br/>

## Functions

### labBurn
---

``` sol title="labBurn(uint256 amount) | public"
labBurn(uint256 amount)
```

Function only callable by [`LegendsLaboratory`](../lab/LegendsLaboratory#labburn)


### blendingBurn
---

``` sol title="blendingBurn | public"
blendingBurn(address account, uint256 amount)
```

Function only callable by [`LegendsNFT`](../legend/LegendsNFT#blendlegends)

### burn
---

> *Destroy Your LGND Tokens Forever*

<br/>

``` sol title="burn | public"
burn(uint256 amount)
```




Allows an address to burn their LGND tokens


:::warning

Burned tokens can never be retrieved as they will be completely removed from the total supply.

:::











