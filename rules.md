# Rules for Banner Automation

## 1. Purpose
This process exists to take a new banner that the agency leaves in the input folder, publish it to the website, record exactly what happened, and keep the operational history minimal but auditable.

## 2. Single Sources of Truth
There is one source of truth for each operational item:

- **One input folder**: `inbox-banner`
- **One active published banner**: `assets/img/ppal/assistcard-auto.jpg`
- **One visible operational log**: `banner-proceso.txt`
- **One visible archive**: `banner-inbox/` with a maximum of 5 files
- **One automation process**: the loop that executes `scripts/banner_process_once.sh`

No duplicates, mirrors, hidden folders, or alternate paths are allowed for the same responsibility.

## 3. Input Folder
The agency only drops files in:

`/Users/oscar/Library/CloudStorage/GoogleDrive-it.integral.solution@gmail.com/Mi unidad/entornos/Promos con Magui a Disney/inbox-banner`

### Input rules
- The agency may use any filename.
- The process always takes the newest file.
- The agency does not need to rename anything.
- The agency does not need to do anything else.
- After processing, the original file is deleted from `inbox-banner` to avoid buildup.

## 4. What the Process Does
When it detects a new file:

1. Identifies the newest file in `inbox-banner`.
2. Writes a `START` entry to the log.
3. Converts to JPEG if needed for consistent publishing.
4. Overwrites the active banner at:
   `assets/img/ppal/assistcard-auto.jpg`
5. Stores a timestamped historical copy in:
   `banner-inbox/`
6. Keeps only the latest 5 files in `banner-inbox/`.
7. Runs `git add` for the required changes.
8. Runs `git commit`.
9. Runs `git push origin main`.
10. Deletes the source file from `inbox-banner`.
11. Writes an `OK` entry to the log.

## 5. What the Process Does Not Do
The process must not:

- write to multiple logs
- use hidden inbox folders such as `.banner-inbox`
- use `procesados`
- use `banner-history`
- leave permanent temp files inside the input folder
- depend on manual intervention to publish
- require the agency to copy files to another path

## 6. Active Banner
There must always be one active banner for this campaign:

`assets/img/ppal/assistcard-auto.jpg`

That file is the one used by the site to display the current banner.

## 7. Visible Archive
The visible archive lives only in:

`banner-inbox/`

### Archive rules
- Store timestamped copies.
- Keep at most 5 files.
- When a new file arrives, remove the oldest if the limit is exceeded.
- The archive is for operational audit only, not for publication.

## 8. Operational Log
The only visible operational log for business and support is:

`/Users/oscar/Library/CloudStorage/GoogleDrive-it.integral.solution@gmail.com/Mi unidad/entornos/Promos con Magui a Disney/banner-proceso.txt`

### Log format
The log is written **top-down**:
- the newest entry is always on top
- nobody needs to scroll to the bottom to see the latest state

### Expected line types
- `START`: the process detected a file and began work
- `OK`: the process completed successfully
- `ERROR`: the process failed on a specific step

### What each line must show
- date and time
- processed filename
- source
- published destination
- generated backup
- final result

## 9. Automation Loop
The automation runs in a loop.

### Execution rule
- The loop executes `scripts/banner_process_once.sh` every 60 seconds.
- The loop must remain active while the Mac is on and the user session is active.
- If the Mac sleeps, powers off, or the session closes, the loop stops.
- When the Mac wakes or the session starts again, the loop must be re-enabled if it did not remain active.

## 10. Repeated Files
If the agency leaves the same file or a visually similar file:
- the process still takes it if it is the newest file
- the technical process does not judge content
- the process publishes the latest incoming item and records it
- whether the content was correct is an operational review, not an automation decision

## 11. Technical Responsibility
The automation is only responsible for:
- taking the file from `inbox-banner`
- publishing the active banner
- storing the archive
- deleting the input file
- committing and pushing
- leaving evidence in the log

It does not decide whether the campaign is correct or incorrect. It only executes, records, and publishes.

## 12. Success Criteria
The process is only correct if all of these are true:
- the new banner appears on the website
- the source file disappears from `inbox-banner`
- a historical copy exists in `banner-inbox/`
- a new `OK` line appears at the top of `banner-proceso.txt`
- the commit and push were completed

## 13. Failure Criteria
The process is failed if:
- the new banner was not published
- the file remains in `inbox-banner`
- no new `OK` line appears in the log
- an `ERROR` line appears
- the commit or push did not run

## 14. Maintenance Rule
Before changing the process, review this file.
If anything does not match these rules, the priority is to correct the process back to these rules, not to create another parallel circuit.
