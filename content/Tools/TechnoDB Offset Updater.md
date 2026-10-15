---
title: TechnoDB Offset Updater
draft: false
tags:
  - tools
  - configuration
  - database
---

# TechnoDB Offset Updater

> [!warning] "Fanuc only"
>    This version supports Fanuc-styled `TechnoDB.ini` files only. Do not point it at a
>    technology database from another control.

A command line tool that shifts every `Offset###` value in a `TechnoDB.ini` by one signed
amount. A typical database holds 29 technologies and 87 offset values, so a wire change that
needs 0.005 taken off every offset is 87 manual edits in a file the control reads directly.

The tool shows what it will change before changing anything, refuses to write values the
control cannot use, and keeps a timestamped backup.

## Usage

The first argument is the file, the second is the amount to add. Use a dot as the decimal
separator. A negative value shrinks the offsets, a positive value grows them.

```
technodb-offsets TechnoDB.ini -0.005
```

That shifts all 87 offsets down by 0.005. `Offset001=0.115` becomes `Offset001=0.110`.

Running the tool with no arguments prints a set of worked examples, so double-clicking
`technodb-offsets.exe` is a safe way to remind yourself of the syntax.

## Choosing which technologies to change

Three filters narrow the selection. Leaving a filter out means "all of them".

### By name

`-t` takes a technology name. The `TN__` prefix is optional and case does not matter, so all
four of these select the same technology:

```
-t "PCD BLANK PCD FINE"
-t "TN__PCD BLANK PCD FINE"
-t "pcd blank pcd fine"
-t "tn__PCD Blank PCD Fine"
```

Add `*` to select a group. Quotes are required because the names contain spaces.

```
technodb-offsets TechnoDB.ini -0.005 -t "PCD BLANK*"
```

Repeat `-t` to pick several, and use `-x` to subtract from the selection:

```
technodb-offsets TechnoDB.ini -0.005 -t "PCD*" -x "PCD BLANK*"
```

### By wire diameter

`-w` matches the `Drahtbezeich` field, which holds the wire the technology is dimensioned
for. This is the filter to reach for after changing wire type:

```
technodb-offsets TechnoDB.ini -0.005 -w 0.20
```

The comparison is numeric, so `-w 0.2` and `-w 0.20` both work.

### By cut number

`-c` restricts the change to one cut pass. `-c 1` touches `Offset001` only and leaves the
finish cuts alone:

```
technodb-offsets TechnoDB.ini -0.005 -w 0.20 -c 1
```

Filters combine, so the line above reads as "take 0.005 off the rough cut of every technology
running 0.20 wire".

## Looking before you leap

`--list` prints the technologies in the file with their wire, cut count and current offsets.
It accepts the same filters, so it doubles as a way to check a pattern before using it:

```
technodb-offsets TechnoDB.ini --list -t "PCD BLANK*"
```

```
+-------------------------------------------------+
| Technology              | Wire | Cuts | Offsets |
|-------------------------+------+------+---------|
| PCD BLANK PCD FINE      | 0.20 |    1 | 0.115   |
| PCD BLANK STD HIGHSPEED | 0.20 |    1 | 0.125   |
| PCD BLANK PCD NORMAL    | 0.20 |    1 | 0.117   |
| PCD BLANK PCD HIGHSPEED | 0.20 |    1 | 0.120   |
+-------------------------------------------------+
4 technologies - 4 offsets - wires: 0.20 (4)
```

`--dry-run` goes one step further: it computes every change and prints the full before/after
table without touching the file.

## What happens on a normal run

The tool prints the change table, then asks for confirmation:

```
+---------------------------------------------------------------+
| Technology              | Key       | Wire |   Old |   New |
|-------------------------+-----------+------+-------+-------|
| PCD BLANK PCD FINE      | Offset001 | 0.20 | 0.115 | 0.110 |
| PCD BLANK STD HIGHSPEED | Offset001 | 0.20 | 0.125 | 0.120 |
+---------------------------------------------------------------+
4 technologies - 4 offsets - lowest result 0.110

Apply these 4 changes? [y/N]
```

Answering anything other than `y` leaves the file alone. Pass `--yes` to skip the prompt when
calling the tool from a script.

## Backups

Before writing, the original is copied to a timestamped file beside it:

```
TechnoDB.ini
TechnoDB_bak_20260915_143022.ini
```

The copy is byte-for-byte, so restoring is a rename. Nothing is deleted or rotated
automatically; old backups accumulate until you clear them out.

> [!tip] "Working with several databases"
>    If you keep more than one technology database, [[SymlinkTechnoDB|Symlink TechnoDB]] lets
>    you switch between them. Run the offset update against the real file rather than the
>    symlink target where you can, so the backup lands next to the database it belongs to.

## When the tool refuses to write

An offset of zero or less is not usable, so a delta that would produce one stops the run:

```
X  Resulting offset must be greater than 0

   TN__PCD CTB002-ADICO HIGH/3CUTS     Offset003  0.101 -> 0.000
   TN__PCD CTB002-ADICO HIGH UP/3CUTS  Offset003  0.101 -> 0.000

   2 of 6 offsets would become zero or negative.
   The file was NOT modified. No backup was created.
```

Every offending technology is listed at once rather than one per run. Nothing is written and
no backup file is left behind, so the directory is exactly as you found it.

The usual fix is a smaller delta, or a filter that excludes the technologies already sitting
near the bottom of their range. Use `--list` to find them.

## What the tool leaves alone

The `[Techsequenz_0]`, `[Techsequenz_1]` and `[Drahtliste]` sections are copied through
untouched. Only `[TN__...]` sections hold offsets, and only the `Offset###` lines inside them
are ever modified.

Everything else in the file survives byte-for-byte: comments, blank lines, the order of keys,
the spacing around `=`, and the line endings. Within a technology, `TIndex`, `SRegister` and
`Optionen` are not touched.

> [!note] "Unusual characters in technology names"
>    Some databases contain technology names with stray bytes, picked up from an older editor
>    or a bad transfer. The tool preserves them exactly, but shows them as `?` on screen
>    because a Windows console cannot print them. A name that looks slightly wrong in the
>    table is still written back correctly.

## Rounding

Results keep the number of decimal places the original entry had. `0.115 - 0.005` is written
as `0.110`, with the trailing zero the format expects.

If the delta is finer than the values in the file, results are rounded to the file's
precision and the run says how many values that affected:

```
! 4 value(s) marked * were rounded to the precision of the original entry.
```

Values that were rounded are marked with `*` in the table, so you can check them before
confirming.

## Exit codes

For use in scripts:

| Code | Meaning |
|---|---|
| 0 | Success, or no technologies matched the filters |
| 1 | Validation failed; a result would be zero or negative |
| 2 | Usage or file error |
| 130 | Declined at the confirmation prompt |

A filter that matches nothing is not an error. The tool says so and exits 0 without writing
or creating a backup, so a mistyped pattern cannot do damage.

## Full argument list

| Argument | Description |
|---|---|
| `ini` | Path to the TechnoDB.ini file |
| `delta` | Signed value added to every matched offset. Not required with `--list` |
| `-t, --tech NAME` | Technology to process. Prefix optional, wildcards allowed. Repeatable |
| `-x, --exclude NAME` | Technology to skip. Same syntax as `--tech`. Repeatable |
| `-w, --wire DIAMETER` | Only technologies with this `Drahtbezeich`. Repeatable |
| `-c, --cut N` | Only cut number N. Repeatable |
| `-n, --dry-run` | Show the changes and write nothing |
| `-y, --yes` | Skip the confirmation prompt |
| `-l, --list` | List the technologies and exit |
| `--examples` | Show usage examples and exit |
| `--version` | Print the version |
| `-h, --help` | Show the full help |

## Version

0.1.0, released 2026-09-15.
