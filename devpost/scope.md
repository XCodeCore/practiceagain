---
doc: scope
status: approved
---

# PracticeAgain

A web app that helps secondary-school students understand basic algebra mistakes and practise solving similar questions independently.

## The Core Idea

Separate completing a question with help from solving a new question independently. The learning journey continues after an explanation: a fresh question tests the same skill, and saved mistakes support later practice. This is our proposed focus, not a claim that the approach is unique or proven to improve grades.

## Who It's For

Secondary-school students worldwide who are practising simple algebra equations and struggle to understand why their answer is wrong. The first version uses English and is independent of any country's exams.

## The Core Loop

Attempt one original equation at a time with space to enter solving steps, inspect an incorrect step with guidance, read a short explanation, and try a different equation testing the same skill without first seeing its solution. Save the mistake and attempt results so the student can revisit them later. Record assisted and independent attempts separately. Supported notation and mistake types will be defined during product planning; arbitrary handwriting diagnosis is not assumed.

## Inspiration & Identity

Simple English and clear next steps are confirmed preferences. The implemented style uses a light background, dark text, blue buttons, and system fonts. Prior research found close competition in mistake notebooks, including https://reviewnotes.app/en; clear feedback and independently checked practice are priorities rather than unsupported novelty claims.

## Why This Matters to the Learner

The learner wants a useful project with worldwide relevance, hopes to compete for hackathon prizes, and wants to build a working app they understand.

## What Working Looks Like

Proposed demo: a student makes a mistake in a simple equation, sees the step that needs attention, receives an explanation, and solves a new equation independently. The app records assisted and independent attempts separately and lets the student revisit a saved mistake. One successful attempt demonstrates the workflow; it does not establish mastery or improved exam results.

## First-Version Boundary

Basic single-variable linear equations, English explanations, original carefully checked questions, mistake review, new practice questions, and saved attempt results. Build one complete journey first. Progress stays in this browser. The app uses a checked maths parser and prepared explanations; Codex assists development.

## Later

More maths topics and languages after the first journey works and receives student feedback.

## Outside This First Version

Country-specific exam preparation is excluded because the learner wants worldwide relevance. A full curriculum is deferred to keep questions and explanations checkable. Photo uploads, accounts, teacher dashboards, and unrestricted AI tutoring are not proposed for this small prototype; they are additional scope requiring a separate decision.

## Approved revision: own questions
The user approved entering their own basic equation, receiving brief numbered explanations, checking their working, and trying a similar question. Current supported family: linear equations with one English alphabetic unknown, brackets, and unknowns on either or both sides. Normalized coefficients must be whole numbers of magnitude at most 10,000; input is limited to 160 characters. Answers use exact rational arithmetic, with short terminating decimals displayed when possible. No unrestricted maths tutor.
