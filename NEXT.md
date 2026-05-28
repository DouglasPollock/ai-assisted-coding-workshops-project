# Next Step: Task 1 — First Contact with AI

## Where You Are

Fresh start. The app has 8 estimation cards (1, 2, 3, 5, 8, 13, ?, ☕).
Clicking a card selects it, **Reveal** shows the value, **Reset** clears the selection.
Everything works in the browser — no persistence yet.

## What You'll Build

Three features, one at a time:

1. **Dark mode toggle** — a button in the header that switches the theme and remembers the choice
2. **Player nickname** — an input that saves your name to localStorage and shows it next to the cards
3. **Session vote counter** — a number that increases each time you hit Reveal and persists across reloads

By the end, the app knows who you are and how many times you've voted.

## Learning Objectives

- Writing precise prompts in a real project context
- Configuring GitHub Copilot with `.github/copilot-instructions.md`
- Iterating on AI-generated code
- Recognising how prompt specificity affects output quality

## Suggested Steps

1. Open the project in VS Code and open `index.html` directly in your browser  
   (or use the Live Server extension: right-click → "Open with Live Server")
2. Verify the app works — click cards, reveal, reset
3. Read `CONVENTIONS.md` — especially the "Working with GitHub Copilot" section
4. Read `.github/copilot-instructions.md` to see what context Copilot has
5. Implement **dark mode toggle** first — it's the most self-contained
6. Then add the **nickname input** with localStorage persistence
7. Finally, add the **session vote counter**
8. After each feature — verify it works in the browser before moving on

## Prompting Tips

Try three levels of specificity across the three features and notice how the results differ:

- **Dark mode** — very specific prompt (see the example in `PROMPTS.md`)
- **Nickname** — medium specificity: _"Add a nickname input that persists across sessions"_
- **Vote counter** — open: _"I want to see how many times I've voted"_

## Self-Check

Before moving on, verify:
- [ ] Dark mode persists across page reloads
- [ ] Nickname is visible next to the cards
- [ ] Vote counter increments on each Reveal
- [ ] You can explain at least one decision Copilot made that you would have done differently

## What's Next

After completing Task 1, read `TASKS.md` for the Task 2 brief.

## Estimated Time

~2 hours
