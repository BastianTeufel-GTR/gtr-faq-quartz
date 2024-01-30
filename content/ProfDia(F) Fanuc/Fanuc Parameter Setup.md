---
title: Fanuc Parameter Setup
draft: false
tags:
---

## ProfDia Machine Setup

### Important Parameter Settings in FANUC control Alpha iD and up

To successfully use the ProfDia Software with the FANUC EDM, the following parameters need to be set on the control.

> [!note] 
> The parameter list below applies to FANUC EDM models Alpha iD and newer.
> For older Fanuc EDM models please consult the installation check list which comes with the software



### CNC Parameters

|Param. No| Bit | Value | Function / Purpose |
| ---     | --- | ---- | ----- |
|1008[A] | 0 | 1| Rotary Axis Roll over is Valid (1) (ROA) |
|1008[A] | 1 | 0| Move A-Axis the shortest way to programmed position (RAB) |
|1008[A] | 2 | 1| Relative coordinates (RRL) are rounded by the amount of the shift per one rotation (1) |
|1420 |  | e.g. 1080 for Hirschmann Rotary | Rotation speed for A-axis, Value probably dependent on brand and type of A-axis |
|3454 | 4 | 1| Enable “bit-setting” with argument “Q” via program |
|15150 | 0 | 1| Disable block ahead reading at M00/M01 (BST) |
|15320 | 0 | 1| Macro variable range > 13000 available (MEX) |
|15820 | 0 | 0| Straightness compensation OFF (WCC) |
|15886 | 0 | 0| Trimm function OFF (OIA) |
|16980 | 7 | 1| Switch on PCD Generator (if available) |
|16981 | 2 | 1| Enables Collision detection (Abnormal probe status) |

### Keep Relay Parameters

|Param. No| Bit | Value | Function / Purpose |
| ---     | --- | ---- | ----- |
|KR11 | 3 | 1| Switches Generator mode from NAK to PCD (if available) |
|KR11 | 5 | 1| G10 Output of Cutting Tech |
|KR12 | 0 | 1| Variables >13000 visible on control screen |
|KR12 | 1 | 1| Variables >500 visible on control screen |

### Probe Parameters

|Param. No| Bit | Value | Function / Purpose |
| ---     | --- | ---- | ----- |
|6200 | 4 | 1| Probe parameter (HSS) |
|6200 | 6 | 1| Probe parameter (SRE) |
|6201 | 1 | 1| Probe parameter (SEB) |
|6202 | 0 | 1| Probe parameter (1S1) |

### A-axis machine position display

To limit the displayed position range to 0 – 359.9999 the following parameter has to be set:

**Values are for A-Axis:**

|Param. No| Bit | Value | Function / Purpose |
| ---     | --- | ---- | ----- |
|1006 | 0 | 1| Limit A-Axis Machine Position Display |
|1006 | 1 | 0| Limit A-Axis Machine Position Display |
|1260 | - | 360.000 | Limit A-Axis Machine Position Display |

(If 1006#1 = 1 then display counts up to 9999)


> [!warning] 
> Machine has to be in home position

### Disable A-Axis limits

**Values are for A-Axis:**

|Param. No| Bit | Value | Function / Purpose |
| ---     | --- | ---- | ----- |
|1320 | - | -1 (or -3600)| Disable A-Axis Limits |
|1321 | - | 1 (or 3600) | Disable A-Axis Limits |

### Handy Parameter

- AWF -> Water fill AWF = **NO**
- Confirmation of Hold Point must be set to **Warning**
- interference check = **OFF**
- **DISABLE** Work Coordinate System
- 4 Conditions on at program start = **OFF**
- Ignore G70,G71,G72 in Dry Run set to **NO**
- G74 Setting = **Measure**

### Additional Information

- M221 = Probe Down Command
- M222 = Probe Up Command






