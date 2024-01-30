---
title: Programming Additional Relief Angles
draft: false
tags:
---


![[ang_offset_prog_001.png]]

For tools with small diameters it is very important to make
sure that the relief surface has clearance to the enclosing circle all
around. The first and second relief angles which can be specified in the
ProfDia profile section window are not able to ensure this when the tip
thickness is big in relation to the tool diameter. The sketch shows that
the second relief angle would leave a lot of material outside the
enclosing circle.

------------------------------------------------------------------------

![[ang_offset_prog_002.png]]

To remove the remaining material ProfDia offers the possibility to create
further profile sub sections with the same contour and to execute these
cuts with angular offsets to the initial angular position. It is
possible to add as many additional cuts as necessary to get clearance
all around.

------------------------------------------------------------------------

![[ang_offset_prog_003.png]]

The example sketch shows the situation after five cuts with increasing
angular offsets. With an additional cut (using a separate DXF contour,
0° radial relief and 180° angular offset) the rear of the tip is trimmed
in a definite distance to the centre. The desired shape of the relief
surface can be determined by modifying the angular offset and the relief
angle in every sub section. To get suitable parameters the best way is
to draw the desired shape and to determine the parameters in the sketch.
For the example above there is one main profile section which is just
used for measuring. All other sections are moved to the right as sub
sections and inherit the measuring data from the main section. The
profile section names explain what each sub section is doing.

------------------------------------------------------------------------

![[ang_offset_prog_004.png]]

**Important parameters**:

In the main profile section the "Minimum diameter for rake angle
calculation" has to be set to a value below the smallest diameter of the
tool

In the sub sections for the additional relief angles the "Offset to
angular position" has to be set to the appropriate value. If the
parameter "Offset to angular position" is not visible in "Additional
parameters" this option has to be activated by opening the "Feature
Manager" (ProfDia program folder on the desktop). Then switch on the
item "Parameters for angular and contour offset".
