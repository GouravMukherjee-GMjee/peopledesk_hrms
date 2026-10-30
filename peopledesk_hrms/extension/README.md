# PeopleDesk Attendance (browser extension)

Shows an employee's **clock-in time, expected logout and time left** in the browser toolbar, without opening PeopleDesk.
It shows attendance only. It cannot see tabs, history or any other site.

Effective setting = **the admin's role policy allows it** AND **the person has opted in** (Settings, Browser extension
and Profile, Preferences in the app).

## Load it for testing

1. `node scripts/build-extension.js` (copies the shared logic and styles from the app and draws the icons)
2. Chrome or Edge: open `chrome://extensions`, turn on Developer mode, **Load unpacked**, choose this `extension/` folder
3. Serve the app over http, for example `npx serve .` in the project root, and open it on `http://localhost:<port>`
4. Sign in, then Profile, Preferences, **Set up the extension**. Step 2 connects it.

The content script runs only where `matches` in `manifest.json` says. It lists `*.vercel.app` and localhost. **Change it to your
real PeopleDesk address before publishing.** `file://` pages are not supported.

## How it works

| Part | File | Job |
| --- | --- | --- |
| Bridge | `content/bridge.js` | Relays four messages (`ping`, `connect`, `snapshot`, `signout`) between the PeopleDesk page and the extension. Reads nothing from the page. |
| Service worker | `background.js` | Stores today's attendance, repaints the badge and tooltip **once a minute** (alarm), shows reminders once each per day. |
| Popup | `popup/` | 360 x 480. Asks the worker for the data and draws it. Redraws on the minute. |
| Shared | `shared/ext-core.js` | State model, badge text, popup markup, notification rules. Same file the app and the design page use. |

The page sends a **snapshot**: clock-in, clock-out, expected logout, source (app, biometric, web), and which fields and
reminders the person is allowed and has chosen. The extension counts down by itself, so the badge keeps moving when
PeopleDesk is closed. A snapshot is accepted only from the origin that was connected, and every field is re-validated.

## Permissions

`storage`, `alarms`, `notifications`. No host permissions, no `tabs`, no `history`.

## Going to production

The demo gets punches from the open PeopleDesk tab. In production a clock-out on a biometric device never reaches an
open tab, so poll the server instead: add your API host to `host_permissions`, fetch today's attendance with the user's
token from the service worker on each alarm, run it through `clean()` and store it. On failure set `snap.offline = true`
and the popup shows "Last updated hh:mm" by itself.
