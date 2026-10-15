---
title: Prerequisites
draft: false
tags:
  - profdiaf
  - fanuc
  - installation
  - requirements
  - profdia
---

# ProfDia Prerequisites

For a successful installation and setup, the following prerequisites need to be fulfilled.

## PC Requirements

> [!info] PC Requirements
> Hardware, operating system, PC preparation and network setup apply to all ProfDia versions.
> See [[PC Requirements]].

## Machine Preparation

> [!warning] 
> Original FANUC Spare parts need to be installed. 3rd party wire and die guides, nozzles, etc can lead to bad cutting results especially when cutting with big axial angles

- Machine CNC Parameters need to be set according to the parameter reference [here](Fanuc%20Parameter%20Setup.md)
- Additional parameters like special Handy Parameters need to be set as shown below in **Additional Machine Settings**
- Wire needs to be straightened using the FANUC internal cycle
- Vertical Taper Setup needs to be executed for the desired axial relief angles using the FANUC internal cycle (Setup > Vertical Taper)
- Probe must be installed and fully functional
- Resistance of the water has to be in the ideal range for PCD cutting

## Cutting Technologies
- PCD Technologies need to be installed (3 or 4 cuts) and tested to work
- A Technology for carbide needs to be available for free punch cutting


## Preparations regarding A Axis

| Setting | Description |
| --- | --- | 
| X Axis parallelity  | < 3µm |
| Runout measured at mandrel circumference at point close to mandrel front face | < 3µm | 

## Additional Machine Settings

| Parameter | Value |
| --- | --- |
| Handy Setting ||
| Program  > Ignore G70, G71, G72 in Dry run | **NO** |
| Program > Work Coordinate XY / UV / Z | All **NO** |
| Alarm and Warning > Confirmation of Hold Point | **Warning** |
| Coordinate Rotation | Reset / Disabled |
| Skip /9 | Disabled |
