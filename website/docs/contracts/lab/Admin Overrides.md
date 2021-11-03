

    
Admin Override Functions

:::caution
    
Any functionality that would fall into an override of a players asset should be used **extremely** sparingly, if ever.
The smart-contracts should be designed well enough to prevent unwanted player behavior prior to deploying.   
     
:::

:::note
     
Unfortunately, due to the minor [naming vulnerability](docs/vulnerabilities#naming) the ability to reset a Legend's name,
with the permission of the community, was included.
     
:::
     

     

### `reportVulgarLegend(uint256 legendId)` (public)

Report A Legend ONLY Because It's Name Is Vulgar



Allows a user to report a Legend with an offensive name, and put the power in the community to
determine what they find offensive. `LAB_TECH`s and *the* `LAB_ADMIN` should **never** report a `legendId`.

:::note

Once an address has reported a `legendId`, they will ot be able to report that Legend again; even after the name reset.
After a Legend has it's name reset, it's `_reportCount` will reset to (0),

:::



### `resetLegendName(uint256 legendId)` (public)

Reset A Legend's Name



If a Legend's name has been reported enough times to reach the `_reportThreshold` a `LAB_TECH` is given
authorization to reset the Legend's name to the base name.



### `setReportThreshold(uint256 newReportThreshold)` (public)

Set New Vulgar-Name Report Threshold



Resets the `_reportThreshold`. Only callable by a `LAB_TECH`.
