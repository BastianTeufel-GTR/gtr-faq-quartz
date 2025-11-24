---
title: Application Logging
draft: false
tags:
  - configuration
  - logging
  - troubleshooting
---

# Application Logging

GTR applications include a flexible logging system that can output log messages to multiple destinations. This is useful for troubleshooting issues, monitoring application behavior, and maintaining audit trails.

## Configuration File Location

The logging configuration is stored in:

```
C:\ProgramData\GTR mbH\LogSettings_11.ini
```

This file controls logging behavior for all GTR applications on the system.

## Main Settings

The `[Main]` section controls which logging outputs are enabled:

| Setting | Values | Description |
|---------|--------|-------------|
| `Enabled` | `0` / `1` | Master switch to enable or disable all logging |
| `LogToFile` | `0` / `1` | Write log messages to files on disk |
| `LogToConsole` | `0` / `1` | Display log messages in the application console |
| `LogToSyslog` | `0` / `1` | Send log messages to a Syslog server |
| `LogToEMail` | `0` / `1` | Send log messages via email |
| `LogToDebugString` | `0` / `1` | Output to Windows debug string (for developers) |
| `AlwaysShowDebugMessages` | `0` / `1` | Include debug-level messages in output |
| `AddMemoryUsageToLogout` | `0` / `1` | Append memory usage information to log entries |

## File Logging

When `LogToFile=1`, log messages are written to files on disk. Configure file logging in the `[LogToFile]` section:

| Setting | Description |
|---------|-------------|
| `GlobalLogFolder` | Directory where log files are stored (e.g., `c:\gtrlogs`) |
| `LogFileMaxSizeInMB` | Maximum size of a single log file before rotation (in MB) |
| `MaxBackupFilesCount` | Number of backup log files to keep |

**Example:**
```ini
[LogToFile]
LogFileMaxSizeInMB=2
MaxBackupFilesCount=5
GlobalLogFolder=c:\gtrlogs
```

This configuration creates log files in `c:\gtrlogs`, rotates them when they reach 2 MB, and keeps up to 5 backup files.

## Syslog Integration

For centralized logging, GTR applications can send messages to a Syslog server. Enable with `LogToSyslog=1` and configure in the `[Syslog]` section:

| Setting | Description |
|---------|-------------|
| `ServerName` | IP address or hostname of the Syslog server |
| `ServerPort` | UDP port (default: `514`) |
| `Severity` | Minimum severity level to send |
| `Facility` | Syslog facility identifier |
| `AppendExecNameToLog` | Include application name in messages |

### Severity Levels

| Value | Level | Description |
|-------|-------|-------------|
| `slDebug` | Debug | Detailed debugging information |
| `slInformational` | Info | General operational messages |
| `slNotice` | Notice | Normal but significant events |
| `slWarning` | Warning | Warning conditions |
| `slError` | Error | Error conditions |
| `slCritical` | Critical | Critical conditions |
| `slAlert` | Alert | Immediate action required |
| `slEmergency` | Emergency | System is unusable |

### Facility Values

Common facility values for local use:

| Value | Facility |
|-------|----------|
| `sfLocalUseZero` | Local0 (16) |
| `sfLocalUseOne` | Local1 (17) |
| `sfLocalUseTwo` | Local2 (18) |
| `sfLocalUseThree` | Local3 (19) |
| `sfLocalUseFour` | Local4 (20) |
| `sfLocalUseFive` | Local5 (21) |
| `sfLocalUseSix` | Local6 (22) |
| `sfLocalUseSeven` | Local7 (23) |

## Email Notifications

For critical alerts, GTR applications can send log messages via email. Enable with `LogToEMail=1` and configure in the `[EMail]` section:

| Setting | Description |
|---------|-------------|
| `Host` | SMTP server hostname |
| `Port` | SMTP server port (default: `25`) |
| `UseTLS` | Enable TLS encryption (`0` / `1`) |
| `UseSSL` | Enable SSL encryption (`0` / `1`) |
| `Username` | SMTP authentication username |
| `PasswordFile` | File containing the SMTP password |
| `FromAddress` | Sender email address |
| `RecipientAddress` | Recipient email address |
| `MinLogLevel` | Minimum severity to trigger email (e.g., `Error`) |

**Example:**
```ini
[EMail]
Host=smtp.company.com
Port=587
UseTLS=1
UseSSL=0
Username=alerts@company.com
PasswordFile=emailpass.txt
MinLogLevel=Error
FromAddress=alerts@company.com
RecipientAddress=admin@company.com
```

This configuration sends an email notification whenever an error or more severe event occurs.

## UI Log Display

The `[Memo]` section controls how logs appear in application UI components:

| Setting | Description |
|---------|-------------|
| `NumRows` | Maximum number of log rows to display |
| `PrependDateToLog` | Add timestamp to each log entry (`0` / `1`) |

## Common Configurations

### Development / Troubleshooting

Enable verbose logging to console and file:

```ini
[Main]
Enabled=1
LogToFile=1
LogToConsole=1
AlwaysShowDebugMessages=1
```

### Production Server

Log to file only, with email alerts for errors:

```ini
[Main]
Enabled=1
LogToFile=1
LogToConsole=0
LogToEMail=1
AlwaysShowDebugMessages=0

[EMail]
MinLogLevel=Error
```

### Centralized Logging

Send all logs to a central Syslog server:

```ini
[Main]
Enabled=1
LogToSyslog=1
LogToFile=0

[Syslog]
ServerName=logserver.company.local
ServerPort=514
Severity=slInformational
```

## Troubleshooting

**Logs not appearing:**
- Verify `Enabled=1` in the `[Main]` section
- Check that at least one output destination is enabled
- Ensure the log folder exists and has write permissions

**Log files growing too large:**
- Reduce `LogFileMaxSizeInMB` value
- Increase `MaxBackupFilesCount` to keep more history
- Consider using Syslog for long-term storage

**Email notifications not working:**
- Verify SMTP server settings and credentials
- Check that `MinLogLevel` matches your expected severity
- Ensure the password file exists and is readable
