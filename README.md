# PracticeAgain
A small algebra practice app: try a solving step, receive feedback, and try a fresh equation. Built for Build With AI: Basics using the Devpost Learn Skill Pack.

## Run
Requires Node.js (tested on Node 24). No packages or API keys needed.

```sh
node server.mjs
```
Open http://127.0.0.1:4173. Serve the `public` folder for deployment; do not expose private planning files through a web server.

## Test
```sh
node --test tests/*.test.mjs
```

## What it checks
Exact rational arithmetic checks whether a typed linear equation with one English alphabetic unknown preserves the original solution. Students may use different solving methods. Unsupported notation receives a format message, not a maths correction. Hints and maths corrections label an attempt as assisted. Completing a fresh question without these is recorded as independent, not as proof of mastery.

## Privacy and limits
Progress is saved in localStorage in the current browser, up to 100 attempts and 200 recorded steps per attempt. No account, analytics, server database, or runtime AI service. Clear saved progress removes this app's storage key only. Browser clearing/private mode can remove records. Saving failures show a warning. Enter your own linear equation, including brackets and an unknown on both sides, or choose from eight starter equations. Examples: 2y = 23, 2(x + 3) = 14, and 5x + 3 = 2x + 15. Normalized coefficients must be integers within ±10,000; input is limited to 160 characters. Powers, multiple unknowns, and word problems are unsupported. English feedback; no school curriculum or exam certification.

Planning documents: devpost/scope.md, devpost/prd.md, devpost/spec.md. User feedback has shaped question entry and brief explanations. Final readiness confirmation and submission materials remain pending. A plain source guide is available at devpost/app-map.html.
