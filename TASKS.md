
# Workshop Tasks

## Overview

Each task builds on the previous one. Read `_NEXT.md` at the start of each task — it describes the current state of the app and exactly what to build next.

All tasks use the same pattern: update `state`, call `saveState()`, call `render()`.

---

## Task 1 — Add & Display TODOs (~1.5h)

### What you'll build

- Implement `addTodo(text)` — creates a todo object and pushes it to `state.todos`
- Implement `loadState()` — reads todos from `chrome.storage.local` on startup
- Implement `saveState()` — writes `state.todos` to `chrome.storage.local` after every change
- Implement `renderList()` — generates an `<li>` per todo and injects it into `#todo-list`
- Wire up the form submit and Enter key in `initHandlers()`

### Todo object shape

```js
{ id: Date.now(), text: 'Buy milk', done: false, createdAt: new Date().toISOString(), priority: null }
```

### AI-assisted coding focus

**Prompt precision.** The main learning point is how much the quality of Copilot's output depends on prompt specificity.

Try both:
- Vague: *"save the todos"*
- Precise: *"implement loadState() using chrome.storage.local.get with STORAGE_KEY, populate state.todos in the callback, then call render()"*

Compare the results. The precise prompt tells Copilot which API to use, which constant to reference, and what the callback should do — it produces usable code on the first attempt.

### Key concepts

- `chrome.storage.local` is async (callback-based) — unlike `localStorage` which is synchronous
- The popup closes every time the user clicks away. State must be loaded from storage on every open — memory alone is not enough.
- Update `.github/copilot-instructions.md` to describe this project's stack so Copilot has context across all files.

### Self-check

- [ ] Type a task and click Add — it appears in the list
- [ ] Close and reopen the popup — the task is still there
- [ ] Add 3 tasks — all three appear in order
- [ ] Empty input → Add does nothing

---

## Task 2 — Complete & Delete (~1.5h)

### What you'll build

- Implement `toggleTodo(id)` — flips `todo.done`, saves, renders
- Implement `deleteTodo(id)` — removes the todo from `state.todos`, saves, renders
- Implement `renderEmptyState()` — shows `#empty-state` when the list is empty
- Complete `renderList()` — done items get a `done` CSS class (strikethrough + muted colour); each item has a working checkbox and delete button
- Use **event delegation** in `initHandlers()` for checkbox and delete button clicks

### AI-assisted coding focus

**Reviewing AI output against conventions.** Ask Copilot to generate the full `renderList()` function. Then check:

- Does it use template literals (as the project convention requires)?
- Does it reference the correct CSS class names from `popup.html`?
- Does it use `id`-based lookup to find the right todo, or does it use fragile index-based logic?

Iterate until the output matches project conventions — don't accept the first suggestion blindly.

### Key concepts

- Event delegation: attach one listener to `#todo-list`, check `event.target` to find the clicked checkbox or button. Attaching listeners inside `renderList()` would add duplicates on every render.
- Provide the existing `popup.js` snippet as context in Copilot Chat — the generated code should fit the existing `state` shape and call `saveState()` + `render()`.

### Self-check

- [ ] Click a checkbox — task gets strikethrough styling
- [ ] Click again — strikethrough removed
- [ ] Click delete — task disappears immediately
- [ ] Delete all tasks — empty state is shown
- [ ] Reload popup — completed state is preserved

---

## Task 3 — Filter Bar: All / Active / Done (~1.5h)

### What you'll build

- Implement `getVisibleTodos()` — returns `state.todos` filtered by `state.filter`
- Implement `setFilter(filter)` — updates `state.filter`, calls `render()`
- Implement `renderFilterBar()` — highlights the active filter button with the `active` CSS class
- Implement `renderStats()` — updates `#stats` with the count of active (not done) todos
- Update `renderList()` to call `getVisibleTodos()` instead of `state.todos` directly
- Wire filter button clicks in `initHandlers()`

### AI-assisted coding focus

**Refactoring existing code with Copilot.** `renderList()` already works — now ask Copilot to update it to use `getVisibleTodos()`.

Workflow:
1. Paste the current `renderList()` into Copilot Chat
2. Ask: *"Refactor this to call getVisibleTodos() instead of state.todos. getVisibleTodos() filters state.todos by state.filter ('all' | 'active' | 'done'). Don't change any other behaviour."*
3. Apply the change, then test: filter to Active, delete a task, switch to All — verify counts are correct

Verify that the AI refactor didn't introduce a regression (e.g. deleting while a filter is active must still use `id`-based lookup).

### Key concepts

- **Derived state:** `getVisibleTodos()` is a view of `state.todos`, not a separate copy. Never mutate the filtered result — always mutate `state.todos` and re-derive.
- The filter choice is not persisted to storage — it resets to `'all'` on popup reopen. That's intentional.

### Self-check

- [ ] All / Active / Done buttons filter the list correctly
- [ ] Active count in stats updates as you complete tasks
- [ ] Adding a task while on the Active filter shows it immediately
- [ ] Deleting while on Done filter doesn't affect Active tasks

---

## Task 4 — Reorder: Move Up / Down (~2h)

### What you'll build

- Add move-up and move-down buttons to each todo item in `renderList()`
- Implement `moveTodo(id, direction)` — swaps the todo with its neighbour in `state.todos`, saves, renders
- Disable move-up on the first item and move-down on the last
- Keyboard shortcut: `Alt+ArrowUp` / `Alt+ArrowDown` on a focused todo item triggers the same move logic
- **Bonus (fast finishers):** HTML5 drag-and-drop reorder using `dragstart`, `dragover`, `drop` events

### AI-assisted coding focus

**AI as a design advisor.** Before writing any code, open Copilot Chat and ask:

*"What are three different ways to implement drag-and-drop or manual reordering in a vanilla JS list? Compare them by complexity, browser support, and lines of code."*

Read the three options, pick the one that fits the project's no-library constraint, then ask for the implementation. This is the shift from using AI to write code → using AI to think through design.

The drag-and-drop bonus deliberately produces verbose code (drag events have many edge cases). Practise trimming the generated code down to only what's needed — no unused event handlers, no defensive checks for impossible states.

### Key concepts

- Array swap: `[a[i], a[j]] = [a[j], a[i]]` — use this pattern, not splice+splice
- Reorder applies to `state.todos` (the source of truth), so it works correctly regardless of which filter is active
- The move buttons should be hidden when a filter is active (filtered view doesn't reflect array order clearly)

### Self-check

- [ ] Move up / down buttons reorder tasks visually
- [ ] Order persists after popup close/reopen
- [ ] First item has no move-up, last item has no move-down
- [ ] `Alt+ArrowUp` / `Alt+ArrowDown` work on a focused item

---

## Task 5 — AI Feature: Suggest Priority (~2h)

### What you'll build

In `options.js`:
- Implement `loadApiKey()` — reads from `chrome.storage.local`, populates `#api-key-input`
- Implement `saveApiKey(key)` — writes to `chrome.storage.local`, shows "API key saved ✓" in `#save-status` for 2 seconds

In `popup.js`:
- Add a **"✦ Priority"** button to each active todo item in `renderList()`
- Implement `suggestPriority(id)`:
  1. Read the API key from `chrome.storage.local`
  2. If missing → alert the user to open Settings (⚙ in the footer)
  3. Set `state.aiLoading = true`, call `render()` (button shows spinner)
  4. `POST https://api.anthropic.com/v1/messages` with the todo text
  5. Parse the response → call `setPriority(id, priority)`, save, render
  6. `state.aiLoading = false`, call `render()`
- Handle errors: network failure, missing key, malformed JSON response

### Prompt engineering

The system prompt must force Claude to return parseable JSON only:

```
You are a task prioritisation assistant. 
Respond with ONLY valid JSON: {"priority": "high" | "medium" | "low"}
No explanation, no markdown, no other text.
```

Iterate on this prompt until Claude never adds extra text. Try intentionally vague todo texts ("thing", "meeting") and verify the output is still valid JSON.

### API request shape

```js
{
  method: 'POST',
  headers: {
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01',
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 64,
    system: '<system prompt above>',
    messages: [{ role: 'user', content: `Prioritise this task: "${todoText}"` }],
  }),
}
```

### AI-assisted coding focus

**Prompt engineering inside code.** The fetch call is straightforward — Copilot can generate it from a single prompt. The real challenge is the system prompt string: it must be precise enough that Claude never returns anything except valid JSON.

Discussion point before Task 5 starts (5 min):
- The API key lives in `chrome.storage.local` — readable by any extension with `storage` permission
- In production, the key would be in a backend env variable and the frontend would call your own proxy
- The BYOK pattern is intentionally insecure here — the insecurity is the lesson
- The `host_permissions` entry in `manifest.json` is what allows `fetch` to `api.anthropic.com` — Manifest V3 CSP blocks external fetches without it

### Self-check

- [ ] Open Settings (⚙), enter API key, click Save — "saved ✓" appears
- [ ] Click "✦ Priority" on a todo — spinner appears, then a coloured badge (High / Medium / Low)
- [ ] Badge persists after popup close/reopen
- [ ] No API key → helpful error message, not a crash
- [ ] Network error → error message shown, spinner disappears

---

## Capstone (~30 min)

Demo your extension to the group. Show one AI interaction that worked particularly well — share the prompt in `PROMPTS.md` so everyone can learn from it.
