# Network Connection Helper

This is a Windows service that watches in the background that the automation interface remains active (watchdog for ProfDia / ProfDiaF services).
The exe must be copied into the program directory and must be installed as follows:

- Press Windows + R simultaneously
- In the opened window enter **cmd**.
- Enter the following command and confirm with Enter: **NetworkConnectionHelper /install**.
- Helper is now installed and activated
- Uninstallation is done with the command **NetworkConnectionHelper /uninstall**.
 
The configuration is done via prdncsrv.ini in your installation directory.
