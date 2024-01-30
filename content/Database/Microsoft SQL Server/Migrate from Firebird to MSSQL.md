---
dg-publish: true
---
>[!summary] 
>When the BDE database was migrated to Firebird in a first step, or a company decides to move from Firebird to MS SQL at a later point, this guide can be used


## Preparation

- Copy the existing database configuration file **NCPro_DB.INI** file in the application directory to **NCPro_DB_Source.INI**
- Start an up to date version of [ProfDiaToolbox](http://pubfiles.gtr.de/ProfDiaToolbox.zip)
- Go to **Database Configuration**
- Click on Load From INI

![[Pasted image 20231024152108.png]]

- Adjust the elements at (1) and (2) according to your new MS SQL Server

![[Pasted image 20231024152320.png]]

When the modifications are entered, click on **Setup Database** then **Test Connection**

When everything was setup correct, the success message should pop up

![[Pasted image 20231024153007.png]]

otherwise an error message showing the actual problem will be shown.

When the connection to the new Database can be established continue with the next step

## Data Migration Standard Procedure

![[Pasted image 20231025111724.png]]

- open the **Migrate/Merge SQL->SQL** tab
- Copy the absolute path to your "old" database configuration in the **Source Database Config File** field
- Copy the absolute path to your updated database configuration in the **Target Database Config File** field


![[Pasted image 20231025112745.png]]

- When the target database is empty (default), click on the **migrate** button to start the database migration
- Wait for the process to be finished
- When everything is done, the ProfDia Toolbox can be closed and the new database is ready for use

## Data Migration Special Cases

The first migration to the new database has to be done like described above in [[#Data Migration Standard Procedure]].

>[!note]
>The migration script has to be run from the PC having the access rights to the original source database


As soon as the database already contains some projects, the **Merge Settings** have to be applied.

![[Pasted image 20231025113256.png]]

- Check the **Use Merge Mode** option and select the merge type:

| Type | Description |
| --- | --- |
| Skip Existing Projects | Only projects that are not already stored in the new database will be added |
| Overwrite Existing Projects | New projects will be added and existing projects will be overwritten |
| Add with Suffix | All projects from the source database will be added with the **Suffix** value (e.g. original project: 12345, migrated project: 12345_MachineID ) |
