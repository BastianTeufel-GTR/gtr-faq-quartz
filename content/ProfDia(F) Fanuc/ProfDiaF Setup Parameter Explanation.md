---
title: ProfDiaF Setup Parameter Explanation
draft: false
tags:
---

# Explanation of the parameters in the setup program

![[pdf_tut_koord_001.png]]

![[pdf_tut_koord_004.png]]

## Explanation of the numbered positions, as well as the abbreviations used

 | Position |  Description |
  |---------- |------------------------------------------------------------------------------------------------------------------|
  |1|      Reference tool for performing the setup|
  |2|      Reference clamping position zero-point|
  |3|      Parking position **P26**, program start and finish point|
  |4|      Auxiliary gauge block for probing the Z height (only required if no direct probing on machine table possible)|
  |5|      Reference touch surface for quick calibration of the probe|

 | Bezeichnung |  Erklärung|
 | ------------- | --------------------------------------------------------------------------------------- |
  |XPPOS|         X machine coordinate parking position **P26**|
  |YPPOS|         Y machine coordinate parking position **P26**|             
  |XNULLP|        X machine coordinate **P**robe zero point|
  |YNULLP|        Y machine coordinate **P**robe zero point|
  |XDISTP|        **P**robe X distance from reference clamping position zero point to parking pos. **P26**|
  |YDISTP|        **P**robe Y distance from reference clamping position zero point to parking pos. **P26**|            
  |XNULLW|        X-machine coordinate **W**ire zero point|
  |YNULLW|        Y-machine coordinate **W**ire  zero point|
  |XDISTW|        **W**ire X-distance from reference clamping position zero point to parking pos. **P26**|
  |YDISTW|        **W**ire Y-distance from reference clamping position zero point to parking pos. **P26**|              
  |KDIST|         Distance of the probe points from the edges of the reference tool|
  |RDISTX|        X-distance from reference zero position to touch surface|
  |RDISTY|        Y-distance from reference zero position to touch surface|            
  |XKALREF|       X reference position Probe quick calibration|
  |YKALREF|       Y reference position Probe quick calibration|
  |ZKALREF|       Z reference position Probe quick calibration|            
  |RSP|           Reference clamping position Zero point|
  |U-POS|         Deflection of the U axis (X direction)|
  |V-POS|         Deflection of the V-axis (Y-direction)|

## Meaning Reference-Clamping-Zero-Position (RSP)

![[pdf_tut_koord_001.png]]<br>
The RSP (or NULL in another drawing) is a virtual zero point for the **Absolute** coordinate system. This is set in the ProfDiaF setup routine in the lower left corner of the machine (see graphic). This ensures that the positioning of the tools, relative to the RSP, is always in positive direction.

**The location of the RSP is determined by several factors:**

1.  Position of the probing surfaces of the reference tool used during setup. (1)
2.  RDISTX: X distance of the RSP to the lateral probing surface of the reference tool.
3.  RDISTY: Y-distance of the RSP to the front probing surface of the reference tool.

**The RDIST values must be entered in the setup with a positive sign**.

# Carrying out zero point configuration

![[pdf_tut_koord_004.png]]

Starting from the clamping device installed on the machine, the position of the reference clamping position must be recorded. For this purpose, an NC program (PDF_Nullp.dnc O2101) is available, which acquires the necessary data largely automatically and makes them available in macro variables (MV) for the ProfDiaF programs. The above sketch shows the situation on the machine table with the above mentioned details:

The "Adjust setup program" link (In the ProfDiaF program folder) starts an input program which displays the variable parameters and settings in the setup program with corresponding graphical representations and help texts. All entries in the parameter tree should be activated in sequence and set to the values valid in the current installation. The setup program should then be transferred to the machine (use the "Send setup program" link). 
If the specified conditions are fulfilled, the setup program can be executed on the machine. Breakpoints (M00) are programmed at several points in the program. At these points, certain actions are to be carried out by the user. Comment texts at the respective point in the program indicate the necessary actions. The program is executed in the following steps: **For machine model Fanuc iD and newer it is mandatory to determine the coordinates in advance and to enter them via the link "Adjust setup program".

-   First **M00** => Set machine in parking position(3) and continue program  (This position will in the future be your start and end point for every ProfDia/F project and set as "P26" in the machine control)
-   Second **M00** =>Position the wire at the corner of the reference tool and continue the program. **Attention:** This stop is skipped if the coordinates for this position have been entered in advance in the "Adjust Setup Program" dialog.
-   The program now performs a probing at the Y probing surface, automatically positions at the X probing surface and also captures this position.
-   Third **M00** => Position the probe over the corner of the reference tool. Continue program.\ Attention: This stop is skipped if the coordinates for this position have been entered in advance in the "Adjust setup program" dialog.
-   The program now automatically probes in the Z, Y and X directions and saves the positions. As a last action, the workpiece zero point for the probe is set to the reference clamping position zero point. This causes the machine's "Absolute" position display in X and Y = 0 when the ball center of the probe is above the zero point of the reference clamping position.

# Parameter KX KY KZ Xn Yn Zn

![[pdf_tut_koord_003.png]]

Definition of the parameter KX KY KZ Xn Yn Zn in dependency of the dxf zero point.

DXF zero point is at the front site of the tool(So tip tool passes through Y0)

Distance tool zero point (e.g. reference hole) -> DXF zero point must be specified with KX KY

further zero points for further tools are specified in the clamping list with the fixed distances Xn Yn

Example 1: Single tool

Example 2: Multiple clamping below 0 degrees

Example 3: Multiple clamping under 90 degrees
