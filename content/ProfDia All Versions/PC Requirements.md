---
title: PC Requirements
draft: false
tags:
  - profdia
  - installation
  - requirements
  - windows11
---

# ProfDia PC Requirements

The requirements on this page apply to all ProfDia versions (ProfDia(F) Fanuc, ProfDia LT20 / LT50 PT and others). Machine-specific preparations are listed on the page of the respective ProfDia version.

## Hardware and Operating System

| Component | Minimum | Recommended |
| --- | --- | --- |
| Operating System | Windows 11 Pro 64-bit | Windows 11 Pro 64-bit (current release) |
| CPU | Windows 11 compatible, 4 cores | Intel Core i5/i7 or AMD Ryzen 5/7, current generation |
| RAM | 16 GB | 32 GB |
| Storage | 256 GB SSD | 512 GB NVMe SSD |
| Display | 1920x1080 (Full HD) | 2560x1440 |
| Graphics | OpenGL 4.x capable | Dedicated GPU |
| Network | 1 Ethernet port | 2 Ethernet ports (company network and machine network) |
| License | 1 free USB-A port for the CodeMeter license key | 1 free USB-A port for the CodeMeter license key |

> [!warning] Windows 10
> New ProfDia installations are supported on Windows 11 only.
> Microsoft ended support for Windows 10 on October 14, 2025. Existing Windows 10 systems continue to run ProfDia, but they no longer receive security updates.
> Replace these PCs with a Windows 11 system.

## PC Preparations

- Install all available Windows Updates before the ProfDia installation.
- The installation requires a Windows user with administrative privileges.
- Remote support sessions require a stable internet connection. The installation itself does not.
- GTR provides remote support with RustDesk. Before the support appointment, start `rustdesk-gtr.exe` and check that the status bar shows **Ready**. See [[rustdesk-remote-support|RustDesk Remote Support]].

## PC Network Setup

- Establish and test the network connection between the programming PC and the machine.
- PC and machine have to be in the same subnet (e.g. 192.168.0.x, subnet mask 255.255.255.0).
- If the machine is connected to a company network, it needs a static IP address or a DHCP reservation (static lease) on the server.
- If the PC is part of the company network and the machine is connected to a second Ethernet interface, use a different IP range for the machine network. Example:

```
Company network: 10.0.0.x,    subnet mask 255.255.0.0
Machine network: 192.168.0.x, subnet mask 255.255.255.0
```

> [!warning]
> If two Ethernet interfaces use the same IP range, the ProfDia license check and the machine communication fail.
> No license can be generated for the machine.
