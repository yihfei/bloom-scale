# Log 02: Frontend Architecture
**Date:** 15 February 2026

## Architecture
React was chosen as Next.js introduces unnecessary complexity for a client-side app.

I also want to integrate TDD into the development process for this application. This would be primarily executed using ReactTestingLibrary (RTL).

## TDD

| Category | Package | Description & Functional Purpose |
| :--- | :--- | :--- |
| **The Engine** | `vitest` | The core test runner. Vite-native, providing near-instant feedback by leveraging the same transformation engine as the dev server. |
| **The Environment** | `jsdom` | A JavaScript implementation of web standards. Creates a "virtual browser" in Node.js so React components can render without a physical screen. |
| **The User** | `@testing-library/react` | The primary tool for mounting and interacting with components. Focuses on testing the UI from the user's perspective rather than internal state. |
| **The Language** | `@testing-library/jest-dom` | Provides "semantic matchers" for assertions. Allows for human-readable tests like `expect(scale).toBeInTheDocument()`. |
| **The Action** | `@testing-library/user-event` | Simulates high-fidelity browser interactions (like precise click and hover sequences) to ensure the UI handles events realistically. |

---

