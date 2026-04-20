---
title: RustDesk Documentation Restructure
date: 2026-04-20
status: approved
---

# RustDesk Documentation Restructure

## Context

The existing document `content/Infrastructure & Administration/rustdesk-remote-support-migration.md` was written during the TeamViewer to RustDesk migration. The migration is now complete, so the migration framing is obsolete. In parallel, the delivery model has changed: GTR now ships a ZIP bundle containing three executables (`rustdesk.exe`, `rustdesk-gtr.exe`, `rustdesk-reset.exe`) from a shortened URL (`https://dl.gtr.de/rd`) and runs its own RustDesk rendezvous/relay server at `rustdesk.gtr.de`.

The current single document mixes end-user instructions with IT administrator detail. Customers who need a quick "download, start, share ID" guide have to wade through firewall rules and bandwidth tables.

## Goals

1. Remove all migration-era content from the main document.
2. Rename the main document to reflect its new purpose: `rustdesk-technical-information.md`.
3. Document the three executables in the ZIP bundle.
4. Document the manual RustDesk client configuration path using GTR's config string.
5. Split the audience: a separate, plain-language document for non-technical end users under a new `content/Support/` folder.
6. Document the RustDesk connection flow (rendezvous, NAT traversal, direct P2P, relay fallback) and the privacy implications of GTR's self-hosted server in Germany.

## Non-Goals

- Changing the build pipeline, layout, or explorer configuration.
- Rewriting the troubleshooting content beyond removing migration references.
- Translating the documents.

## File Operations

| Action | Path |
|---|---|
| Rename | `content/Infrastructure & Administration/rustdesk-remote-support-migration.md` → `rustdesk-technical-information.md` |
| Create | `content/Support/rustdesk-remote-support.md` |
| Copy image | `RustDesk-Relay-Server.png` → `content/Infrastructure & Administration/images/rustdesk-relay-server.png` |
| Copy image | `RustDesk-Relay-Server.png` → `content/Support/images/rustdesk-relay-server.png` |

The source PNG at the repository root can remain in place or be removed after the copies exist; the design assumes it stays until the editor confirms.

## Document 1: Technical Information (IT audience)

**Path:** `content/Infrastructure & Administration/rustdesk-technical-information.md`

### Frontmatter

```yaml
---
title: "RustDesk Technical Information"
draft: false
tags:
  - infrastructure
  - remote-support
  - networking
  - security
---
```

### Outline

1. **tl;dr callout**
   - GTR no longer uses TeamViewer.
   - Download bundle: `https://dl.gtr.de/rd`
   - GTR rendezvous/relay server: `rustdesk.gtr.de` (hosted in Germany).
2. **Overview** — short, non-migration framing: what RustDesk is, why GTR runs its own server.
3. **The ZIP Package: Three Executables**
   - `rustdesk.exe` — stock RustDesk binary, latest version.
   - `rustdesk-gtr.exe` — GTR caller that injects the GTR server configuration (ID server, relay, public key) so the client connects through `rustdesk.gtr.de` instead of the public RustDesk servers.
   - `rustdesk-reset.exe` — reverts the GTR-specific configuration. Only needed if a customer also receives RustDesk support from another company using the public servers or their own infrastructure.
4. **Connection Flow**
   - Both peers register with the rendezvous server (`hbbs`) at `rustdesk.gtr.de`.
   - The server brokers a NAT hole-punching handshake.
   - If NAT traversal succeeds, traffic flows **directly peer-to-peer** between the two PCs. The GTR server is no longer in the data path.
   - If NAT traversal fails, traffic is relayed through GTR's `hbbr` (also on `rustdesk.gtr.de`, in Germany).
   - Session payload is end-to-end encrypted (RSA 4096 + AES 256). The relay cannot decrypt.
5. **Manual Configuration**
   - When to use it (RustDesk already installed, user wants to point it at the GTR server without running `rustdesk-gtr.exe`).
   - Config string in a fenced code block for copy/paste:
     ```
     9JSPB12SrhEMlR3byk3TJhVS4RUTHZlTktkRDJHMvVHZZlEZSN3Y6dmV6VFMQJiOikXZrJCLiIiOikGchJCLiIiOikXYsVmciwiIlRmLyR3Zus2clRGdzVnciojI0N3boJye
     ```
   - Step-by-step import walkthrough: Settings → Network → Unblock Network Settings (admin privileges) → ID/Relay-Server → **Import from clipboard**.
   - Expected result: `ID-Server` shows `rustdesk.gtr.de`, `Key` field is populated.
   - Screenshot: `images/rustdesk-relay-server.png`.
6. **Network Requirements**
   - Reachability: `rustdesk.gtr.de` must be reachable from client machines.
   - Outbound ports (unchanged): TCP 21115, TCP/UDP 21116.
   - Firewall rule examples (Windows Firewall, UFW, firewalld, pfSense) — keep existing content.
7. **VPN, Proxy, SSL Inspection** — keep existing content.
8. **Bandwidth & Performance** — keep existing content.
9. **Deployment Checklist** — keep, update to remove TeamViewer references.
10. **Troubleshooting** — keep existing content; update references from generic "RustDesk server" to `rustdesk.gtr.de` where appropriate.
11. **FAQ** (trimmed)
    - Keep: "Is RustDesk safe?", "Will my files be visible?", "What happens to my data?", "What if my firewall is very restrictive?"
    - Remove: "Do I need to allow TeamViewer anymore?", "Why is RustDesk better than TeamViewer?"
    - **Add: "Where does the connection go? Is my data leaving Germany?"** — covers self-hosted server in Germany, direct P2P when possible, relay fallback still in Germany, no US cloud, end-to-end encryption.
12. **Support & Resources** — keep existing contact block.

### Content to Remove

- "What's Changing?" section.
- TeamViewer vs RustDesk comparison table.
- "Key Advantages of RustDesk" bullet list (migration-era selling points).
- All wording referencing the 2025/2026 migration deadline.

## Document 2: End-User Guide (non-technical audience)

**Path:** `content/Support/rustdesk-remote-support.md`

### Frontmatter

```yaml
---
title: "RustDesk Remote Support"
draft: false
tags:
  - support
  - remote-support
  - end-user
---
```

### Outline

1. **tl;dr callout**
   - GTR no longer uses TeamViewer.
   - Download: `https://dl.gtr.de/rd`
2. **What is RustDesk?** — one short paragraph in plain language.
3. **How to start a support session**
   1. Download the ZIP from `https://dl.gtr.de/rd`.
   2. Unpack the ZIP to any folder (no installation required on Windows).
   3. Double-click `rustdesk-gtr.exe` to start the client preconfigured for GTR.
   4. Read the ID and one-time password shown in the client to your GTR engineer (by phone or email).
   5. Approve the connection prompt when the engineer connects.
   6. Close RustDesk when the session is finished.
4. **If another company also supports you via RustDesk**
   - Run `rustdesk-reset.exe` once to revert the GTR configuration.
   - Next time you need GTR support, run `rustdesk-gtr.exe` again.
5. **Already have RustDesk installed?** (simplified manual config)
   - Copy this text:
     ```
     9JSPB12SrhEMlR3byk3TJhVS4RUTHZlTktkRDJHMvVHZZlEZSN3Y6dmV6VFMQJiOikXZrJCLiIiOikGchJCLiIiOikXYsVmciwiIlRmLyR3Zus2clRGdzVnciojI0N3boJye
     ```
   - Open RustDesk → Settings → Network → Unblock Network Settings.
   - **You may need administrator rights for this step. If you do not have them, please ask your IT administrator for help.**
   - Go to ID/Relay-Server and click **Import from clipboard** (the small icon at the top right).
   - Screenshot: `images/rustdesk-relay-server.png`.
   - When finished, the ID-Server field should read `rustdesk.gtr.de` and the Key field should be filled in.
6. **Privacy and security (short)**
   - GTR runs its own RustDesk server in Germany. No US cloud provider is involved.
   - When possible, the connection is established directly between your PC and the GTR engineer's PC.
   - All session traffic is encrypted end-to-end.
7. **Need help?**
   - Email `gtr-aa@gtr.de`
   - Support Portal: https://tickets.gtr.de
   - Phone: +49 7361 94 11 0

## Style Rules

- No em dashes anywhere in either document. Use commas, parentheses, or separate sentences instead.
- Technical doc: professional, precise, admin audience.
- End-user doc: plain language, short sentences, numbered steps for any multi-step action.

## Implementation Order

1. Copy the PNG into both `images/` subdirectories (creating folders as needed).
2. Rename the old migration doc to the new technical doc path.
3. Rewrite the technical doc contents per the outline above.
4. Create the end-user doc from scratch per the outline above.
5. Build locally with `npm run quartz build` to verify both documents render and images resolve.
6. Commit with a descriptive message covering the rename, rewrite, and new document.

## Verification

- `npm run quartz build` completes without broken-link warnings for the new documents.
- The `RustDesk-Relay-Server` screenshot renders in both documents.
- The config string code block is selectable and copyable in the rendered HTML.
- No em dashes in the rendered output of either document (spot check).
