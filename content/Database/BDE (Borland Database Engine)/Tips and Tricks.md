---
dg-publish: true
---

On this page all known problems related to the BDE database engine will be listed with a possible solution.

## BDE Error 2501

**Error message:**
Exception EDBEngineError in module Prdncsrv.exe at "00205166" An error occurred while attempting to initialize the Borland Database Engine (error $2501)

![[bde2501_003.png]]


**Possible cause:**
When this error occurs it is possible you don't have enough space available.

**Solution:**

-   Control Panel > Open BDE Administrator 
-   At the left tabs select the configuration tab
-   Here select the subitem System > INIT
-   In the right view, increase the SHAREDMEMSIZE value from 2048 to 4096.<br> ![[bde2501_001.png]]

- Confirm the change with ENTER. For safety, click with the mouse in another field to force the PDC administrator to recognize the change.
-   When you close the BDA Administrator, you will be prompted to accept the changes. Confirm this with Yes. 
 

 
![[bde2501_002.png]]

