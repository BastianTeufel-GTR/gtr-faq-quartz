---
title: Application Backup and Restore
draft: false
tags:
---

# Application backup and restore

Using this function, a backup and restore of all settings from ProfDia(F) / Exprog installations can be easily made.

![[ApplicationBackupAndRestore.png]]

- Select the installation path of ProfDia(F)/Exprog by clicking on the  input field below **Application Directory**
- By clicking **Backup Directory** the backup path for the ProfDia/Exprog settings has to be configured (e.g. c:\profdia_backup)
- When both fields are configured, the **Analyze** button becomes visible. The ProfDia Toolbox scans the source directory for the installed product and loads the corresponding backup rules. 
- After a successful program scan the toolbox shows the buttons **Backup** and **Restore**

>[!note] 
>If you are using a BDE database you need to migrate your database first. 
>In case of a BDE installation, the option **Backup Database** needs to be deactivated
- By confirming **Backup** the relevant data is copied to the backup location.
- Close the ProfDia Toolbox.
- Uninstall the previous version of ProfDia(F)/Exprog.
- After uninstalling, the installationpath of the software still exists. Rename that folder (e.g. c:\\profdia_old).
- Install the new ProfDia(F)/Exprog version. 
- Restart the ProfDia Toolbox and go to **Application Backup and Restore**. Set both paths like  before.
- Click on **Analyze**
- Click on **Restore**

>[!note] 
>The ProfDia Toolbox has different approaches for the backup and restore strategy. Some files are copied directly to the installation directory, others are compared row by row


- If there were manual changes to the post processor configuration (e.g. PPFanuc.ini), the PPConfig file needs to be compared to the updated version. 
  Both PP Config files can be found in the installation directory. The original file has been renamed to **PP"File"_old.ini**. 
  The file compare can be done using any text editor or a specialized tool like [WinMerge](https://winmerge.org/)
