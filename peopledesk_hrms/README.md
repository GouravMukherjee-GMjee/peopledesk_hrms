# PeopleDesk HRMS

A static, dependency-free web app (HTML, CSS and plain JavaScript). Open `index.html` in a browser to run it.
Data is sample data kept in the browser; sign-in, payments and the assistant are simulated.

## Project structure

```
index.html                 entry point and the single source of truth for load order
scripts/build.js           bundles css + js (in index.html order) into dist/   ->  npm run build
css/
  base/                    tokens (colours, spacing, dark theme variables), reset, scrollbars, a11y
  layout/                  sidebar, top bar, page frame, bottom nav, breadcrumbs, sticky header/footer
  components/              buttons, chips, cards, KPI, tables, tabs, forms, dropdowns, overlays, account modal
  pages/                   login, home screens, profile, attendance detail, dashboard layout, security steps
  themes/                  elevation and motion, design-system pass, dark-theme layers
  features/                assistant.css (Ask PeopleDesk)
js/
  core/                    helpers, sample data, page registry, saved data, shared logic, boot
  components/              overlay/modals/toasts, dropdowns, table controls, form guards, detail panels
  layout/                  app shell (chrome, command palette, render), search
  roles/                   personas, reporting lines, access model (role x action x scope), role navigation
  services/                audit log, policies, work calendar, saved state, enforcement, files (PDF/CSV)
  features/<name>/         one folder per area: dashboard, employees, attendance, leave, payroll, approvals,
                           recruitment, performance, roster, safety, training, requests, reports, settings,
                           org, audit, lifecycle (joiners and leavers), assets, profile, help, auth, assistant, ext
extension/                 the browser extension (Manifest V3): badge, popup, reminders. See extension/README.md
docs/                      browser-extension-design.html and hours-overtime-design.html: flow, components, every state, accessibility, rationale
```

## Roles

Five roles (Employee, Manager, HR, Admin, System Admin). Access is data, not code:

- `js/roles/personas.js`: the roles and the people used for the preview switcher
- `js/roles/access-model.js`: what each role can do (view, create, edit, approve, export) and for whom (scope), plus field-level access
- `js/roles/navigation.js`: the sidebar groups per role, filtered by what the person may open

## Load order matters

These are classic scripts that share one global scope, and several files wrap functions defined earlier
(for example `render = function () { ... }`). Files must load in the order listed in `index.html`.
CSS is the same: later files intentionally override earlier ones.

When adding code:

1. Put a new screen in `js/features/<name>/` and its styles in `css/pages/` or `css/components/`.
2. Add the `<script>` / `<link>` to `index.html` after the files it depends on.
3. A statement that runs at load time (a wrapper such as `const _x = fn; fn = ...`, or `onclick = fn`) must come
   **after** the file that declares `fn`. Calls inside function bodies are fine in any order.
4. Prefer extending the access model and navigation data over adding role checks inside screens.

## Browser extension widget

Shows clock-in time, expected logout and time left in the browser toolbar. The admin sets it per role
(Settings, Browser extension); each person opts in (Profile, Preferences). The shared logic lives in
`js/services/ext-core.js` and the popup styles in `css/components/ext-popup.css`; `npm run build:ext` copies both into
`extension/`. Open `docs/browser-extension-design.html` for the design spec.

## Hours, overtime and comp-off

Time > Hours & overtime shows worked hours, overtime, the extra-time ledger, holiday and weekly-off work, requests and (for
managers) the approvals queue. The rules are editable in Settings > Overtime and comp-off. The model is
`js/services/hours.js` (one entry per day with extra time, built from the same punches as Attendance), the screens are in
`js/features/hours/` and `js/features/settings/ot-policy.js`. Open `docs/hours-overtime-design.html` for the design spec.

## Formatting

Code style is enforced by Prettier (config in `.prettierrc.json`: single quotes in JS, double quotes in CSS, 100 columns).

```
npm install        # once, installs Prettier
npm run format     # format js/ and css/
npm run format:check
```

Use Prettier 3.4 or newer: version 3.3 has a bug that drops array items inside `${...}` template expressions,
which this codebase uses heavily.

## Build

`npm run build:ext` prepares the extension folder (shared files and icons).

`npm run build` (or `node scripts/build.js`) writes `dist/index.html`, `dist/app.css` and `dist/app.js`
for deployment as three files. Building needs no dependencies; only formatting needs Prettier (`npm install`).
