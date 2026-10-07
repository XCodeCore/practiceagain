---
doc: spec
status: approved
---

# PracticeAgain — Technical Plan

## How This Works, In Plain Language

The browser shows a question and the student's working. A small maths checker reads each typed equation and checks whether it keeps the same solution. Checked explanation templates provide hints and corrections. Completed attempts and mistakes are saved in this browser. No account, bank connection, AI service, or paid API key is needed for this version.

This is the implemented approach. The app is built with AI assistance through Codex and the Devpost skills; it does not pretend its runtime checker is an AI tutor.

## Stack

Use HTML for page structure, CSS for appearance, and JavaScript modules for behaviour. No framework or downloaded runtime libraries. Node.js runs automated tests and a local static server during development; installed version verified as v24.21.0. Python is not required.

Documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules ; https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage ; https://nodejs.org/docs/latest-v24.x/api/test.html ; https://nodejs.org/docs/latest-v24.x/api/http.html .

Tradeoff: this supports a deliberately limited algebra grammar and prepared explanations, not arbitrary handwritten or natural-language answers. New topics need additional checked rules and content.

## Where It Runs and How Someone Tries It

From the project root, run `node server.mjs`, then open `http://127.0.0.1:4173`. Serve the app's public assets only, not devpost personal context or unrelated project files. Do not rely on directly opening file URLs: module loading and storage behaviour can differ. Serve correct MIME types and reject traversal outside public assets.

Run verification with `node --test tests/*.test.mjs`. No install step, credentials, or remote API calls. Local recording is the first demo target. A hosted URL is optional and undecided; do not publish automatically. Submission still needs the public repository and short demo video.

## Look and Feel

Carry forward the approved clean layout and simple English. Implemented styling: light background, readable system fonts, dark text, a restrained blue primary action, ample space around working, and text labels for success/help/error states. Responsive single-column layout on phones; wider practice view may put feedback beside working. Label inputs, support keyboard submission, announce feedback, preserve focus, and use colour only alongside text.

## The Core Journey Through the System

Home starts an attempt from a validated custom equation or checked practice data. Step entry goes to the parser, then maths checker, then feedback rules. Accepted working is appended; incorrect working remains in the attempt history with a correction message. Hint and correction events set an assistance flag that cannot be reset within the attempt. Completion records the result. Fresh practice starts a different equation with a fresh assistance flag. Review reads saved records and can reopen the selected attempt; similar practice creates a separate attempt.
Implements prd.md > The Core Journey.

## Components

### Question Data

Generate original bounded positive-integer equations ax + b = c from a coefficient, offset, and known positive-integer solution; derive c exactly. Provide a repeatable demonstration example and a pool of different follow-up values. Custom questions accept one English letter, brackets, and variables on both sides, with normalized integer coefficients bounded by 10,000. Similar practice preserves normalized variable coefficients and the left constant, changes the solution, and adjusts the right constant within bounds. Explanations are checked templates. Exclude immediately repeated equations and reject invalid generation parameters.
Implements prd.md > Fresh Practice.

### Algebra Parser and Checker

Use a small explicit tokenizer/parser, never eval or Function. Normalize one English letter to x internally; support integer/decimal literals, +, -, multiplication by a numeric constant, division by a nonzero numeric constant, parentheses, and exactly one equals sign. Internally represent expressions as a rational coefficient of x plus a rational constant. Rational arithmetic avoids floating-point near-match errors. Reject nonlinear terms, variable denominators, excessive input length, huge numbers, invalid tokens, or divisions by zero as unsupported input with format guidance.

Reduce both sides to coefficients. For a supported equation with a unique solution, compare that solution exactly to the original target. Accept equivalent alternative working, including dividing before subtracting. Reject identities such as 0 = 0 and contradictions; do not accept equations true for every x as progress. Repeated/effectively unchanged working gives neutral guidance, not a false completion. Detect completion when x is isolated with the correct value, on either side. A student can jump to the correct isolated answer; describe it as an answer solved independently, never proof of showing every step.

For supported incorrect equations, explain that the equation no longer has the original solution and remind the student to apply the same operation to both sides. The current app does not diagnose individual misconceptions. Do not infer the student's mental process from a result alone.
Implements prd.md > Enter and Check a Step, States and Boundaries.

### Attempt and Feedback Controller

Keep accepted and rejected step events, current accepted equation, hint events, status, and assistance flag. Invalid formatting does not count as a maths mistake or assistance. Mathematical correction/hints do count. Never change a completed attempt in place or count completion twice. Independent/assisted wording is derived from events, not a UI mode.
Implements prd.md > Hints and Assistance, Fresh Practice.

### Browser Storage

Use localStorage under one versioned PracticeAgain key. Persist validated active attempts, saved mistake records, and completed results; restore supported active working after reload. Limit retained records to a documented reasonable count. Treat storage contents as untrusted: validate schema and bounds; render input as text. Catch unavailable/quota/corrupt data; show a visible warning and continue in memory without pretending saving succeeded. Current limitation: after a corrupt record warning, a later save may replace unreadable records with the new in-memory session; recovery of corrupt records is not supported. Erase only this app's key, never all browser storage. Explain same-browser/site limits and that private mode or clearing site data can remove progress.
Implements prd.md > Saved Mistakes and Results.

### User Interface

Welcome, practice, completion, and mistake-review views, with the agreed controls. Show supported notation examples and a help label on assisted attempts. Mistake review includes a friendly empty state, saved working/feedback, assistance labels, and completion counts. Confirmation before erase prevents accidental loss. Save warnings are visible in relevant views.
Implements prd.md > Screens and Layout, Look and Feel.

## Data Model

Versioned record: {version: 1, attempts: [], current: attemptId or null}. Each attempt contains id, question, current accepted equation, created timestamp, steps, assisted, completed, and optional lessonIndex (controls explanation visibility). Mistakes and result counts are derived from attempts. Retain at most 100 attempts and 200 recorded steps per attempt. Validate on load, reparse questions, and replay working rather than trusting saved answers. No names, contact details, or uploaded schoolwork needed.

## File Structure

```text
build-with-ai-app/
  public/
    index.html            # app shell and accessible controls
    styles.css            # responsive appearance
    src/
      app.mjs             # rendering and view navigation
      algebra.mjs         # rational parser and equivalence checks
      questions.mjs       # original problems and checked explanations
      attempts.mjs        # step events and assistance rules
      storage.mjs         # versioned saved records and fallbacks
  tests/
    core.test.mjs         # maths, assistance, restore, bounds, and similar practice
  server.mjs              # local static server restricted to public/
  README.md               # run, test, limits, and demo instructions
  devpost/                # learning profile and approved planning documents
```

## External Services and Dependencies

None in the running app. Native browser modules/localStorage and Node built-ins only. No API endpoint, provider account, rate limit, or paid key. Development happens with Codex under the user's existing access; do not promise that access itself is free. Browser storage is local, not a backup or cloud sync service.

## Verification

Test exact maths, alternative valid steps, final answers on either side, rational division, identities/contradictions, wrong steps, malformed expressions, input bounds, and malicious text. Test assistance cannot be cleared, formatting guidance does not mark assistance, repeated completion does not duplicate records, fresh question differs, and save failures are honest. Browser verification: full error-to-correction-to-new-independent-question journey; reload/review/delete; blocked storage; keyboard interaction; narrow viewport. Tests must check mathematical correctness and product outcomes, not mirror implementation. Ten Node tests pass; observed browser and narrow-viewport checks are recorded in verification/check-report.md. This is not a physical-phone or screen-reader audit.

## Important Failure Modes

- Unsupported working: preserve entry, show syntax example, do not claim wrong maths.
- Storage blocked/corrupt: clear warning, continue usable practice in memory, offer intentional reset where needed.
- Feedback cannot diagnose a known error: honest equivalence feedback and optional prepared solution, no invented misconception.

## What Was Simplified and Why

Limited equation family and prepared feedback make correctness checkable. Browser storage serves the approved no-account experience. No external fonts or services are necessary for the core journey. Arbitrary uploads and multilingual/full-curriculum tutoring are outside the approved prototype.

## Decisions and Open Issues

The user approved the plan and explicitly requested building it. The implementation uses the recommended stack, rule-based checker, local preview, supported parser grammar, and styling.

Earlier genuine uncertainty: whether API keys require payment. This proposed architecture needs no external API key because mathematical rules and prepared hints run in the browser. Parser correctness is checked by exact-answer, alternative-route, invalid-input, and boundary tests.

Optional hosting remains undecided and does not block a local demo. No consequential product changes are silently authorised by this document.

## Custom equation revision
Use the rational parser to validate supported custom linear questions; serialize exact answers as fraction strings. Reparse questions on restore. lessonFor prepares brief numbered explanations; lessonIndex controls visibility of the full explanation. displayAnswer displays terminating decimals up to six places, retaining fractions otherwise. Nonlinear, multiple-unknown, non-integer-normalized-coefficient, and excessive-size questions receive limitation messages.

## Extended linear equations (user approved)
Custom questions now accept one alphabetic unknown, brackets, and the unknown on both sides. Normalize the chosen letter to x for parsing and checking; reject working with a different letter. Derive a from the difference between left and right coefficients. Brief explanations expand brackets, collect variable terms, remove constants, then divide. Exact fractional solutions supported; nonlinear and multiple-unknown equations remain unsupported. Tests and browser check verified 3(t-2)=t+4 → t=5.
