# Prompt Library — Trainer Reference

> **For trainers only.** These prompts produce working code when pasted into Copilot Chat with the relevant file open. Participants do not receive this file — they write their own prompts as part of the exercise.

---

## Task 1 — Add Tasks & Save Them

### `loadState()`

> In `popup.js`, implement `loadState()`. Use `chrome.storage.local.get` with `STORAGE_KEY` as the key. In the callback, assign the retrieved value to `state.todos` — if nothing is stored yet, default to an empty array `[]`. After setting `state.todos`, call `render()`. Also replace the hardcoded todos array in the `state` object declaration with `todos: []`.

### `saveState()`

> In `popup.js`, implement `saveState()`. Call `chrome.storage.local.set` with an object where the key is `STORAGE_KEY` and the value is `state.todos`.

### `addTodo(text)`

> In `popup.js`, implement `addTodo(text)`. If `text.trim()` is an empty string, return early without doing anything. Otherwise push a new object to `state.todos` with these exact fields: `id: Date.now()`, `text: text.trim()`, `done: false`, `createdAt: new Date().toISOString()`, `dueDate: null`. Then call `saveState()` and `render()`.

### Wire form submit in `initHandlers()`

> In `popup.js`, inside `initHandlers()`, wire up the `#add-form` submit event. On submit: call `event.preventDefault()`, read the value from `#todo-input`, call `addTodo(text)` with that value, then clear the input by setting its `.value` to an empty string. Finally, set focus back to `#todo-input`.

---

## Task 2 — Mark Done & Delete

### `toggleTodo(id)`

> In `popup.js`, implement `toggleTodo(id)`. Find the todo in `state.todos` where `todo.id === id`. Flip its `done` property: `true` becomes `false`, `false` becomes `true`. Then call `saveState()` and `render()`.

### `deleteTodo(id)`

> In `popup.js`, implement `deleteTodo(id)`. Reassign `state.todos` to a new array that excludes the todo where `todo.id === id` — use `Array.filter()`. Then call `saveState()` and `render()`.

### Event delegation in `initHandlers()`

> In `popup.js`, inside `initHandlers()`, add a single `click` event listener on the element with id `todo-list`. In the handler: use `event.target.closest('.todo-item')` to find the parent item — if no item is found, return early. Parse the item's `data-id` attribute as a number using `Number(item.dataset.id)`. If `event.target.classList.contains('todo-checkbox')`, call `toggleTodo(id)`. If `event.target.classList.contains('btn-delete')`, call `deleteTodo(id)`.

---

## Task 3 — Filter & Count

### `getVisibleTodos()`

> In `popup.js`, implement `getVisibleTodos()`. Check `state.filter`: if `'active'`, return `state.todos` filtered to items where `done` is `false`; if `'done'`, return items where `done` is `true`; otherwise (`'all'`), return all of `state.todos`.

### `setFilter(filter)`

> In `popup.js`, implement `setFilter(filter)`. Set `state.filter` to the given value, then call `render()`.

### `renderFilterBar()`

> In `popup.js`, implement `renderFilterBar()`. Select all elements with class `filter-btn` using `document.querySelectorAll('.filter-btn')`. For each button, remove the `active` CSS class. Then add `active` only to the button whose `data-filter` attribute equals `state.filter`.

### Wire filter buttons in `initHandlers()`

> In `popup.js`, inside `initHandlers()`, add a click event listener to each element with class `filter-btn`. On each click, call `setFilter()` with the clicked button's `data-filter` attribute value.

---

## Task 4 — Due Dates & Urgency

### `getDueStatus(todo)`

> In `popup.js`, implement `getDueStatus(todo)`. If `todo.dueDate` is `null` or an empty string, return `'none'`. Get today's date as an ISO date string using `new Date().toISOString().slice(0, 10)`. Compare `todo.dueDate` to today: if it is strictly before today, return `'overdue'`; if it equals today, return `'today'`; if it is after today, return `'upcoming'`.

### `sortByDueDate(todos)`

> In `popup.js`, implement `sortByDueDate(todos)`. Return a sorted copy — do not mutate the original array, start with `.slice()`. Use `getDueStatus(todo)` to classify each item. Assign sort weights: `overdue` → 0, `today` → 1, `upcoming` → 2, `none` → 3. Sort by weight ascending. Within the `overdue` and `upcoming` groups, apply a secondary sort by `todo.dueDate` string ascending — ISO date strings compare correctly as strings.

### Update `renderList()` for due date badges

> In `popup.js`, update `renderList()`. Change `const visible = getVisibleTodos()` to `const visible = sortByDueDate(getVisibleTodos())`. Inside the template literal, add a due date badge between the `.todo-text` span and the `.btn-delete` button. Call `getDueStatus(todo)` to get the status string. If status is `'none'`, render an empty string. Otherwise render: `<span class="due-badge due-${status}">${status === 'overdue' ? 'Overdue' : status === 'today' ? 'Today' : todo.dueDate}</span>`.

### Extend `addTodo()` and form handler for date input

> In `popup.js`, update `addTodo(text)` to accept a second parameter `dueDate`. Change `dueDate: null` in the todo object to `dueDate: dueDate || null`. Then update the form submit handler in `initHandlers()`: also read the value from `#todo-date` and pass it as the second argument to `addTodo(text, dueDate)`. After submit, also clear `#todo-date` by setting its `.value` to an empty string.

---

## Task 5 — AI Priority Suggestions *(bonus)*

### `setPriority(id, priority)`

> In `popup.js`, implement `setPriority(id, priority)`. Find the todo in `state.todos` where `todo.id === id`. Set its `priority` field to the given value. Then call `saveState()` and `render()`.

### `suggestPriority(id)` — OpenRouter

> In `popup.js`, implement the async function `suggestPriority(id)`. First find the todo by id — return early if not found. Read the API key from `chrome.storage.local` using `API_KEY_STORAGE_KEY`. If no key is stored, call `alert()` telling the user to open Settings and return. Set `state.aiLoading` to the todo's id and call `render()`. Then POST to `OPENROUTER_URL` with headers `Content-Type: application/json` and `Authorization: Bearer <apiKey>`. The request body must be JSON with `model: AI_MODEL`, `max_tokens: 64`, and a single user message asking to rate the priority of the todo text — instruct the model to respond ONLY with valid JSON `{"priority":"high"|"medium"|"low"}`. On success, parse `data.choices[0].message.content` — use a regex to extract the JSON object in case the model adds extra text. If the parsed priority is one of `high`, `medium`, `low`, call `setPriority(id, priority)`. On any error, log it and show an alert. In a `finally` block, set `state.aiLoading` to `false` and call `render()`.

### Add AI button in `renderList()`

> In `popup.js`, inside the `renderList()` template literal, add a `<button class="btn-ai">` between the priority badge and the delete button. The button should be `disabled` when `state.aiLoading === todo.id`. When loading that specific todo, render `<span class="ai-spinner"></span>` as its content; otherwise render the text `AI`.

### `loadApiKey()` and `saveApiKey()` in `options.js`

> In `options.js`, implement `loadApiKey()`. Call `chrome.storage.local.get` with `API_KEY_STORAGE_KEY`. In the callback, set the value of `#api-key-input` to the retrieved key, defaulting to an empty string. Then implement `saveApiKey(key)`. Call `chrome.storage.local.set` with an object keyed by `API_KEY_STORAGE_KEY`. In the callback, set the text of `#save-status` to `'API key saved ✓'` and clear it after 2 seconds using `setTimeout`. Finally, in the form submit listener, call `saveApiKey(key)` with the trimmed input value.

---

## Participant contributions

*Participants add their best prompts here during the Capstone.*

