---
title: ProfDiaF Determine Wire Direction
draft: false
tags:
---

# Detect on which side of the contour the wire travels

### General

Knowing on which side of the contour the wire runs is decisive for whether the manufactured tool has the desired external dimensions. If you do not pay attention to the necessary points when creating the DXF file, or if you identify the contour incorrectly in ProfDiaF, the wire may run on the "inside" of the contour and the dimensions on the tool may therefore no longer be correct (contour - wire diameter - machining gap).

The wire direction in ProfDiaF is influenced by the value of the X coordinates of the start and end point. These must necessarily be different in order to clearly define the direction. 
**A vertical line cannot be identified because the wire direction is not unique**.

There is a simple rule of thumb to determine on which side of the contour the wire will travel:

|Arrow direction|     Wire|
|-----------------| ----------------------------------------|
|Left => Right   |Wire on the left site of the contour|
|Right => Left   |Wire on the right site of the contour|

### Example 1

For horizontal contours, the contour direction has no negative effect on the wire path, as the following example shows.

![[pdf_tut_wiredir_006.png]]

Left => Right: The wire moves from left to right and is on the left side of the contour **OK**.

![[pdf_tut_wiredir_005.png]]

Right => Left: The wire moves from right to left and is on the right side of the contour **OK**.

### Example 2

The contour shown is to be produced with an undercut.

![[pdf_tut_wiredir_001.png]]

The contour is identified from point **1** => point **2**. The coordinates on the X axis relate to each other as follows:

X_1 < X_2

This results in: Wire direction from left to right.
The wire travels on the **left** side of the contour.

If the contour of point **2** => point **1** is identified applies:

X_2 > X_1

This results in: Wire direction from right to left.
The wire travels on the **right** side of the contour.

![[pdf_tut_wiredir_003.png]]

In this example, if the desired undercut is identified as a separate contour in the shape shown (45° on vertical contour), the result will be incorrect regardless of which end the contour is identified, because the wire will **always** be on the inboard side of the contour.

Identification from left to right: wire direction left => right, wire runs left of contour
Identification from right to left: Wire direction right => left, wire runs to the right of the contour

### Example 2, Solution 1

![[pdf_tut_wiredir_002.png]]

The entire contour can be identified as a subcontour:

  |Identification |  X-Axis     |   Wire direction  |   Wirepath|
  |----------------- |----------------| ----------------- |-------------------|
  |P1 => P2  |        X_1 < X_2 |  left => right|   left of the contour|
  |P2 => P1   |       X_2 > X_1 |  right => left |  right of the contour|

### Example 2, Solution 2

![[pdf_tut_wiredir_004.png]]

The contour is identified with 2 subcontours. The undercut contour is adapted accordingly in the DXF contour for this purpose.

The main contour is manufactured correctly, regardless of the start and end points (see above for explanation). The contour for the undercut has been modified in that the ratio of the X coordinates has changed compared to the original contour.

The amended terms are now as follows:

|Identification|   X-Axis|          Wire direction|     Wirepath|
|-----------------| ---------------- |----------------- |-------------------|
|P1 => P2|          X_1 > X_2|   right => left|   right of the contour|
|P2 => P1|         X_2 < X_1|   left => right|  left of the contour|

### Summary

-   Vertical lines are not permissible as contours, since the wire direction cannot be clearly defined
-   The ratio of the X start and end values determines the wire direction
-   Wire direction from left => right: wire on the left side of the contour
-   Wire direction from right => left: Wire on the right side of the contour
