export interface GlossaryTerm {
  term: string
  expansion?: string // Full expansion for acronyms
  definition: string
  category: "html" | "css" | "javascript" | "typescript" | "react" | "nextjs" | "accessibility" | "design-systems" | "testing" | "general"
  lessonSlugs?: string[] // Lessons where this term appears
}

export const glossaryTerms: GlossaryTerm[] = [
  // HTML
  {
    term: "DOM",
    expansion: "Document Object Model",
    definition: "The browser's live, tree-shaped representation of an HTML document. JavaScript reads and modifies the DOM to make pages interactive.",
    category: "html",
    lessonSlugs: ["01-dom-events", "02-async-fetch"],
  },
  {
    term: "HTML",
    expansion: "HyperText Markup Language",
    definition: "The language that gives web pages their structure and meaning. HTML uses tags like <button>, <form>, and <nav> to describe what content is.",
    category: "html",
    lessonSlugs: ["01-semantic-html", "01-forms-validation"],
  },
  {
    term: "Semantic HTML",
    definition: "Using HTML elements that describe meaning, not just appearance — e.g. <nav> instead of <div class='nav'>. Helps screen readers, search engines, and keyboard users.",
    category: "html",
    lessonSlugs: ["01-semantic-html"],
  },
  {
    term: "ARIA",
    expansion: "Accessible Rich Internet Applications",
    definition: "A set of HTML attributes (like aria-label, role, aria-expanded) that communicate the purpose and state of UI elements to assistive technologies like screen readers.",
    category: "accessibility",
    lessonSlugs: ["01-keyboard-and-focus", "02-aria-patterns"],
  },
  {
    term: "WCAG",
    expansion: "Web Content Accessibility Guidelines",
    definition: "International standards for web accessibility published by the W3C. Organized into three conformance levels: A (minimum), AA (industry standard), and AAA (enhanced).",
    category: "accessibility",
    lessonSlugs: ["03-wcag-auditing"],
  },
  {
    term: "A11y",
    expansion: "Accessibility (numeronym: A + 11 letters + y)",
    definition: "Shorthand for 'accessibility.' The 11 refers to the 11 letters between the 'a' and 'y'. Used widely in the web development community.",
    category: "accessibility",
    lessonSlugs: ["01-keyboard-and-focus"],
  },
  // CSS
  {
    term: "CSS",
    expansion: "Cascading Style Sheets",
    definition: "The language used to style HTML elements — controlling colors, layout, typography, spacing, animations, and responsive behavior.",
    category: "css",
    lessonSlugs: ["01-layout-flexbox-grid", "02-design-tokens"],
  },
  {
    term: "Flexbox",
    definition: "A CSS layout mode that arranges items in a single row or column. Use it for nav bars, button groups, centering, and any one-directional alignment.",
    category: "css",
    lessonSlugs: ["01-layout-flexbox-grid"],
  },
  {
    term: "CSS Grid",
    definition: "A CSS layout system for two-dimensional layouts — rows and columns simultaneously. Best for page-level structure, card grids, and dashboards.",
    category: "css",
    lessonSlugs: ["01-layout-flexbox-grid"],
  },
  {
    term: "Design Tokens",
    definition: "Named variables that store design decisions: colors, spacing, typography, border radius. e.g. --color-primary: #3b82f6. Tokens connect design tools to code.",
    category: "design-systems",
    lessonSlugs: ["02-design-tokens", "01-token-system"],
  },
  {
    term: "Specificity",
    definition: "The algorithm CSS uses to decide which rule wins when multiple rules target the same element. ID selectors beat class selectors, which beat element selectors.",
    category: "css",
    lessonSlugs: ["03-specificity-cascade"],
  },
  {
    term: "CLS",
    expansion: "Cumulative Layout Shift",
    definition: "A Core Web Vitals metric that measures how much page content shifts unexpectedly during load. High CLS creates a jarring experience. Target: below 0.1.",
    category: "general",
    lessonSlugs: ["04-edge-cases-and-polish"],
  },
  {
    term: "LCP",
    expansion: "Largest Contentful Paint",
    definition: "A Core Web Vitals metric measuring how long the largest visible element takes to render. Indicates perceived load speed. Target: under 2.5 seconds.",
    category: "general",
    lessonSlugs: ["04-edge-cases-and-polish"],
  },
  // JavaScript
  {
    term: "Async/Await",
    definition: "Modern JavaScript syntax for handling asynchronous operations (like API calls) without callback nesting. async marks a function, await pauses until a Promise resolves.",
    category: "javascript",
    lessonSlugs: ["02-async-fetch"],
  },
  {
    term: "Promise",
    definition: "A JavaScript object representing an eventual value — either fulfilled (resolved) or rejected (failed). The foundation of async/await and fetch().",
    category: "javascript",
    lessonSlugs: ["02-async-fetch"],
  },
  {
    term: "Event Listener",
    definition: "A function registered on a DOM element that runs when a specific event occurs, like a click, keypress, or input change.",
    category: "javascript",
    lessonSlugs: ["01-dom-events"],
  },
  {
    term: "Callback",
    definition: "A function passed as an argument to another function, to be called later. Used in event listeners, array methods (map, filter), and async patterns.",
    category: "javascript",
    lessonSlugs: ["01-dom-events"],
  },
  // TypeScript
  {
    term: "TypeScript",
    definition: "A superset of JavaScript that adds static type annotations. TypeScript compiles to plain JavaScript — the browser never sees the types.",
    category: "typescript",
    lessonSlugs: ["01-ts-basics", "02-component-types"],
  },
  {
    term: "Interface",
    definition: "A TypeScript construct that defines the shape of an object — what properties it has and what type each property is. e.g. interface User { name: string; age: number }",
    category: "typescript",
    lessonSlugs: ["01-ts-basics"],
  },
  {
    term: "Discriminated Union",
    definition: "A TypeScript pattern for modeling states that are mutually exclusive — e.g. { status: 'loading' } | { status: 'success', data: T } | { status: 'error', message: string }.",
    category: "typescript",
    lessonSlugs: ["03-ui-state-types"],
  },
  {
    term: "Generic",
    definition: "A TypeScript feature that lets you write reusable code that works with any type. e.g. function identity<T>(value: T): T — the T is a type parameter.",
    category: "typescript",
    lessonSlugs: ["04-generics-utilities"],
  },
  // React
  {
    term: "Component",
    definition: "A reusable, self-contained piece of UI in React. A function that accepts props and returns JSX. Components compose into larger UIs like building blocks.",
    category: "react",
    lessonSlugs: ["01-components-props", "02-state-hooks"],
  },
  {
    term: "Props",
    expansion: "Properties",
    definition: "Data passed from a parent component to a child component. Props are read-only — a child cannot modify them. Think of them as function arguments.",
    category: "react",
    lessonSlugs: ["01-components-props"],
  },
  {
    term: "State",
    definition: "Data managed inside a component that, when changed, causes the component to re-render. Created with the useState hook.",
    category: "react",
    lessonSlugs: ["02-state-hooks"],
  },
  {
    term: "Hook",
    definition: "A special React function (starting with 'use') that lets functional components tap into React features: useState, useEffect, useRef, useMemo, etc.",
    category: "react",
    lessonSlugs: ["02-state-hooks", "03-effects-refs"],
  },
  {
    term: "JSX",
    expansion: "JavaScript XML",
    definition: "A syntax extension for JavaScript that lets you write HTML-like markup inside JavaScript. React components return JSX. It compiles to React.createElement() calls.",
    category: "react",
    lessonSlugs: ["01-components-props"],
  },
  {
    term: "useEffect",
    definition: "A React hook for running side effects after render: fetching data, subscribing to events, updating the document title. Runs after every render by default.",
    category: "react",
    lessonSlugs: ["03-effects-refs"],
  },
  {
    term: "Virtual DOM",
    expansion: "Virtual Document Object Model",
    definition: "React's in-memory copy of the real DOM. React compares old and new virtual DOMs (diffing) and applies only the minimal necessary changes to the real DOM.",
    category: "react",
    lessonSlugs: ["01-components-props"],
  },
  // Next.js
  {
    term: "SSR",
    expansion: "Server-Side Rendering",
    definition: "Generating HTML on the server for each request, rather than in the browser. Improves initial load time and SEO. Next.js Server Components use SSR.",
    category: "nextjs",
    lessonSlugs: ["01-app-router-layouts", "02-server-client-components"],
  },
  {
    term: "SSG",
    expansion: "Static Site Generation",
    definition: "Pre-rendering pages at build time into static HTML files. No server needed at request time. Fast to serve, ideal for content that doesn't change often.",
    category: "nextjs",
    lessonSlugs: ["03-data-fetching"],
  },
  {
    term: "App Router",
    definition: "The modern Next.js routing system (introduced in v13) based on the /app directory. Supports Server Components, layouts, loading states, and nested routing.",
    category: "nextjs",
    lessonSlugs: ["01-app-router-layouts"],
  },
  {
    term: "Server Component",
    definition: "A React component that renders exclusively on the server. Can directly access databases and file systems. Cannot use browser APIs, useState, or event handlers.",
    category: "nextjs",
    lessonSlugs: ["02-server-client-components"],
  },
  {
    term: "Client Component",
    definition: "A React component marked with 'use client' that runs in the browser. Required for interactivity (useState, event handlers, localStorage, browser APIs).",
    category: "nextjs",
    lessonSlugs: ["02-server-client-components"],
  },
  // Design Systems
  {
    term: "Design System",
    definition: "A collection of reusable components, standards, and guidelines that teams use to build consistent products. Includes tokens, components, patterns, and documentation.",
    category: "design-systems",
    lessonSlugs: ["01-token-system", "02-component-api-design"],
  },
  {
    term: "Storybook",
    definition: "An open-source tool for developing and documenting UI components in isolation. Each component gets a 'story' showing its variants and states.",
    category: "design-systems",
    lessonSlugs: ["04-storybook-docs"],
  },
  {
    term: "Component API",
    definition: "The props interface a component exposes — what it accepts, what it returns, and how it behaves. Good component APIs are predictable and composable.",
    category: "design-systems",
    lessonSlugs: ["02-component-api-design"],
  },
  // Testing
  {
    term: "Unit Test",
    definition: "A test that verifies a single function or component in isolation. Fast to run, no browser required. Tools: Vitest, Jest.",
    category: "testing",
    lessonSlugs: ["01-vitest-component-tests"],
  },
  {
    term: "E2E Test",
    expansion: "End-to-End Test",
    definition: "A test that simulates a real user clicking through a complete flow in a real browser. Slower than unit tests but catches integration issues. Tools: Playwright, Cypress.",
    category: "testing",
    lessonSlugs: ["02-playwright-e2e"],
  },
  {
    term: "axe-core",
    definition: "An open-source accessibility testing library by Deque. Runs automated checks against WCAG rules and reports violations with severity levels.",
    category: "testing",
    lessonSlugs: ["03-a11y-testing"],
  },
  // General
  {
    term: "API",
    expansion: "Application Programming Interface",
    definition: "A defined way for software to communicate. In web dev: a set of HTTP endpoints you call to get or send data. e.g. GET /api/users returns a list of users.",
    category: "general",
    lessonSlugs: ["02-async-fetch"],
  },
  {
    term: "REST",
    expansion: "Representational State Transfer",
    definition: "A common pattern for designing HTTP APIs. Uses standard methods (GET, POST, PUT, DELETE) and resource-based URLs (e.g. /users/123).",
    category: "general",
    lessonSlugs: ["02-async-fetch"],
  },
  {
    term: "Hydration",
    definition: "The process where React attaches event listeners to server-rendered HTML to make it interactive. A mismatch between server and client output causes hydration errors.",
    category: "nextjs",
    lessonSlugs: ["02-server-client-components"],
  },
  {
    term: "Lighthouse",
    definition: "An automated tool (built into Chrome DevTools) that audits web pages for Performance, Accessibility, SEO, and Best Practices. Reports scores 0–100.",
    category: "testing",
    lessonSlugs: ["04-edge-cases-and-polish"],
  },
  {
    term: "CI/CD",
    expansion: "Continuous Integration / Continuous Deployment",
    definition: "Automated pipelines that run tests and deploy code whenever changes are pushed to a repository. Catches regressions before they reach users.",
    category: "general",
    lessonSlugs: ["03-implementation-plan"],
  },
  {
    term: "UX Engineer",
    definition: "A role that bridges design and engineering — building high-fidelity prototypes, design systems, and production UI with a strong sense of craft and user empathy.",
    category: "general",
  },
  {
    term: "Prototype",
    definition: "A simulation of a product used for user testing or design validation. In UX Engineering, prototypes are often built with real code to test realistic interactions.",
    category: "general",
    lessonSlugs: ["01-rapid-prototyping", "02-realistic-interactions"],
  },
  {
    term: "Accessibility Tree",
    definition: "A parallel representation of the DOM that browsers build for assistive technologies. It contains role, name, state, and value for each element.",
    category: "accessibility",
    lessonSlugs: ["01-keyboard-and-focus", "02-aria-patterns"],
  },
  {
    term: "Focus Management",
    definition: "The practice of controlling where keyboard focus goes as users interact with a UI — especially important in modals, drawers, and page transitions.",
    category: "accessibility",
    lessonSlugs: ["01-keyboard-and-focus", "03-forms-and-errors"],
  },
]

export const categories = [
  { value: "all", label: "All Terms" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "accessibility", label: "Accessibility" },
  { value: "design-systems", label: "Design Systems" },
  { value: "testing", label: "Testing" },
  { value: "general", label: "General" },
] as const
