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

GDX-Server is a centralized data exchange server for ProfDia/ProfDiaF/ExProg environments. It connects company locations through a modern REST API, enabling seamless project data flow across an entire organization. xxx


> [!quote] Shape the Future of GDX Server
> Active users with a valid GDX-Server license can take part in the development process. **Pro** and **Enterprise** subscribers can suggest new features and help prioritize what gets built next.
>
> We are planning to provide access to a **GTR Discord Server** for active subscribers — a direct line to the development team at GTR.

## Planned Features

Features are marked with one of three priority levels:

- `Next up` — approaching active development
- `Planned` — confirmed, not yet scheduled
- `Under consideration` — likely but not committed

> [!info] Basic — Included in All Tiers
>
> **==Web Admin Panel==** `Next up`
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
> **Docker Deployment** `Planned`
> Official Docker images for containerized deployment.
> 
> **PostgreSQL Support** `Under consideration`
> PostgreSQL as an additional supported database engine.
>

> [!tip] Pro / Enterprise
>
> **MDE Data Query Web Interface** `Planned`
> Tabular query of machine data collection records with CSV export.
>
> **Statistical MDE Data Analysis** `Planned`
> Server-side statistical evaluations of machine data — no local processing required.
>
> **Extended External authentication** `Planned` Extend the existing 3rd party authentication against Active Directory, LDAP, or any REST-based system
> **MDE Data Report Generation** `Under consideration`
> Templated report generation for machine data analysis via TemplatePro.
>
> **Machine State Visualization** `Under consideration`
> Dashboard showing states of known machines. Auto-discovery from time tracking entries with blacklist management for decommissioned machines.

> [!example] Enterprise
>
> **==Database Synchronization==** `Next Up`
> Scheduled synchronization of distributed databases to the central GDX Server at configurable intervals.
>
> **Cross-Server Communication** `Under consideration`
> Project lookups routed transparently across all connected GDX Server instances.

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
>
> **Pro / Enterprise:**
> - Redis caching for high-frequency queries
> - Machine time tracking data retrieval with start/finish times and durations
> - External authentication
> - Built-in diagnostics for testing and troubleshooting authentication configurations
>
> **Enterprise:**
> - Unlimited project database connections
