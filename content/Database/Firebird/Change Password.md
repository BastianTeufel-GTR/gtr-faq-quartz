---
title: Change Password
draft: false
tags:
---


## Change Password for a Firebird Database user

The default credentials for FireBird are

| | |
|--- |--- |
|Username: | SYSDBA |
|Password: | MASTERKEY |

If this default settings need to be changed follow the guide below

## Change Password for Database

- Open a Terminal (cmd or PowerShell)
- Enter the directory of the gsec.exe by entering the following command:

````sh
 cd '.\Program Files (x86)\Firebird\Firebird_2_5\bin\'
````

![[fb_001_changepwd.png]]

call gsec.exe to set a new password like shown below:


![[fb_002_changepwd.png]]

````sh
.\gsec.exe -user sysdba -password masterkey -database "C:\Program Files (x86)\Firebird\Firebird_2_5\security2.fdb"
````

you should now be inside the **gsec** shell.

The line is starting with **GSEC>** (the above screenshot)

Enter the next command to change the password:

````sh

modify sysdba -pw correct_horse_battery_staple

````


> [!note] 
>   Replace the **correct_horse_battery_staple** with your password[^1]

> [!warning] 
>  The new password can only be 8 digits long, otherwise only the first 8 digits are used
    
leave the **GSEC** shell by entering quit

````sh
quit
````


## Adjust Configuration

Start ProfDia / ExProg Toolbox and open the **Database configuration** tab

Click **Load from INI** to load the current configuration

![[fb_003_changepwd.png]]

Enter the new password in the password field and apply the changes by pressing the **Setup Database** button.

The database configuration will then be updated accordingly.

For additional security the checkbox **Encrypt Passwords** can be checked.

> [!note] 
> For the encrypted password option, the file **EncryptionModule.dll** must be available inside the program folder. Please make sure that the file exists before enabling this option.
> 
> The password will then be stored as an **AES-256** encrypted string.

[^1]: [Link](https://xkcd.com/936/)