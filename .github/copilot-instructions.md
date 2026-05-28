# AI Assistant Guidelines for This Project

## Stack
- Plain HTML5, vanilla JavaScript (ES2020+), Tailwind CSS via CDN
- No bundler, no npm, no frameworks
- Persistence: localStorage
- Runs entirely in the browser

## Code Standards
- Write CLEAN, READABLE code with clear function and variable names
- Keep functions short (max ~30 lines), single responsibility
- Comment only where logic isn't self-explanatory, in English
- Use const/let, arrow functions, template literals, destructuring
- Prefer Tailwind utility classes over inline styles
- No magic strings — use named constants
- Use semantic HTML with proper accessibility attributes

## What NOT to Do
- Don't add libraries via npm or CDN without explicit request
- Don't introduce TypeScript, React, or other frameworks
- Don't add a backend, database, or API (Task 4 is an exception — BYOK pattern)
- Don't over-engineer — simplicity wins over flexibility

## File Structure
- `index.html` — page structure, Tailwind CDN in `<head>`, script at end of `<body>`
- `app.js` — all logic; if it grows, split into ES modules
- localStorage keys: always via a named constant, prefix `"scrumPoker:"` (e.g. `"scrumPoker:nickname"`)

## Working Pattern
- Keep state in a single `state` object
- Separate DOM updates from business logic
- Render functions read state, never compute it
- Event handlers update state, then call `render()`
