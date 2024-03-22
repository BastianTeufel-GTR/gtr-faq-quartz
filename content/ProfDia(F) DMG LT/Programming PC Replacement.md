---
title: Programming PC Replacement
draft: false
tags:
---

# ProfDia LT20 / LT50 PT Prerequisites

For a successful migration of an existing ProfDia(F) installation to a new PC, the following topics must be carefully observed and fulfilled before the actual installation.
## PC Requirements

> [!note] Note
> The PC specifications listed below are a suggestion for a minimum hardware configuration

- Supported Operating Systems currently are: 
    - Microsoft Windows 10
    - Microsoft Windows 11 (default)
- 8GB RAM
- 200 GB SSD 
- Full HD Monitor (1920x1080)
- OpenGL capable Graphics Adapter
- USB-A Port for CodeMeter License Key
- Suggested: Separate Network interface for machine communication

## Preparations

- For the time of installation and data migration a stable and reliable internet connection on the **new PC** and **old PC** is mandatory. 
- A local method for transferring the data to the new PC must be available (USB Drive, Network share, ...)
- One of the following remote support applications need to have a successful connection to their management servers:
	- [HopToDesk](https://www.hoptodesk.com/)
	- [TeamViewer v12](http://teamviewer.gtr.de)
- On the new PC all available Windows Updates should be installed prior to the ProfDia Installation process
- For the installation process a Windows user with Administrative Privileges is mandatory
- If the database is located on a network drive, the new PC needs to have the same privileges and network drive mappings as the old PC (also same drive letters).

> [!info] Info
> A successful server connection with the remote support software is given, when all IDs and passwords in the software are filled with plausible values


## PC Network Setup

- The Network connection between the new Programming PC and LT20/LT50 PT has to be successfully established and tested
- PC and Machine have to be in the same Subnet (e.g. 192.168.0.x, Subnetmask: 255.255.255.0)
- If the Laser machine is connected to a company network it should have a static IP address or a DHCP with a static lease from the server
- If the PC is part of the company network and the Laser machine is connected to a secondary ethernet interface, make sure to use a different IP range for the machine network! E.g. 

Company Network: 10.0.0.x, Subnet 255.255.0.0
Machine Network: 192.168.0.x, Subnet 255.255.255.0

> [!warning] 
> When the same IP range is used on two different ethernet interfaces, the license check of ProfDia and the communication will fail!

