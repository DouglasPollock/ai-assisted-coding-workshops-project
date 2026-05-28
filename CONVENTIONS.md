# Project Conventions

## Git Workflow
- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `chore:`
- Feature branches: `feature/task-1-dark-mode`, `feature/task-2-stories`
- Merge to main after completing each task

## Naming
- Functions: camelCase, verbs — `selectCard`, `revealVote`, `resetSession`
- Variables: camelCase, nouns — `selectedCard`, `currentStory`
- Constants: UPPER_SNAKE_CASE — `CARD_VALUES`, `STORAGE_KEYS`
- localStorage keys: always via a named constant, prefix `"scrumPoker:"`

---

## Working with GitHub Copilot — Best Practices

### Effective Prompts

**BE SPECIFIC** — include where, what technology, and what the expected outcome is:
> "Add a dark mode toggle in the top-right corner of the header. Use Tailwind's `dark:` variant. Persist the state to localStorage under key `'scrumPoker:theme'`."

**NOT:**
> "make dark mode nice"

---

**PROVIDE CONTEXT** — reference the exact file and function:
> "Update the `selectCard` function in `app.js` to also persist the selected card to localStorage under key `'scrumPoker:lastCard'`."

**NOT:**
> "save the cards"

---

**DEFINE CRITERIA** — state validation rules and UX behaviour explicitly:
> "Add nickname validation: 2–20 characters, letters/digits/spaces only. Show an inline error message below the input."

**NOT:**
> "add validation"

---

### Anti-Patterns to Avoid
- ❌ `"make it better"` — Copilot doesn't know what "better" means to you
- ❌ `"fix the bugs"` — specify which bug and what the expected behaviour is
- ❌ `"add everything needed"` — you'll get 500 lines of unwanted code
- ❌ `"just do it"` — Copilot will invent something you won't like

### Workflow with GitHub Copilot
1. Read the brief in `NEXT.md`
2. Write a user story for the feature (yourself or ask Copilot Chat to help)
3. Ask Copilot Chat for an implementation plan (3–5 steps, code optional)
4. Accept the plan or refine it
5. Implement step by step — **not** everything at once
6. Verify each step works in the browser before moving on
7. Add successful prompts to `PROMPTS.md`
