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

GDX-Server is a centralized data exchange server for ProfDia/ProfDiaF/ExProg environments. It connects company locations through a modern REST API, enabling seamless project data flow across an entire organization. 


> [!quote] Shape the Future of GDX Server
> Active users with a valid GDX-Server license can take part in the development process. **Pro** and **Enterprise** subscribers can suggest new features and help prioritize what gets built next.
>
> We are planning to provide access to a **GTR Matrix Server** for active subscribers - a direct line to the development team at GTR.

## Planned Features

Features are marked with one of three priority levels:

- `In Development` - currently in development
- `Next up` - approaching active development
- `Planned` - confirmed, not yet scheduled
- `Under consideration` - likely but not committed

> [!info] Basic — Included in All Tiers
>
> **==Web Admin Panel Localization==** `Next up`
> Replaces the separate Config Client. All server administration tasks available directly in the web UI.
>
> **Project Management Web Interface** `Planned`
> Upload and download projects via browser.
>
> **Web Interface Localization** `Planned`
> Multi-language support for the web interface.
>
> **Automatic License Renewal** `Planned`
> Automatically applies follow-up licenses on subscription renewal.
> 
> **Project Dashboard**  `Under consideration`
> Full Project Dashboard as a replacement or addition to NCPro_DB (ProfDia Database GUI)
>

> [!tip] Pro / Enterprise
>
> **MDE Data Query Web Interface** `Planned`
> Tabular query of machine data collection records with CSV export.
>
> **Statistical MDE Data Analysis** `Planned`
> Server-side statistical evaluations of machine data - no local processing required.
>
> **Extended External authentication** `Planned` Extend the existing 3rd party authentication against Active Directory, LDAP, or any REST-based system
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
  **Docker Deployment** `Planned`
> Official Docker images for containerized deployment.

## Already Available

> [!success]+ Currently Shipped Features
>
> **All Tiers:**
> - Centralized project data storage, search, and retrieval across multiple databases
> - Full project export and import as ZIP packages with automatic integrity verification
> - Document management (PDF, images, technical drawings) linked to projects
> - User management with role-based access control
> - Interactive API documentation (Swagger UI)
> - Request analytics and performance monitoring
> - Granular feature licensing per Version (Basic, Pro, Enterprise)
> - Client-side integration in ProfDia(F) project management
> - Security: JWT/HMAC-SHA512 authentication, Bcrypt password hashing, HTTPS/TLS, CORS
> - **Web Admin Panel Localization**: All server administration tasks available directly in the web UI.
>
> **Pro:**
> - Redis caching for high-frequency queries
> - Machine time tracking data retrieval with start/finish times and durations
> - External authentication
> - Built-in diagnostics for testing and troubleshooting authentication configurations
>
> **Enterprise:**
> - all from Pro
> - Unlimited project database connections
> - **Database Synchronization**: Scheduled synchronization of distributed databases to the central GDX Server at configurable intervals.
