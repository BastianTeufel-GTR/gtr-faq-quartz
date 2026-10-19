---
title: GDX Server
draft: false
tags:
  - roadmap
  - development
permalink: roadmaps/gdx-server
cssclasses:
  - hide-title
---
# GDX Server Development Roadmap

GDX-Server is a centralized data exchange server for ProfDia/ProfDiaF/ExProg environments. It connects company locations through a REST API, so project data flows across all locations of an organization.

Development currently focuses on the Pro and Enterprise tiers. Further Basic features follow later.


> [!quote] Shape the Future of GDX Server
> Active users with a valid GDX-Server license can take part in the development process. **Pro** and **Enterprise** subscribers can suggest new features and help prioritize what gets built next.
>
> We are planning to provide access to a **GTR Matrix Server** for active subscribers. It gives them a direct line to the development team at GTR.

## Planned Features

Features are marked with one of four priority levels:

- `In Development` - currently in development
- `Next up` - approaching active development
- `Planned` - confirmed, not yet scheduled
- `Under consideration` - likely but not committed

> [!info] Basic (included in all tiers)
>
> **Automatic License Renewal** `Planned`
> Automatically applies follow-up licenses on subscription renewal.
>

> [!tip] Pro / Enterprise
>
> **Statistical MDE Data Analysis** `Planned`
> Server-side statistical evaluations of machine data without local processing.
>
> **MDE Data Report Generation** `Under consideration`
> Templated report generation for machine data analysis via TemplatePro.
>
> **Machine State Visualization** `Under consideration`
> Dashboard showing states of known machines. Auto-discovery from time tracking entries with blacklist management for decommissioned machines.
>
> **PostgreSQL Support** `Under consideration`
> PostgreSQL as an additional supported database engine.

> [!example] Enterprise
>
> **Cross-Server Communication** `Under consideration`
> Project lookups routed transparently across all connected GDX Server instances.
>
> **Docker Deployment** `Planned`
> Official Docker images for containerized deployment.

## Already Available

> [!success]+ Currently Shipped Features
>
> **All Tiers:**
> - 1 project database connection
> - Supported databases: Firebird 5, Microsoft SQL Server and SQLite. Firebird 2.5 is no longer supported.
> - Centralized project data storage, search, and retrieval
> - Full project export and import as ZIP packages with automatic integrity verification
> - Document management (PDF, images, technical drawings) linked to projects
> - **Project Dashboard**: Browser view of all projects with search, sorting, column selection and CSV export. Documents open in the browser or download, and each project downloads as a ZIP package.
> - User management with role-based access control
> - **Permission Groups**: Per-database groups decide who sees a database and who may open documents, download, export or upload projects. Default groups apply to new users.
> - **Project Upload via Web Interface**: Upload project ZIP packages in the browser. ZIP files exported by ProfDia® without project metadata are accepted with a project ID.
> - Interactive API documentation (Swagger UI)
> - Request analytics and performance monitoring
> - Redis caching for high-frequency queries. A Redis server is required in all tiers.
> - Granular feature licensing per tier (Basic, Pro, Enterprise)
> - Licensing with a CodeMeter dongle or a hardware-bound license file. A new license takes effect without a server restart. The admin panel warns 30 days before a license expires.
> - Client-side integration in ProfDia(F) project management
> - Security: JWT/HMAC-SHA512 authentication, Bcrypt password hashing, HTTPS/TLS, CORS, server and client clock verification
> - **Fully Localized Web Interface**: Admin panel and user views in German and English. All server administration tasks are available in the web UI.
>
> **Pro:**
> - all from Basic
> - Up to 3 project database connections
> - Machine time tracking data retrieval with start/finish times and durations
> - **Time Tracking Web Interface**: Tabular view of machine data collection records with date range filter, CSV export and ZIP download of attached project files
> - Time tracking permissions per group: view, download, CSV export and write access
> - External authentication against SAP, Active Directory/LDAP or any REST-based system
> - Built-in diagnostics for testing and troubleshooting authentication configurations
>
> **Enterprise:**
> - all from Pro
> - Unlimited project database connections
> - **Database Synchronization**: Scheduled synchronization of distributed databases to the central GDX Server at configurable intervals, with a branch ID per location.
