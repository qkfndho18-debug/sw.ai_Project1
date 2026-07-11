---
name: StudyBloom repo layout
description: Root vs python-cli/ split and why, for the StudyBloom project
---

StudyBloom's deployed web app (`index.html`, `style.css`, `app.js`,
`firebase.js`) lives at the repo root and is a pure static site (no Flask, no
server logic) meant for GitHub Pages, with Firebase Firestore as the data
backend (see firebase-classic-script-bridge.md).

A separate, unrelated Python OOP CLI implementation of the same app concept
(`main.py`, `student.py`, `analyzer.py`, etc. + its own `data/` folder) was
moved into `python-cli/` to keep the deployment root clean. It was never used
by the web app and has no import/runtime dependency on anything at root.

**Why:** the user asked to convert the project to a pure static site deployable
on GitHub Pages; the Python files were dead weight relative to that goal but
not something the user asked to delete, so isolating them in a subfolder was
the safe middle ground.

**How to apply:** if asked to touch "the app" in this repo, that means the
root-level static files; python-cli/ is legacy/reference only unless the user
says otherwise.
