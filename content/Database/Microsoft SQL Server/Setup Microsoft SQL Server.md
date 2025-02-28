---
title: Setup Microsoft SQL Server
draft: false
tags:
---

## Preface

To use this guide, the following software has to be installed and configured
- Microsoft SQL Server 2014+ / Express 
- Microsoft SQL Server Management Studio

## Create Database and Tables

- Download the SQL file containing the database structure [here](http://pubfiles.gtr.de/mssql_2023.zip)
- connect to the SQL Server using the MS SQL Server Management Studio

![[Pasted image 20231024145745.png]]

- Click on Databases > New Database

![[Pasted image 20231024145832.png]]

- Enter the desired database name, e.g. **ProfDia**

![[Pasted image 20231024145911.png]]

- Open the downloaded file, File > Open > File
- Select the created database name (here **ProfDia**) and click on **Execute**

![[Pasted image 20231024150054.png]]



![[Pasted image 20231024150142.png]]


- The Success message should be shown as follows:

![[Pasted image 20231024150351.png]]

![[Pasted image 20231024150405.png]]


>[!summary]
>The database and the tables structure is now created
>Check with the IT department about the access rights to the database.
> 
> The required access rights to the database are as follows

![[Pasted image 20231024150731.png]]


The users can login using an SQL User Account or by **Integrated Security** using their Windows domain user.