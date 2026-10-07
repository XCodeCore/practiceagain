---
doc: checklist
status: approved
---
# PracticeAgain Build Checklist

Build mode: fast implementation with simple explanations and a final hands-on review. User explicitly requested "Go ahead and build it" after reviewing the technical plan; do not add another pre-build approval gate.

## Slices

- [ ] **1. Attempt, correct, and retry a simple equation**
  Becomes usable: Welcome, step checking, explanations, assistance labels, and a fresh question.
  Why now: Proves the maths risk and core learning journey together.
  PRD ref: `prd.md > The Core Journey`
  Spec ref: `spec.md > Algebra Parser and Checker`, `spec.md > User Interface`
  Build: Implement browser app, rational algebra checker, question data, and attempt controller.
  Verify (mechanical): Node tests and browser error/correction/fresh-question journey.
  Learner check: Try a question, make a mistake, correct it, then try a fresh question.
  Commit: `Build verified algebra practice journey`

- [ ] **2. Save, revisit, and erase practice records**
  Becomes usable: Reload restoration, mistake review, progress records, and honest saving failures.
  Why now: Makes the working learning journey useful beyond one visit.
  PRD ref: `prd.md > Saved Mistakes and Results`
  Spec ref: `spec.md > Browser Storage`
  Build: Persistence, review, reset, documentation, and error fallbacks.
  Verify (mechanical): Storage tests and browser reload/review/reset checks; mobile and keyboard checks.
  Learner check: Reload and review a saved mistake.
  Commit: `Save and review practice progress`

## Hands-on Checkpoints
- [ ] Early usable behaviour explored — shared review of this compact build
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review
- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map
- [ ] Learning activity complete
- [ ] Optional edit and transfer reflection addressed
- [ ] App map generated, checked, and shown

Activity and evidence: Pending student review; automated testing is not learner feedback.

## Revisions

## Build evidence — 5 October 2026
Both slices implemented. Four Node tests passed. Browser verification passed correction, valid step, assisted completion, reload restoration, fresh independent completion, mistake review, delete cancellation/confirmation, mobile hint and layout (390px), with no page errors. Student hands-on review remains pending. Git checkpoints not committed: this repository has no configured author identity.

## Approved product revision
User requested entering their own questions and approved implementation. Added custom integer-coefficient linear equations (one x expression on one side, number on the other), exact fractional answers, one-operation explanations, and similar practice. Tests cover negatives, reversed equations, fractions, unsupported inputs, and saved custom attempts. Browser verified 2x=20 explanation, reload, and x=10 completion. Final learner review remains pending.

Extended equations tested: 2y=23, brackets, unknowns on both sides, mixed-variable rejection, and saved extended attempts. Browser verified the combined case 3(t-2)=t+4 with a brief correct explanation. Student feedback still pending.

7 October verification: see verification/check-report.md. Ten tests and browser/phone checks passed. Similar-question coefficient boundary fixed. Local-server restart confirmed; public hosting remains pending. Final learner ship approval is not implied by automated checks.

### 7 October — planning reconciliation and reference map
Updated affected planning sections and README to reflect custom letters, brackets, both-side unknowns, the full brief numbered explanation, current controls, data shape, test filename, and actual storage limitations. Earlier implementation evidence remains above; unchecked slice boxes reflect missing Git checkpoint commits, not missing app code.

User hands-on evidence: custom equations and similar practice were tried on 5–6 October. User clarified that Try a similar question changes numbers while Enter another question accepts their own question. Feedback requested simpler wording, numbered explanations, and decimal display. These revisions were implemented. Final explicit readiness confirmation remains pending.

Reference map prepared: devpost/app-map.html. Source paths and checkStep, render, lessonFor, displayAnswer, classify, save, and restore anchors checked against actual files. Standalone HTML has no scripts or external assets. A guided learner code activity and optional reflection have not been completed; do not mark those boxes from instructions alone. Map browser rendering is not verified in this documentation pass. No checkpoint commit created because author identity remains unconfigured.
