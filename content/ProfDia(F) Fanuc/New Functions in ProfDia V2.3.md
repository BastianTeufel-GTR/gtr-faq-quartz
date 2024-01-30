---
dg-publish: true
---

# New Functions in ProfDia V2.3

## New Database System

The **BDE** (Borland Database Engine) as used in older ProfDia(F) versions is deprecated.
There has been no development or improvements since Borland was sold several times over the last years.

The ProfDia versions starting with version **2.0** use the open source database system **Firebird 2.5** by default (or **Microsoft SQL Server** as an alternative) to store and manage the ProfDia(F) projects.

- This heavily increases the stability of the database
- Simplifies the installation and setup of a common database
- Simplifies the database backup and restore
- Decreases the size of the overall data usage of Database and Projectfiles by compressing the data prior to storing it (size reduction of 30%-70%)
- All data is stored inside the database - so no network shares with read/write privileges are needed anymore
- Real Multi-User database with Client/Server architecture
- The Firebird Database Server is very small in size approx. 10MB
- Improved document management to store additional data with the project
- Improved real-time search function
- Adjustable window size and position

![[db_hfenster_sql.png]]


## Time Tracking Functionality (Optional)

Using the **Automation Server** it is possible to track the measuring and machining times of all run projects for statistical analysis.

Reports can be generated for:

- a single project (tool number) 
- a machine to determine the machine utilization
- for a time period

The data can be easily exported from the database to be used in custom software for time or machine utilization tracking.

In addition each project can be backed up including the configuration and measurement data for later analysis of the measurement data.

> [!note] 
> A seperate license is needed for the time tracking functionality

## WAN Server (Optional)

Share ProfDia projects across all sites using inbuild functions of the ProfDia Database program.

> [!hint] Requirements
>  - The sites have to be connected directly or by VPN
>  - The routing needs to be set up correct, so that socket connections can be established between the WAN Server(s) and the Clients

**Client Features:**

- Direct integration of the WAN Client into the ProfDia Database Application
- Search for existing projects on a single server or on all available servers
- Push projects to a single server or all available servers
- Push multiple projects to a server
- check server availability
- upload and download projects with an added suffix to prevent overwriting of existing projects
- the prefix can be static or based on the server name (e.g. Project_srv1, Project_srv2, ...)

**Server Features:**

- User authentication / access restriction based on IP addresses
- handle multiple simultanious connections
- Run as Standalone Application
- Run as Windows Service

**WAN Server Configuration Client Features:**

Client Side Configuration

![[wan_client_config.png]]

- Setup Server IP and Port
- Set database field and value for an additional download marker
- Set project upload warn level when uploading multiple projects at once
- Enable/Disable Multicast support
- Configure Server list for upload
- Configure Connection Properties

Server Side Configuration

![[wan_server_config.png]]

- Update database structure if needed
- Set Server listening IP and Port
- Set additional field and value for upload marker (optional)
- limit server access to 
    - No restrictions 
    - restricted access 
    - restriction only for upload
- Whitelist IPs for Server Access
- Whitelist IP Ranges for Server Access
- Create License Request
- Install License File


> [!note] 
> A seperate license per server is needed for the WAN Server Application

## New and improved 3D Simulation

### Features

- The new 3D simulation is based on OpenGL. Therefore a graphics card with an installed OpenGL driver is needed.
- The whole tool can be analyzed prior to cutting.
- All layers in the simulation model can be enabled/disabled on demand (Relief Surface, Cutting Edge, Wire Direction, ...)

### Visualize and analyze complete tool

![[3d_sim_all_teeth.png]]

An optional **control circle** can be drawn on the outer diameter of the tool to check for clearance.
It's directly visible if the configured relief angles are sufficient for the tool to work.

![[3d_sim_all_teeth_ring.png]]


### Visualize complex tools and profiles

- Visualize complex profiles 
- Easily check for clearance
- Check the wire deflection and wire direction changes along the profile (bright green lines)
- Zoom In- and Out and rotate the tool as needed

![[3d_sim_teeth_profile.png]]]

- Optionally check for clearance at the diameter using the **control circle**

### Manual Collision Detection

Manually check the tool for potential collisions using the **Wire Direction Extension** features

![[3d_sim_wirepath_1.png]]

![[3d_sim_wirepath_2.png]]

When enabling the **Wire Direction Extension** layer in the simulation potential collisions can be directly detected.

Based on the information from the simulation the relief angles can be manually adjusted until the resulting tool will be working
and no tooth at another angular position will be damaged while cutting the tool.

> [!success] 
> This massively helps to reduce the time needed for test cuts and dry runs.
> It also helps to minimize the amount of machining failures and therefore junk tools.


![[3d_sim_wirepath_3.png]]


![[3d_sim_wirepath_4.png]]


### Visualize the tool including the real measurement data

In addition to the 2D information from the DXF, the simulation shows the real NC data, includeing the Z values from the measuring results as it is send to the machine.

Rake- and Axialangles can be checked.

> [!success] 
> By visualizing the tool in 3D it's also possible to check if the tool body was touched instead of the rake surface.
> A quick change in the rake angle or a "malformed" cutting edge coul indicate a wrong placed measuring point.

![[3d_sim_xyz_axis.png]]