---
dg-publish: true
---

# ProfDia Prerequisites

For a successful installation and setup, the following prerequisites need to be fulfilled:

## PC Requirements
- Supported Operating Systems currently are: 
    - Windows 10 (default)
    - Windows 11
- 8GB RAM
- 120 GB SSD Harddrive
- Full HD Monitor (1920x1080)
- OpenGL capable Graphics Adapter
- Network interface (onboard or PCIx)
- USB-A Port for CodeMeter License Key

## PC Preparations

- All available Windows Updates should be installed prior to the ProfDia Installation
- For the installation process a Windows user with Administrative Privileges is mandatory
- For Remote Support a stable Internet connection is mandatory

## PC Network Setup

- The Network connection between Programming PC and EDM has to be successfully established and tested
- PC and Machine have to be in the same Subnet (e.g. 192.168.0.x, Subnetmask: 255.255.255.0)
- If the EDM is connected to a company network it should have a static IP address or a DHCP with a static lease from the server
- If the PC is part of the company network and the EDM is connected to a second ethernet interface, make sure to use a different IP range for the machine network! E.g. 

Company Network: 10.0.0.x, Subnet 255.255.0.0
Machine Network: 192.168.0.x, Subnet 255.255.255.0

> [!warning] 
> When the same IP range is used on two different ethernet interfaces, the license check of ProfDia will fail!
> No license can be generated for the machine


## Machine Preparation

> [!warning] 
> Original FANUC Spare parts need to be installed. 3rd party wire guides, nozzles, etc can lead to bad cutting results especially when cutting with big axial angles

- Machine CNC Parameters need to be set according to the parameter reference [here](Fanuc%20Parameter%20Setup.md)
- Additional parameters like special Handy Parameters need to be set as shown below in **Additional Machine Settings**
- Wire needs to be straightened using the FANUC internal cycle
- Vertical Taper Setup needs to be executed for the desired axial relief angles using the FANUC internal cycle (Setup > Vertical Taper)
- PCD Technologies need to be installed (3 or 4 cuts) and tested to work
- Technology for carbide needs to be available for free punch cutting


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
