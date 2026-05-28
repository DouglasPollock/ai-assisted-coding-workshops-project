
# Workshop Tasks

## Overview

There are 4 tasks. Each one adds a new feature layer while practising a different AI-assisted coding technique with GitHub Copilot.

Read `NEXT.md` at the start of each task — it describes the current state of the app and what to build next.

---

## Task 1 — Add Tasks & Save Them (~1.5h)

### What to build

- Typing a task name and clicking **Add** (or pressing Enter) adds it to the list
- Tasks survive closing and reopening the popup — they must be persisted between sessions
- Adding an empty task does nothing
- When there are no tasks, a friendly empty state message is shown

### AI-assisted coding focus

Experiment with **prompt precision**. Try asking Copilot the same thing two ways:

- Vague: *"save the todos"*
- Specific: name the exact function, the storage mechanism, the constant to use, and what should happen in the callback

Compare the outputs. Notice how the level of detail determines whether the generated code works on the first attempt.

### Self-check

- [ ] Type a task and click Add — it appears in the list
- [ ] Close and reopen the popup — the task is still there
- [ ] Add 3 tasks — all three appear in order
- [ ] Empty input → Add does nothing
- [ ] No tasks → friendly empty state is shown

---

## Task 2 — Mark Done & Delete (~1.5h)

### What to build

- Clicking a checkbox marks a task as done with visual strikethrough
- Clicking the checkbox again un-marks it
- Each task has a delete button that removes it permanently
- When all tasks are deleted, the empty state message appears again

### AI-assisted coding focus

Generate the event-handling code with Copilot, then **review it critically**:

- Does it correctly identify which task was clicked — by unique ID, not by position in the list?
- Does it attach one listener to the whole list, or separate listeners to each item?
- Does it call the right functions to save and re-render after every change?

Iterate until you're satisfied. Don't accept the first suggestion blindly.

### Self-check

- [ ] Click a checkbox — task gets strikethrough
- [ ] Click again — strikethrough removed
- [ ] Click delete — task disappears immediately
- [ ] Delete all tasks — empty state is shown
- [ ] Reload popup — completed state is preserved

---

## Task 3 — Filter & Count (~1.5h)

### What to build

- Three filter buttons: **All** / **Active** / **Done** — each shows the relevant subset of tasks
- The currently active filter button is visually highlighted
- A counter shows how many active (not done) tasks remain

### AI-assisted coding focus

You already have a working `renderList()`. Ask Copilot to **refactor** it to respect the active filter — without breaking anything else.

After applying the change, test it thoroughly: switch filters while adding and deleting tasks and verify the counts stay correct. This is a good exercise in using Copilot for targeted refactoring rather than writing from scratch.

### Self-check

- [ ] All / Active / Done buttons filter the list correctly
- [ ] Active count updates as you complete tasks
- [ ] Adding a task while on Active filter shows it immediately
- [ ] Deleting while on Done filter doesn't affect Active tasks

---

## Task 4 — Due Dates & Urgency (~2h)

### What to build

- When adding a task, users can optionally pick a due date
- Tasks with a past due date get a red **Overdue** indicator
- Tasks due today get a yellow **Today** indicator
- Tasks due in the future show their date in a green indicator
- Tasks without a date show no indicator
- The list sorts automatically by urgency: overdue → today → upcoming → no date
- Due dates are saved and survive popup close/reopen

### AI-assisted coding focus

Write the **sorting logic prompt yourself** — no hints given. Your prompt must describe the sort order, how to handle tasks with no date, and whether the original array should be mutated or copied.

Run the generated code and test edge cases: all tasks overdue, a mix of dated and undated, tasks with the same due date. Iterate until it's correct. The challenge is writing a precise enough prompt that the sort works on the first real test.

### Self-check

- [ ] Add a task with a past date — red "Overdue" badge, appears first in the list
- [ ] Add a task for today — yellow "Today" badge, appears after overdue
- [ ] Add a task with a future date — date badge, appears after today
- [ ] Add a task with no date — no badge, appears last
- [ ] Sort order is preserved within each filter (All / Active / Done)
- [ ] All dates survive popup close/reopen

---

## Capstone (~30 min)

Demo your extension to the group. Share one Copilot prompt that worked particularly well — add it to `PROMPTS.md` so everyone can learn from it.
