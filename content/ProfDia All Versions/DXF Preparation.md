---
title: DXF Preparation
draft: false
tags:
  - profdia
  - dxf
  - cad
---

# Common advices

- If possible only use lines and arcs for drawing the DXF files for use with ProfDia(F)
- Only add the relevant information to the DXF file which will be imported into ProfDia, otherwise the import may fail, or identifying the profile will be more complicated
- If there are overlapping profiles (e.g. same profile on different teeth in different length), put each profile for a tooth on a single layer in the DXF file
- avoid profile overlapping due to inaccurate geometry connections
- Export the DXF as an **ASCII** DXF File with version ACAD upto 2020

# Alignment of the profile

![[ZeroPoint_DXF_ProfDia.jpg]]

The profile has to be aligned as shown in the picture above.
The front side of the tool has to be at X=0.0
The radius/diameter of the profile has to be drawn on the correct radius in Y

So a 10mm cutter would have it's profile drawn on Y=5.0

# Right- and Left turning tools

All tools in ProfDia have to be drawn like right turning tools (also check the picture above). 
The turning direction can be toggled using a switch inside the ProfDia main view.

If the tool is configured to be a left turning tool, ProfDia automatically mirrors the positions of the measuring points as well as the profile to cut.
