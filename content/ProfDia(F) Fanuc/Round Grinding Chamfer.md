---
title: Round Grinding Chamfer
draft: false
tags:
---

# Round grinding chamfer

## Using fast rotation mode of rotary axis

Some rotary axis support the option to switch from positioning to fast rotation mode.
Using this mode it's possible to have a round grinding operation on the wire EDM machine.

ProfDia can be configured to output NC programs accordingly.

### ProfDia Configuration

The file `TechnoDB.ini` in the ProfDia installation folder (e.g. c:\\ProfDia ) needs to be adjusted using a text editor.
It contains pre-prepared sections for this functionality. 
Because not being available on all machines, these parameters are commented out with leading semicolon characters by default.

Original content of TechnoDB.ini:

````ini
; Standard sequence round grinding
;[Techsequenz_10]
;s0=M82
;s1=G04X1.
;s2=M21 B1
;s3=M224P900
;s4=G04X1.

; Sequence Cut End round grinding
; Currently not in use
;[Techseq_Cut_End_10]
;s0=M42
;s1=M223

; Sequence Profile Section End round grinding
;[Techseq_PS_End_10]
;S0=M42
;s1=M223
````

To enable the functionally the comment signs have to be removed from the sections \[Techsequenz_10]  and \[Techseq_PS_End_10]  (except from the real comment text on top of each section). The section \[Techseq_Cut_End_10] is defined for special purpose and should currently not be enabled.

In the pre-prepared section the command “M224P900” switches on the fast rotation with 900 RPM.
If the axis should rotate with a different speed, the value can be adjusted (e.g. P1200 for 1200 RPM).

It is also possible to define additional sets of sections (copy and paste all three sections and replace the “_10” in the section names with “_11” for the next triple or “_12” for a third triple. 
In each triple the rotation speed can be defined as desired. After configuration the “_10” sections should look like this:

TechnoDB.ini file after adjusting the sequences:

````ini
; Standard sequence round grinding
[Techsequenz_10]
s0=M82
s1=G04X1.
s2=M21 B1
s3=M224P900
s4=G04X1.

; Sequence Cut End round grinding
; Currently not in use
;[Techseq_Cut_End_10]
;s0=M42
;s1=M223

; Sequence Profile Section End round grinding
[Techseq_PS_End_10]
S0=M42
s1=M223
````

### Programming in ProfDia - Step 1

In ProfDia a separate profile section has to be created after the normal machining.

This section has:
- To be a “Main profile section” (not shifted to the right as sub section)
- Measuring has to be switched off in this section

![[round_grind_rpm_psm_1.png]]


### Programming in ProfDia - Step 2

Create a specific cutting technology for round grinding

In this technology record the EDM data registers and the offset values have to be specified as usual. 
The values in the third column refer to the numbers at the end of the sections names in the configuration file TechnoDB.ini (See Configuration above). 
After enabling the pre-prepared sections only “10” can be specified in this column to select the parameters specified in this section.
After adding sections with e.g. “_11” or “_12” the input 11 or 12 is also accepted in this column and enables the parameters specified in these additional sections.

![[round_grind_rpm_tech.png]]

### Programming in ProfDia - Step 3

In the `Round grinding` profile section the following has to be specified:

- Only one angular position

![[round_grind_rpm_01.png]]

- all relief angles set to zero

![[round_grind_rpm_02.png]]

- A local technology for round grinding has to be selected

![[round_grind_rpm_03.png]]

- A manually created measuring point list (Created using the button `Create measuring point list`) 

![[round_grind_rpm_04.png]]


Now the tool will be cut as usual. And prior to the round grinding profile, the technology will be loaded and the start sequence for the continuous rotation will be put out.

### Caveats for the Fast Rotation approach

Due to the fast tool rotation the water inside the tank will be heavily swirled.
This method should only be used on smaller tools (diameter < 20mm) with a streamlined design. Tools with many big tips will behave like a boat screw.


