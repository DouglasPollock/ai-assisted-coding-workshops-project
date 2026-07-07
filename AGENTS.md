# AGENTS.md

## Purpose

This repository is a workshop template for building a Chrome extension to-do app in incremental tasks. Most core JavaScript logic is intentionally left as stubs so learners can implement features with AI assistance.

Use this file to get oriented quickly before editing.

Always keep AGENTS.md up to date, especially when adding structural, dependency, or convention changes. Additionally, ensure that other relevant .md files (including, but not limited to, README.md and SKILL.md files) are kept up to date when major changes are made.

If any .md file is deemed to be out of date, for example due to changes made by a human user without agent assistance, edit the file to bring it back in line with the current state of the application.

## Tech Snapshot

- Stack: plain HTML, vanilla JavaScript, plain CSS
- Runtime target: Chrome extension style app (no build step)
- Package manager: none
- Bundler: none
- Persistence requirement: `chrome.storage.local` (not `localStorage`)

## Current Workspace Reality

The current workspace contains:

- `index.html`
- `options.html`
- `popup.js`
- `options.js`
- `styles.css`
- `README.md`
- `.github/copilot-instructions.md`
- `.github/agents/backlog-assistant/*`

Important mismatch to note:

- `README.md` and `.github/copilot-instructions.md` reference `popup.html` and `manifest.json`, but this workspace snapshot uses `index.html` and has no `manifest.json` file.

Treat actual files in the workspace as source of truth when implementing changes.

## File Map And Responsibilities

- `index.html`
  - Main task UI markup.
  - Loads `styles.css` and `popup.js`.
  - Contains add form, filter bar, stats, task list, empty state, and settings link.

- `popup.js`
  - Main application logic.
  - Defines `STORAGE_KEY` as `kainos-todo:todos`.
  - Holds app state in a single `state` object.
  - Contains stubbed functions for persistence and todo business logic.
  - Boot order: `loadState()` then `initHandlers()`.

- `options.html`
  - Settings page markup for API key entry.
  - Loads `styles.css` and `options.js`.

- `options.js`
  - Settings logic stubs.
  - Defines `API_KEY_STORAGE_KEY` as `kainos-todo:apiKey`.
  - Submit handler exists but persistence behavior is not implemented.

- `styles.css`
  - Shared styles for both main page and settings page.
  - Includes UI states for todos, filters, badges, and AI button/spinner styles.

## Implementation Status

This is mostly template code. In `popup.js`, the following are currently stubs and expected to be implemented during workshop tasks:

- `saveState`
- `addTodo`
- `toggleTodo`
- `deleteTodo`
- `setFilter`
- `setPriority`
- `renderFilterBar`
- `initHandlers` (only options-link wiring exists)
- `suggestPriority`

In `options.js`, these are stubs:

- `loadApiKey`
- `saveApiKey`
- The body of settings form submission handling

## Guardrails For Future Agents

- Do not introduce frameworks, TypeScript, or build tooling unless explicitly requested.
- Keep code simple, readable, and split by responsibility.
- Prefer short functions and named constants for storage keys.
- Keep the state/update/render pattern:
  - Event handlers mutate state.
  - Business functions update state and persistence.
  - Render functions read state and update DOM.
- Prefer event delegation on `#todo-list` instead of attaching listeners inside render functions.
- When persisting data, use `chrome.storage.local` consistently.
- Preserve existing CSS and HTML structure unless task requirements call for UI changes.

## Practical Workflow

1. Read requested task and identify which stubbed functions it should complete.
2. Update state logic in `popup.js` first, then wire events in `initHandlers`.
3. Ensure each state-changing action calls persistence and then `render()`.
4. Keep filters and stats coherent after every action.
5. If touching settings, implement `options.js` save/load behavior with status feedback.
6. Manually sanity check in browser after edits (add, toggle, delete, filter, reload persistence).

## Fast Start Checklist For Any Agent

- Read `.github/copilot-instructions.md` first.
- Read `popup.js` and identify unfinished stubs.
- Read `options.js` for API-key storage stubs.
- Confirm page wiring in `index.html` and `options.html`.
- Make minimal, task-scoped edits only.
