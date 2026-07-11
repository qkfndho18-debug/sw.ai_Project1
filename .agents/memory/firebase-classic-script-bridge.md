---
name: Firebase in classic-script apps
description: How to add Firebase Firestore to a plain HTML/CSS/JS app without breaking inline onclick handlers
---

When a static site's main script (`app.js`) is loaded as a classic (non-module)
script and HTML uses inline `onclick="fn()"` handlers, do not convert that
script to `type="module"` just to import Firebase — module-scope functions are
not auto-global, so every inline handler in the HTML would break.

**Approach:** put the Firebase SDK import + init + all CRUD functions in a
separate file (e.g. `firebase.js`) loaded as `<script type="module" src="firebase.js">`
*before* the classic `app.js` tag. At the end of that module, attach the CRUD
functions to `window.FirebaseDB = { ... }`. The classic script then calls
`window.FirebaseDB.getStudent(...)` etc.

**Why:** module scripts execute deferred but still run before classic scripts'
user-triggered handlers fire (classic script only *defines* functions at top
level, doesn't call Firestore immediately), so `window.FirebaseDB` is always
ready by the time a user interaction needs it. No import bundler needed either
— use the Firebase JS SDK v10 modular CDN URLs directly in the module.

**How to apply:** any vanilla-JS site (no build step) that needs a
Firestore/Firebase backend while keeping inline HTML event handlers.
