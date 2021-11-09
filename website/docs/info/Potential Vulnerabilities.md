
---

## Naming

:::caution Trivial Vulnerability

[`nameLegend`](../contracts/legend/LegendsNFT#namelegend)

#### Background: 

This function accepts (2) parameter passed in by the caller to change the name of their Legend. 

#### Issue:

While the front end of **Legendary Labs** will prevent vulgar names from being passed in, there is no way to prevent someone directly calling this function and passing in whatever they please for `prefix` & `postfix`.

#### Impact:

Little to none. My only concern is with scalability and the presenting this project as an exciting and fun game for everyone, i.e. "family friendly naming". As far as impact to the integrity and security of the project, this should have zero impact at all. 

#### Resolution:

Create a system that allows players to report a name that they personally find offensive. If enough (`reportThreshold`) members of the community share the same opinion about a name be offensive, a `LAB_TECH` will be authorized to call `resetLegendName`. 

:::

:::important

The `Report` functionality on the front end should not be easily visible. A good location for this functionality would be a redirect from our "Help" page. 

:::

:::tip Note

Player will not be able to see if a Legend has been reported or what its `_reportCount` is, if any. The only way to query the `_reportCount` for a Legend will be through the event logs.

:::

---

<br/>

## Hatching

:::caution Minor Vulnerability

[`hatchLegend`](../contracts/legend/LegendsNFT#hatchlegend)

#### Background: 

When Legends are *hatched*, their corresponding IPFS *DNA-Generated URI* will be fetched from our back end and passed to the `hatchLegend` function.

#### Issue:

If `hatchLegend` is called from the **Legendary Labs** DApp there should be no issues here. However, much like the naming vulnerability, there is nothing preventing someone from calling this function directly and passing in whatever string they wish for `ipfsHash`.


#### Impact:

The party most affected by this would be the player passing in an invalid URI to their Legend. They would be essentially devaluing their asset, as after *hatching* there is no possible way to reset a Legend's URI. The URI is what links an ERC721 token Id to its immutable off-chain metadata. In the case of a Legend NFT this URI stores a link to its DNA and image. 

#### Resolution:

A possible solution so that our front end does not run into any errors when fetching a URI to render the correct data, is to have the **Legendary Labs** DApp fetch URI data directly using the **Pinata API**. As all Legends will have their valid immutable-URIs stored on our back end prior to `hatchLegend` being called.
:::

:::warning

Creating an override for this vulnerability should **NEVER** be considered. While a Legend's name should have zero impact on the assets valuation, the URI is a direct link to the asset ID and the asset metadata. This metadata is extremely important to the valuation of the asset. Providing any address of any kind the ability to change a *hatched* Legend's URI, no matter the reason, is a direct violation of the **Legendary Labs Project** integrity and DeFi in general.

:::

:::caution

While the resolution for the vulnerability may prevent issues on the front end, a Legend that has received an invalid URI will need to be flagged and prevented from being listed on the **LegendsMarketPlace**.

:::

---