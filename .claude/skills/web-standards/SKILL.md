# Web Standards Skill

Code review standards for HTML, CSS, and JavaScript. Apply these guidelines when reviewing web code, suggesting improvements, or writing new code in this project.

---

## HTML Standards

### Structure
- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- One `<h1>` per page; maintain proper heading hierarchy (h1 → h2 → h3)
- Use `<button>` for actions, `<a>` for navigation
- Forms must have associated `<label>` elements

### Accessibility
- All images need meaningful `alt` text (decorative images: `alt=""`)
- Interactive elements must be keyboard accessible
- Use ARIA attributes only when native semantics are insufficient
- Ensure sufficient color contrast (WCAG AA: 4.5:1 for text)
- Form inputs need visible focus states

### Best Practices
- Declare `lang` attribute on `<html>`
- Include viewport meta tag for responsive design
- External CSS in `<head>`, scripts at end of `<body>` or use `defer`
- Validate HTML structure (no unclosed tags, proper nesting)

---

## CSS Standards

### Organization
- Order properties consistently: positioning → box model → typography → visual → misc
- Group related selectors together
- Use CSS custom properties (variables) for colors, spacing, fonts

### Naming
- Use lowercase with hyphens: `.button-primary`, `.nav-item`
- Be descriptive: `.card-header` not `.ch`
- Avoid overly generic names: `.container-main` not `.box`

### Responsiveness
- Mobile-first approach: base styles for mobile, `min-width` media queries for larger
- Use relative units: `rem`, `em`, `%`, `vw/vh`
- Avoid fixed pixel widths for layout containers
- Test breakpoints: 320px, 768px, 1024px, 1440px

### Performance
- Avoid deep nesting (max 3 levels)
- Minimize use of `!important`
- Prefer classes over complex selectors
- Use shorthand properties where appropriate

### Best Practices
- Reset or normalize browser defaults consistently
- Ensure focus states for interactive elements (`:focus-visible`)
- Use `prefers-reduced-motion` for animations
- Avoid `@import`; use `<link>` for stylesheets

---

## JavaScript Standards

### Code Style
- Use `const` by default, `let` when reassignment needed, never `var`
- Use arrow functions for callbacks: `array.map(item => item.value)`
- Template literals for string interpolation: `` `Hello ${name}` ``
- Destructuring for object/array access: `const { name, age } = user`

### Functions
- Keep functions small and single-purpose
- Use descriptive names: `calculateTotalPrice()` not `calc()`
- Limit parameters (max 3); use options object for more
- Return early to avoid deep nesting

### Error Handling
- Always handle Promise rejections (`.catch()` or try/catch with async/await)
- Validate inputs at function boundaries
- Provide meaningful error messages
- Don't swallow errors silently

### DOM Manipulation
- Cache DOM queries: `const btn = document.querySelector('.btn')`
- Use event delegation for dynamic elements
- Prefer `addEventListener` over inline handlers
- Clean up event listeners when elements are removed

### Performance
- Debounce/throttle scroll and resize handlers
- Avoid synchronous operations in loops
- Use `requestAnimationFrame` for visual updates
- Lazy load non-critical resources

### Security
- Never use `eval()` or `innerHTML` with user input
- Sanitize user input before display
- Use `textContent` instead of `innerHTML` when possible
- Validate data from external sources

### Web Audio API (Project-Specific)
- Always use singleton AudioContext pattern (see `getAudioContext()`)
- Connect nodes through analyser for visualization
- Schedule amplitude envelopes with `setValueAtTime()` and ramp methods
- Clean up oscillators with `stop()` and disconnect nodes when done

---

## Review Checklist

When reviewing code, verify:

- [ ] HTML is semantic and accessible
- [ ] CSS follows mobile-first, uses variables for theming
- [ ] JS uses modern syntax (const/let, arrow functions, async/await)
- [ ] No console.log statements left in production code
- [ ] Error handling is present for async operations
- [ ] No hardcoded values that should be configurable
- [ ] Code is DRY (Don't Repeat Yourself)
- [ ] Functions have clear, single responsibilities
