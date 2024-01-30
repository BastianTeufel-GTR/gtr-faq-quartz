---
title: Database Migration BDE-SQL
draft: false
tags:
---

# Database Migration BDE -> SQL

>[!info]
> For further information check the ProfDia manual.


![[DatabaseMigration_01.png]]

This function is used to migrate an old BDE database structure to the new SQL format.
The default database system used by ProfDia/Exprog is the Firebird 2.5 database system.
As an alternative, a Microsoft SQL Server can be used to store the project files.


> [!info]
> Since version 2.0 the BDE database isn't supported anymore. 
> The existing BDE databases has to be migrated to a SQL database. 
> 
    

- Insert the current BDE Database alias in the corresponding field **Existing DB Alias** 
- Set the **Project Files root folder** to your current project files location 
- Click on **Migrate Projects** to start the migration process

> [!warning]
> The window could seem unresponsive while the process is running
> wair for the status view to be updated.
> 

>[!info] 
>The migration to MS SQL Server is described in the following documents:
> [[Setup Microsoft SQL Server]]
> [[Migrate from Firebird to MSSQL]]
    
    

