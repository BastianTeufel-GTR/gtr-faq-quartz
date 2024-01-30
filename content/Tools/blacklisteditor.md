# Blacklisteditor

This is a tool to 
This is an application to manage blacklists for update/restore functions from the ProfDia Toolbox. If you want to install a new ProfDia version, you may want to prevent values from the new installation from being replaced. These values are added to the blacklist with this tool.
To create a blacklist, go to your ProfDia installation directory and create a file called "Blacklist.json".
Then run the application.

![Blacklist Editor](images/BlacklistEditor_01.png)

At "Blacklist File" select your blacklist file in the opening explorer and click "New/Load". In the field "INI File Name" enter the file in which a parameter should be set to the blacklist.
In "Section Name" enter the section name where the value is to be found. Section names are always enclosed by **[ ]**. At "Parameter Name" enter the desired parameter name. Now confirm your entries with "Add".
If you want to see which entries you have blacklisted, select "Show Entries". Your entries now appear in the right display field.

If you then open the ProfDia Toolbox and select the tab "Application Backup and Restore" and fill it with the desired directories, after confirming with "1. Analyze App" in the lower part of the program a note in red appears that there is a blacklist.

![Blacklist Backup and Restore](images/BlacklistEditor_02.png)