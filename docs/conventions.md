# Conventions — OFC website

Internal conventions to keep this codebase consistent. Read this before adding new code.

## Build & tooling

### PostCSS + Tailwind v4

The Angular esbuild builder (`@angular/build`) **only picks up `.postcssrc.json`**. Do not switch to `postcss.config.js` — Angular silently ignores it and Tailwind utilities will not be emitted (the UI looks unstyled, but the build still passes).

`.postcssrc.json` at repo root:

```json
{ "plugins": { "@tailwindcss/postcss": {} } }
```

After any CSS/build setup change, verify Tailwind actually compiled by checking emitted utilities:

```bash
npm run build
grep -oE "\.(bg-primary|flex|hidden|text-white)\b" dist/ofc-index/browser/styles-*.css | sort -u
```

Expected: at least `.bg-primary`, `.flex`, `.hidden`, `.text-white` print. If empty, the wiring is broken — Tailwind compiler did not run.

### Commits

- Format: `type(scope): subject` (conventional commits).
- Header ≤ 100 chars, body lines ≤ 100 chars (commitlint enforces this).
- **Never** `git commit --no-verify`. If the hook rejects the message, fix the message.
- Husky pre-commit runs lint-staged (prettier on staged files). Husky commit-msg runs commitlint.

### Local-only files

The `.design/` and `.claude/` directories must NOT be tracked. Add them to `.git/info/exclude` (per-clone, not committed) — never to `.gitignore`, because `.gitignore` is public and would leak their existence.

## Code organization

```
src/app/
  core/data/        # single source of truth for company facts + navigation
    company.ts      # OFC_COMPANY (brand, legal name, offices, contact, socials)
    navigation.ts   # SECONDARY_NAV, MAIN_NAV, ABOUT_NAV, PRODUCT_NAV, INTRODUCTION_NAV
    index.ts        # barrel
  shared/components/  # atomic reusable UI — standalone components, OnPush
    icon/             # <app-icon name="..." size="..." /> — lucide-angular wrapper
    brand/            # <app-brand imageHeightClass="..." /> — logo + home link
    footer-column/    # <app-footer-column heading="..."> <ng-content /> </>
    social-row/       # <app-social-row [links]="..." variant="header|footer" />
    subscription-form/ # <app-subscription-form inputId="..." (submitted)="..." />
    hamburger/        # <app-hamburger [active]="..." (toggled)="..." />
    mobile-drawer/    # <app-mobile-drawer [open]="..." (closed)="..."> <ng-content /> </>
  layout/             # Header + Footer + LayoutComponent shell. No data, no SVG paths.
  pages/              # feature pages (grow in Sprint 2)
```

## Component checklist (every new .component.ts must pass all)

Author every component (page, layout, or shared primitive) against this list. CI does not enforce all of these — discipline does.

### Required
- [ ] `standalone: true` — no NgModules anywhere in this project.
- [ ] `changeDetection: ChangeDetectionStrategy.OnPush` — without exception.
- [ ] Inputs via `input<T>(default)` or `input.required<T>()` — never the `@Input` decorator.
- [ ] Outputs via `output<T>()` — never the `@Output` decorator with `EventEmitter`.
- [ ] Outputs MUST NOT collide with DOM event names: use `toggled` not `toggle`, `closed` not `close`, `pressed` not `click`, etc. (`@angular-eslint/no-output-native` enforces this.)
- [ ] Template element refs via `viewChild()` / `viewChildren()` signal API — never the `@ViewChild` / `@ViewChildren` decorator.
- [ ] Type-only imports use `import type { ... }`.
- [ ] Selector prefix `app-`, kebab-case (`@angular-eslint/component-selector` enforces this).
- [ ] Component class name is `PascalCase` and ends in `Component`.
- [ ] Inline template is fine when ≤ 25 lines or when no other styling is needed; otherwise use `templateUrl` + `styleUrl` siblings.
- [ ] No `Subject` / `BehaviorSubject` / `ReplaySubject` for UI state. Use `signal()` + `computed()`.
- [ ] All RxJS subscriptions in components use `takeUntilDestroyed()` — no manual `unsubscribe`.

### Inputs / outputs
- [ ] Required inputs use `input.required<T>()` so callers cannot omit them.
- [ ] Optional inputs declare a `T` and a sensible default (`input<string>('')` etc.).
- [ ] Use `readonly` on every public field. Make implementation detail fields `protected readonly` so the template can still read them.

### Templates
- [ ] Loops track by a unique stable key (`@for (item of items; track item.route)`) — never `track $index` for routable lists.
- [ ] `[attr.aria-*]` for ARIA attributes, not `[attr.aria-label]="' ' + value"` string-concat tricks (use binding to a computed/string field).
- [ ] No inline SVG path data. Use `<app-icon name="..." />` (which wraps lucide-angular) so changing the icon library is one file.
- [ ] No hard-coded company strings (`+84 ...`, `cco@binhminhhp.com`, etc.). Bind to `company.*` from `core/data`.
- [ ] No hard-coded route slugs (`/about/board`). Bind to `*_NAV` arrays from `core/data/navigation`.

### Component-scoped CSS
- [ ] Do not set `display:*` on `:host` if a parent Tailwind utility (`hidden`, `lg:hidden`, `flex`, etc.) needs to control host visibility. Scoped attribute selectors raise specificity above global utilities and the utility silently loses.
- [ ] Each shared primitive owns the styles for the markup it ships. Do not put `.contact-row` styles in `header.component.css` if `<app-contact-row>` exists.
- [ ] Use `ViewEncapsulation.None` only when the component projects `<ng-content>` and must style projected anchors/paragraphs (currently `app-footer-column`). Comment the choice in the `@Component` block.
- [ ] No `::ng-deep`.

### Data layer
- [ ] Anything that appears in more than one place — strings, links, lists — goes in `src/app/core/data/`. Components import from the barrel `core/data`.
- [ ] Hardcode tells you the value belongs in `core/data/`. Move it before merging.
- [ ] Mark TODO comments where a value is provisional. (Example: Pellets vs Pallets resolution lives next to `PRODUCT_NAV`.)

## Styling

- Tailwind v4 utilities first. CSS in component `styleUrl` files only for layout-specific rules that don't fit a utility.
- Global tokens live in `src/styles.css` `@theme` block.
- Custom utilities go in `src/styles.css` via `@utility name { ... }` directive (Tailwind v4 native). Defined so far: `container-content` (max-width 1060px + mx-auto + padding-inline 1rem), `section-min` (50vh min-height).
- Always `container-content` for page-width containers. Never inline `max-w-[1060px]`.
- Global focus-visible rule (`:is(a, button, input):focus-visible`) lives ONCE in `src/styles.css` — do not duplicate it inside component CSS files.

## Icon library

Icons go through `<app-icon name="..." />`, which wraps **lucide-angular**. To add a glyph:

1. Import the lucide icon by name in `src/app/shared/components/icon/icon.component.ts`.
2. Add it to the `IconName` union and the `ICON_MAP` record.
3. Use `<app-icon name="new-name" size="20" />` in templates.

Do not inline SVG `<path>` data. Do not import lucide directly from feature components — go through `<app-icon>` so swapping the library later is one file.

## Lessons learned (do not repeat)

1. **2026-06-09**: Tailwind v4 + Angular 19 silently emitted zero utility classes because `postcss.config.js` was used instead of `.postcssrc.json`. The build passed; the UI looked broken. Always verify utilities are in the emitted CSS after touching build setup.
2. **2026-06-09**: Codex bypassed the commit-msg hook with `--no-verify` to land a too-long body. Refactor prompts now explicitly forbid `--no-verify`.
3. **2026-06-09**: A `git add -A` swept the local `.design/` and `.claude/` directories into the scaffold commit. They now live in `.git/info/exclude` so this can't recur.
4. **2026-06-10**: Component-scoped CSS (`.hamburger { display: inline-flex }`) overrode the Tailwind utility `lg:hidden` because Angular adds an attribute selector to scoped rules, raising their specificity above the global utility. Fix is architectural: extract any element that needs responsive visibility into its own shared component and do not set host display in scoped CSS.
5. **2026-06-10**: Angular ESLint forbids `output()` names that match a standard DOM event (`toggle`, `close`, `click`, etc.). Use `toggled`, `closed`, etc., when emitting from shared components.
6. **2026-06-10**: New components landed without `OnPush` and without `viewChild()` signal API even though the conventions section said both were required. Convention text alone is not enough — every component PR review must run through the checklist above.
