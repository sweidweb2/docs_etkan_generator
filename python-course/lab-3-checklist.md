# Lab 03 — Correction Checklist

**Python Course · Student Study Tracker**  
**Prepared by:** Etkan Engineering Teams · **Date:** August 2026

Correction checklist for the Student Study Tracker — tick each item after you run the student’s program.

---

## How to use this checklist

The student should build **one growing app**, not separate files per exercise. Run their final program and trace each feature. Tick a box only when the requirement works in practice.

- [ ] **Run the program** — start from their main file and use the menu (or early-step version if they are mid-lab).
- [ ] **Test edge cases** — spaces in name, mixed-case search, invalid menu input where relevant.
- [ ] **Read the code** — confirm the right concept is used (loop, strip, except, recursion), not only the printed output.
- [ ] **One app** — later steps should still use the name / subjects / tasks from earlier steps.

### Quick scoring (optional)

| Section | Score |
|---------|-------|
| Exercises 01–08 | / 8 |
| Exercises 09–14 | / 6 |
| Final menu | / 1 |

---

## Phases 1–2 · Hello & subjects

### 01 — Name welcome & clean input

- [ ] Program asks for the student name with `input()`
- [ ] Prints a welcome like `Welcome, Ali!` using the cleaned name
- [ ] Prints the same name in **uppercase** and **lowercase**
- [ ] Uses `strip()` — typing `  Ali  ` still shows `Ali` (not spaces)
- [ ] Name is stored in a variable reused later (profile, ID, ASCII)

**Quick test:** Enter `  Sara  ` → welcome shows `Sara`, not padded spaces.

### 02 — Collect and list subjects

- [ ] Asks how many subjects to add
- [ ] Uses a **loop** to read each subject name
- [ ] Stores subjects in a **list**
- [ ] Prints numbered list: `1. Python`, `2. Math`, …
- [ ] Counter / `range` used correctly (not hard-coded for one count only)

**Quick test:** Enter 3 subjects → output shows `1.` `2.` `3.` with correct names.

---

## Phases 3–4 · Menu & search

### 03 — Keep the program running

- [ ] Menu shows at least: Add subject, Show subjects, Search subject, Exit
- [ ] Reads user choice and runs the matching action
- [ ] Program **loops** until Exit — does not stop after one action
- [ ] Exit option actually ends the program

**Quick test:** Pick Show subjects twice, then Exit — menu reappears between actions.

### 04 — Search subject (any case)

- [ ] Asks which subject to search for
- [ ] Finds subject when typed as `python`, `PYTHON`, or `PyThOn` if list has `Python`
- [ ] Prints `Subject found!` (or equivalent) when match exists
- [ ] Prints not-found message when subject is missing
- [ ] Uses case-insensitive compare (`lower`, `in`, or `find`)

**Quick test:** Add `Python`, search `python` → found. Search `Chemistry` → not found.

---

## Phases 5–6 · Text & profile

### 05 — Split many subjects · Join a sentence

- [ ] Accepts one comma-separated line (e.g. `Python, Math, Physics, English`)
- [ ] Uses `split()` to build a list of subjects
- [ ] Displays subjects from that list
- [ ] Uses `join` (or equivalent) for a readable sentence with **and** before the last item

**Quick test:** Input `Python, Math, Physics` → sentence like `You are studying Python, Math and Physics.`

### 06 — Student profile — inspect the name

- [ ] Stores / shows profile: **name** and **grade**
- [ ] Prints **first letter** of name (after strip)
- [ ] Prints **last letter** of name
- [ ] Prints correct **length** (spaces count if still in string)
- [ ] Uses indexing or slicing on the name string

**Quick test:** Name `Ali Sweid`, grade `11` → first `A`, last `d`, length `9`.

---

## Phases 7–8 · Details & tasks

### 07 — Description + search inside text

- [ ] Each subject has a **description** stored with it
- [ ] User can enter a search word
- [ ] Search inside description is **case-insensitive**
- [ ] Prints `Found!` or clear not-found message

**Quick test:** Description `Programming language`, search `programming` → Found!

### 08 — Subjects with study tasks

- [ ] Each subject has its own **list of tasks**
- [ ] Prints subject name, then numbered tasks under it (indented or clear grouping)
- [ ] Uses **nested loops** (outer: subjects, inner: tasks)
- [ ] Task numbering resets per subject (1, 2, 3 under each subject)

**Quick test:** Two subjects with different task counts → each block shows its own `1. 2. 3.` list.

---

## Phases 9–10 · Progress & ID

### 09 — Progress tracker

- [ ] Asks total tasks and completed tasks
- [ ] Prints **total**, **completed**, and **remaining** correctly (`remaining = total - completed`)
- [ ] Counts down remaining: 4, 3, 2, 1 (descending loop)
- [ ] Optional: progress bar or percentage display

**Quick test:** Total 10, completed 6 → remaining 4, then countdown `4 3 2 1`.

### 10 — Generate student ID

- [ ] Builds ID from full name (e.g. `Ali Sweid` → `ALI-SWE` or similar rule)
- [ ] Uses string tools: indexing, slicing, `upper`/`lower`, `replace`
- [ ] Prints the generated ID
- [ ] ID is derived from the same student name used elsewhere

**Quick test:** Name `Ali Sweid` → ID matches student’s stated rule (e.g. `ALI-SWE`).

---

## Phases 11–12 · ASCII & errors

### 11 — ASCII student code

- [ ] Loops through each character in the student name
- [ ] Prints each character and its **ASCII** value (e.g. `A = 65`)
- [ ] Combines values into a simple code (student’s design — check it is consistent)
- [ ] Uses `for character in name` (or equivalent iteration)

**Quick test:** Name `Ali` → shows A=65, l=108, i=105 (or `ord()` values).

### 12 — Break it on purpose (errors)

- [ ] **Syntax:** Can show error with missing `:` after `if` and read traceback
- [ ] **Runtime:** `int(input())` + text `hello` raises `ValueError`; student uses `try/except` to handle it
- [ ] **Index:** Can demonstrate `IndexError` (e.g. `name[10]` on short string) and explain why
- [ ] Student can name the three error types (syntax, runtime, index/logical distinction later)

**Quick test:** Ask student to demo each error live or show saved broken/fix versions in code.

---

## Phases 13–14 · Logic & recursion

### 13 — Logical error (wrong answer)

- [ ] Student demonstrated wrong formula (e.g. `remaining = total - completed + 1`)
- [ ] Program runs without crashing but remaining count is wrong
- [ ] Student explains this is a **logical error** (not syntax / not runtime)
- [ ] Student can fix formula to `total - completed`

**Quick test:** Total 10, completed 6 → wrong formula gives 5 remaining; correct gives 4.

### 14 — Study countdown · recursion

- [ ] Countdown prints `5 4 3 2 1` then `Study time!`
- [ ] **Version 1:** implemented with a loop
- [ ] **Version 2:** same output using a function that **calls itself** (recursion)
- [ ] Recursion has a clear base case (stops at 1 or 0)

**Quick test:** Run countdown from menu → exact sequence ending with `Study time!`

---

## Exercise 15 · Full Study Tracker

### 15 — Full menu integration

- [ ] Welcome shows cleaned student name (uppercase in banner is OK)
- [ ] **1** Add subject — adds to list
- [ ] **2** Show subjects — numbered list
- [ ] **3** Search subjects — case-insensitive
- [ ] **4** Add tasks — tasks linked to subjects
- [ ] **5** Show tasks — nested subject → task display
- [ ] **6** Track progress — totals + countdown (correct math)
- [ ] **7** Student profile — name, grade, first/last letter, length
- [ ] **8** Generate student ID — from stored name
- [ ] **9** Start study countdown — loop or recursion version
- [ ] **0** Exit — program ends cleanly
- [ ] All features live in **one program** (one main flow / menu)

**Quick test:** Run through every menu option once, then Exit. No crash; data from earlier steps still used.

---

## Concepts — spot check in code

If output looks right but code is wrong, untick the exercise. Scan the student file for:

| Concept | Should appear in | Look for |
|---------|------------------|----------|
| strip / upper / lower | Steps 01, 04, 06 | `.strip()` `.upper()` `.lower()` |
| range + loop | Steps 02, 03, 09, 14 | `for` with `range` |
| split / join | Step 05 | `.split(",")` `".join(...)"` |
| indexing / slicing / len | Steps 06, 10 | `[0]` `[-1]` `len()` |
| nested loops | Step 08 | loop inside loop for subjects + tasks |
| try / except | Step 12 | `except ValueError` (or similar) |
| recursion | Step 14 | function calls itself with base case |

---

## Grading summary

| Field | Value |
|-------|-------|
| Student name | |
| Date | |
| Score / notes | |

**Pass hint:** Final menu works + at least 10/15 exercise areas ticked with correct concepts in code.

**Incomplete:** Separate mini-scripts per step with no unified app.

**Redo:** Wrong remaining formula still in final app, search case-sensitive, or no error handling on menu numbers.
