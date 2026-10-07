---
doc: prd
status: approved
---

# PracticeAgain — Product Requirements

Help secondary-school students worldwide understand basic algebra mistakes and try a similar problem independently. First version in English.
Source: scope.md > Who It's For, The Core Idea.

## The Core Journey

1. Open a welcome screen explaining the purpose; enter their own equation or choose a practice question without signing in.
2. See one original simple equation, a box for the next solving step, Check my step, and Help me understand.
3. Submit a step. Feedback appears beside the working. Accepted steps remain visible; errors can be corrected without restarting.
4. If help is used, keep that fact visible. Help me understand shows the answer and a brief numbered solution in simple English.
5. On completion, show whether the attempt used help; offer a new equation testing the same skill.
6. Try the new question without seeing its answer first. Record assisted and independent results separately.
7. Revisit saved mistakes through My mistakes.
Source: scope.md > The Core Loop, What Working Looks Like.

## Screens and Layout

- Welcome: short purpose statement, question input, Work on my question button, practice-question option, and My mistakes access.
- Practice: one equation, readable working history, next-step entry, check/hint controls, and adjacent feedback. Completion is a state of this screen, not another required dashboard.
- Mistake review: saved original question, submitted incorrect step, feedback, and a way to practise that skill again.
The learner approved the proposed welcome and practice layout. The user has tried custom questions and similar practice and supplied wording feedback.

## Look and Feel

Confirmed: a clean interface, one obvious starting action, plain English, and clear next steps. Implemented appearance: light background, dark text, blue buttons, and readable system fonts. Feedback must be understandable as text, not just a colour change.

## Features and Behavior

### Start Without an Account

Starting practice requires no registration. The welcome text explains that students attempt a question, get help if needed, and practise again. Original questions are carefully checked; do not claim official exam affiliation.

### Enter and Check a Step

Current boundary: one English alphabetic unknown, linear brackets, and unknowns on both sides. Normalized coefficients are whole numbers bounded by 10,000 in magnitude; input is limited to 160 characters. Nonlinear equations and multiple unknowns are unsupported. The page shows an example of accepted notation, such as 3x = 15 or x = 5. Support harmless spaces and equivalent formatting; do not require a single memorised route when a supported alternative is mathematically valid.

Classify feedback honestly: valid progress, a supported incorrect step, unchanged working, or input the checker cannot interpret. Unsupported input is not labelled a maths mistake. Do not claim a specific misconception from a wrong result alone; say what is wrong with the submitted step and provide a relevant explanation. Do not silently accept a final correct answer as evidence of step-by-step understanding.

### Hints and Assistance

Help me understand reveals the answer and brief numbered steps. Once a hint or corrective explanation appears, the attempt is assisted. Correct-step confirmation alone does not make an attempt assisted. A failed mathematical step receiving corrective feedback also makes the attempt assisted; input-format guidance alone does not.

### Fresh Practice

After completing an equation, offer another with different values and the same skill. Hide its solution until help is requested or the learner submits working. If help is used, relabel this attempt assisted; never keep an independent-success label simply because the question started in that mode. Success means completing this supported question, not proven mastery or predicted grades.

### Saved Mistakes and Results

Proposed first-version behaviour: retain mistakes and completed attempt results in the same browser, including after a reload. State this limit clearly; no cross-device sync is promised. View my working reopens the saved attempt. Try a similar question creates a separate attempt without overwriting that record. Provide a clear way to erase saved practice data. If saving fails, keep practice usable and show that it was not saved.
Source: scope.md > First-Version Boundary.

## States and Boundaries

- First use: explain the purpose and show the question input and practice option; review has a friendly empty state rather than fabricated records.
- Blank input: ask for a step without counting a maths error.
- Unsupported notation: show a supported example; preserve the student's text so it can be edited.
- Incorrect supported step: retain the entry and explain that the step changes the original solution; allow retry.
- Valid unfinished step: append accepted working and prepare the next entry.
- Completion: show assisted or independently solved, with a fresh-practice action.
- Save failure: visibly state the limitation; do not display a false saved confirmation.
- Returning student: existing mistake records are available in that browser.

## Product Decisions

Confirmed by learner: worldwide secondary-school audience; English first; simple algebra; one question at a time; entry of solving steps; Check my step and Help me understand; feedback beside work; fresh independent practice; saved mistakes; no account needed; clean welcome with own-question entry and practice options.

Recommended details approved with this product plan: the narrow equation family, input classification and assistance rules, same-browser persistence, review retry behaviour, and deletion of saved data.

## Acceptance Criteria

- A new student can begin from the welcome screen without signing in.
- A supported incorrect step receives corrective feedback while previous working stays visible.
- Unreadable or unsupported input receives format guidance instead of a false maths diagnosis.
- A completed attempt that used corrective feedback or hints is labelled assisted.
- A different equation can be solved without hints or correction and is labelled independently solved.
- A saved mistake can be reopened after reload in the same browser; empty and failed-save states are honest.
- Students can erase their saved practice records.
- Demo includes one error, its correction, completion with help, and success on a fresh question without help. No claim of long-term learning improvement is made from that demo.

## Deferred and Non-Goals

More topics and languages later. No camera/handwriting input, full curriculum, exam simulator, account system, shared teacher dashboard, or unrestricted tutoring in this prototype. AI implementation and provider choice remain technical-plan decisions; the product does not require an unverified AI-generated answer to judge every step.

## Open Questions

Supported notation and bounds are implemented and tested. Public hosting, repository publication, and demo recording remain submission tasks.

## Own-question journey (approved revision)
Home provides a labelled question input, supported examples, and a clear validation message. A student can request Help me understand; show the answer with brief numbered steps together. Explanations mark assistance. A similar equation preserves the normalized variable coefficients and left constant, changes the solution, and adjusts the right constant within supported bounds. Custom questions and whether the explanation is visible restore after reload. Enter another question opens a blank question box; Clear the box clears only the current working entry and feedback.
