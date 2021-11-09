
:::warning
    
Any functionality that would allow a **Legendary Labs** admin to modify another player's asset or blacklist addresses should be used **EXTREMELY** sparingly, if ever. Smart Contracts should be designed well enough to prevent any unwanted behavior prior to deploying.
     
:::
     
<br/>

## Overrides
     
### Reset Legend Name
---

Unfortunately, due to the [naming vulnerability](../../info/Potential%20Vulnerabilities#naming), an admin ability to reset a Legend's name,
with the permission of the community, was included in the **LegendaryLaboratory** contract.

:::important

The **Legendary Labs** community will have the true power to determine what they find offensive. While an admin may find a particular name offensive, if there are not enough community members that have called the `reportVulgarLegend` function on the same `legendId`, no admin will be allowed to call `resetLegendName`.

:::


<br/>     

#### reportVulgarLegend

> *Report A Legend ONLY Because It's Name Is Vulgar*


``` sol title="reportVulgarLegend | public"
reportVulgarLegend(uint256 legendId)
```

Allows a player to report a Legend with an offensive name.

:::important

`LAB_TECH`s and *the* `LAB_ADMIN` should **NEVER** report a `legendId`.

:::

<br/>

#### resetLegendName

> *Reset A Legend's Name*

``` sol title="resetLegendName | public | onlyRole(LAB_TECH)"
resetLegendName(uint256 legendId)
```

If a Legend's name has been reported enough times to reach the `_reportThreshold` a `LAB_TECH` is given
authorization to reset the Legend's name.

:::tip Note

After a Legend has it's name reset, it's `_reportCount` will reset to `(0)`,

Once an address has reported a `legendId`, they will not be able to report that Legend again; even after the name reset.

:::

<br/>

#### setReportThreshold

> *Set New Vulgar-Name Report Threshold*

``` sol title="setReportThreshold | public | onlyRole(LAB_ADMIN)"
setReportThreshold(uint256 newReportThreshold)
```



Resets the `_reportThreshold`.

<br/>

#### NameReported


``` sol title="NameReported"
NameReported(uint256 legendId, uint256 reportCount)
```

Emitted when a Legend has its name reported.

---