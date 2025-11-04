---
title: "Remote Support: Transition from TeamViewer to RustDesk"
draft: false
tags:
---

# Remote Support: Transition from TeamViewer to RustDesk


> [!tldr] tl;dr
> - GTR will stop using TeamViewer starting on January 1st 2026
> - [Download Rustdesk on Github](https://github.com/rustdesk/rustdesk/releases/download/latest)

## Overview

We are transitioning our remote support infrastructure from TeamViewer to **RustDesk** to provide better security, transparency, and cost efficiency. This document guides both end-users and IT administrators through the transition process and technical requirements for cloud-hosted remote support sessions. The transition to RustDesk will be finished until the end of 2025.

**Key Advantages of RustDesk:**
- Open-source codebase with transparent security model and public audit possibilities
- End-to-end encryption (RSA 4096 + AES 256-bit)
- Improved performance and lower latency
- Industry-standard security protocols

---

## For End Users

### What's Changing?

TeamViewer is being replaced with RustDesk for remote support sessions. The user experience will be familiar, but with improved speed and security.

### System Requirements

RustDesk is compatible with a wide range of platforms:

| Operating System | Minimum Version |
|---|---|
| **Windows** | Windows 7 and later |
| **macOS** | macOS 10.12 (Sierra) and later |
| **Linux** | Ubuntu 16+, CentOS, Fedora, Debian derivatives, Arch, openSUSE, NixOS |
| **Other** | Android, iOS (receive-only), Web browser access |

**Hardware Requirements:**
- Modest CPU and RAM requirements; runs on older systems
- Minimum 1 Mbps internet connection recommended

### Getting Started

1. **Download**: Visit [rustdesk.com](https://rustdesk.com) or [rustdesk on github](https://github.com/rustdesk/rustdesk/releases/download/latest) and download the client for your operating system
2. **Install**: Depending on the Operating Systems, an Installation may be required. 
   Follow standard installation process, by executing the downloaded file.
   **On Windows RustDesk can be run without installation**
3. **Connect**: Pass the automatically generated ID and one time password to the GTR engineer to establish the connection.
4. **Session**: Support engineer/technician controls your desktop with your permission

### Technical Comparison: TeamViewer vs RustDesk

| Feature               | TeamViewer                  | RustDesk                               |
| --------------------- | --------------------------- | -------------------------------------- |
| **Code Transparency** | Proprietary (closed-source) | Open Source (GPLv3)                    |
| **Encryption**        | AES-256                     | RSA 4096 + AES-256 (end-to-end)        |
| **Server Hosting**    | Cloud-only                  | Cloud-hosted                           |
| **Performance**       | Good                        | Excellent (optimized P2P architecture) |
| **Connection Setup**  | Simple                      | Simple                                 |
| **Port Usage**        | Dynamic                     | Fixed (see admin section)              |
| **Auditability**      | Limited (proprietary)       | Full (open-source)                     |

### What to Expect During a Support Session

- You will see the RustDesk client request your permission before any connection begins
- Your desktop will be visible to the support technician while the session is active
- Audio and file transfer may be available depending on session configuration
- You can terminate the connection at any time
- All sessions are encrypted end-to-end

---

## For IT Administrators

### Network Requirements - Client-Side Outbound Connections

RustDesk requires specific outbound network access to function properly. Configure your firewall to allow the following **outbound** connections from client machines:

#### Required Outbound Ports

| Protocol | Port | Direction | Purpose | Notes |
|---|---|---|---|---|
| **TCP** | 21115 | Outbound | Control & command connection | Primary connection |
| **TCP** | 21116 | Outbound | Relay fallback | Used if UDP blocked |
| **UDP** | 21116 | Outbound | Relay connection | Preferred for better performance |

**Important Notes:**
- Port 21115 (TCP) handles command and control signals
- Port 21116 should be enabled for **both TCP and UDP** for optimal performance
- UDP connection is attempted first; TCP is used as fallback if UDP is blocked
- All connections use TLS 1.2 or higher encryption

#### Recommended Firewall Rules

**Windows Firewall (Outbound Rule)**

```
Rule Name: RustDesk Remote Support
Direction: Outbound
Protocol: TCP/UDP
Remote Port: 21115, 21116
Remote Address: Any
Action: Allow
```

**Linux (UFW)**

```bash
sudo ufw allow out 21115/tcp
sudo ufw allow out 21116/tcp
sudo ufw allow out 21116/udp
```

**Linux (firewalld)**

```bash
sudo firewall-cmd --permanent --add-port=21115/tcp --zone=public
sudo firewall-cmd --permanent --add-port=21116/tcp --zone=public
sudo firewall-cmd --permanent --add-port=21116/udp --zone=public
sudo firewall-cmd --reload
```

**pfSense / Enterprise Firewall**

Create outbound rules allowing traffic to any destination on ports 21115 and 21116 (both TCP and UDP). Consider creating a traffic alias for easier management:

```
Alias: RustDesk_Ports = 21115, 21116

Firewall Rule:
- Direction: Outbound
- Protocol: TCP/UDP
- Destination Port: RustDesk_Ports
- Action: Pass
- Log: Optional (for audit trails)
```

### VPN & Proxy Configuration

**VPN Passthrough:**
- RustDesk works transparently through most VPN connections without special configuration
- Ensure VPN network policies don't block ports 21115/21116
- For split-tunnel VPNs, ensure RustDesk traffic routes through the VPN tunnel

**Proxy Support:**
- RustDesk supports HTTP and HTTPS proxy with authentication
- Configure proxy settings in the RustDesk client:
  - Open RustDesk → Settings → Network
  - Enter proxy server address, port, username, and password (if required)
- Proxy authentication supports basic credentials
- If your firewall performs SSL inspection, consider adding exceptions for RustDesk connections to avoid performance issues

**Firewall SSL Inspection:**
- If your firewall performs SSL/TLS inspection, whitelist RustDesk servers or disable inspection for RustDesk traffic
- SSL inspection can cause connection delays or failures

### Bandwidth & Performance Considerations

**Connection Overhead:**
- Baseline (idle): 50-100 KB/s
- Active session (screen sharing): 200 KB/s - 2 MB/s (depends on resolution and activity)
- Audio only: 20-50 KB/s
- File transfer: Varies based on file size and network speed

**Typical Bandwidth Usage:**
- Standard screen (1920x1080): 500 KB/s - 1.5 MB/s for typical desktop activity
- High-resolution (2560x1440): 1 MB/s - 2.5 MB/s
- Low-resolution/minimal updates: 100-300 KB/s

**Recommended Minimum Connection Speed:**
- 1 Mbps for basic remote support
- 5 Mbps for comfortable interactive sessions
- 10+ Mbps for multiple concurrent sessions or high-resolution screens

**Latency:**
- Direct connections: <50ms typical
- Relay connections: <200ms typical
- Connection type depends on network NAT configuration and firewall settings

### IT Administrator Deployment Checklist

- [ ] Review and approve firewall port requirements (21115 TCP, 21116 TCP/UDP outbound)
- [ ] Configure firewall rules in your environment
- [ ] Test RustDesk connectivity from sample client systems behind firewall
- [ ] Verify proxy/SSL inspection exceptions are in place if applicable
- [ ] Document the connection process for your help desk team
- [ ] Test file transfer functionality if required for support workflows
- [ ] Establish audit logging requirements and procedures
- [ ] Create troubleshooting documentation for help desk

### Bandwidth Planning for Administrators

**Capacity Calculations:**
- For concurrent sessions: Multiply typical bandwidth per session by max concurrent support sessions
- Example: 3 concurrent sessions × 1 MB/s = 3 MB/s minimum pipe capacity
- Add 20-30% overhead for protocol negotiation and network variations

**Network Policy Considerations:**
- Configure QoS (Quality of Service) rules if RustDesk conflicts with business-critical traffic
- RustDesk can be prioritized as lower priority than production traffic
- Monitor bandwidth usage to identify any anomalies

---

## Troubleshooting

### Connection Failures

**Problem: "Cannot connect to RustDesk server"**

**Troubleshooting steps:**
1. Verify TCP 21115 and UDP/TCP 21116 are open outbound in firewall
2. Test connectivity with: `telnet rustdesk-servers.com 21115` (or use PowerShell)
3. If behind proxy: Verify proxy settings in RustDesk client (Settings → Network)
4. Temporarily disable VPN to test direct connectivity
5. Check if SSL inspection is blocking the connection; try adding exception
6. Contact support if issue persists

**Problem: "Connection times out after initial connect"**

**Troubleshooting steps:**
1. May indicate relay server issue; ensure both TCP and UDP rules are open
2. Verify UDP 21116 is specifically allowed in firewall
3. Test latency: `ping rustdesk-server-dns.com`
4. If latency is very high (>500ms), connection may be routed through relay
5. Try switching between direct/relay modes if available in client settings

### Performance Issues

**Slow screen updates:**
- Check available bandwidth using speedtest or similar tool
- Reduce screen resolution or quality settings in RustDesk client
- Verify no competing network usage on that connection
- Switch from relay to direct connection if possible

**High latency:**
- Latency >100ms may indicate relay connection instead of direct
- Check network path with tracert/traceroute to see route to server
- If using VPN, verify VPN server location is optimal

**Audio/Video issues:**
- Try disabling audio if video connection is priority
- Reduce video resolution in client settings
- Verify network bandwidth is sufficient for session type

### Common Error Messages

| Error | Cause | Solution |
|---|---|---|
| "Failed to authenticate" | Credentials incorrect or session expired | Verify authentication credentials; restart client |
| "Network unreachable" | Firewall blocking ports | Check firewall rules; verify ports 21115/21116 are open |
| "Connection refused" | Server unreachable | Verify server address in settings; check DNS resolution |
| "Relay server error" | Can't reach relay | Both TCP and UDP on 21116 must be open |

---
## Support & Resources

**For End-Users:**
- RustDesk Download: https://rustdesk.com
- User Documentation: https://rustdesk.com/docs/

**For IT Administrators:**
- RustDesk Documentation: https://rustdesk.com/docs/
- GitHub Repository: https://github.com/rustdesk/rustdesk
- Security Advisories: Monitor GitHub releases for updates
- Configuration Guides: https://rustdesk.com/docs/en/client/

**Internal Support:**
- Email: gtr-aa@gtr.de
- Support Portal: [support portal](https://tickets.gtr.de)
- Help Desk Phone: +49 7361 94 11 0

---

## FAQ

**Q: Is RustDesk safe?**
A: Yes. RustDesk uses end-to-end encryption with RSA 4096-bit keys and AES-256 encryption. The open-source code has been publicly audited, and the support servers are managed professionally.

**Q: Will my files be visible during a support session?**
A: The technician will have full screen access during the session. File transfer is a separate function that requires explicit permission. All data remains encrypted.

**Q: What happens to my data?**
A: All data is encrypted end-to-end. RustDesk servers cannot decrypt your session data. For cloud-hosted deployments, data in transit is protected but not stored on servers.

**Q: Do I need to allow TeamViewer anymore?**
A: No, after the transition period TeamViewer access can be disabled.

**Q: Why is RustDesk better than TeamViewer?**
A: RustDesk offers open-source transparency, better performance, lower cost, and end-to-end encryption. The code can be audited publicly, providing better security assurance.

**Q: What if my firewall is very restrictive?**
A: RustDesk can work through proxies and most firewalls using ports 21115 and 21116. If all ports are blocked, contact IT to discuss exceptions. RustDesk can also work through VPNs.
