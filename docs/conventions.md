# Conventions - OFC website

Internal conventions to keep this codebase consistent. Read this before adding new code.

## Build & tooling

### PostCSS + Tailwind v4

The Angular esbuild builder (`@angular/build`) **only picks up `.postcssrc.json`**. Do not switch to `postcss.config.js` - Angular silently ignores it and Tailwind utilities will not be emitted (the UI looks unstyled, but the build still passes).

`.postcssrc.json` at repo root:

```json
{ "plugins": { "@tailwindcss/postcss": {} } }
```

After any CSS/build setup change, verify Tailwind actually compiled by checking emitted utilities:

```bash
npm run build
grep -oE "\.(bg-primary|flex|hidden|text-white)\b" dist/ofc-index/browser/styles-*.css | sort -u
```

Expected: at least `.bg-primary`, `.flex`, `.hidden`, `.text-white` print. If empty, the wiring is broken - Tailwind compiler did not run.

### Commits

- Format: `type(scope): subject` (conventional commits).
- Header ≤ 100 chars, body lines ≤ 100 chars (commitlint enforces this).
- **Never** `git commit --no-verify`. If the hook rejects the message, fix the message.
- Husky pre-commit runs lint-staged (prettier on staged files). Husky commit-msg runs commitlint.

### Local-only files

The `.design/` and `.claude/` directories must NOT be tracked. Add them to `.git/info/exclude` (per-clone, not committed) - never to `.gitignore`, because `.gitignore` is public and would leak their existence.

## Branch flow & CI/CD

```
feature/* ──PR──▶ develop ──PR──▶ main
                  (staging)       (production)
```

One pipeline (`.github/workflows/pipeline.yml`), three stages - later stages only run when
earlier ones pass:

| Stage     | Trigger                       | What it does                                                        |
| --------- | ----------------------------- | ------------------------------------------------------------------- |
| `quality` | PR + push to `main`/`develop` | `npm ci`, lint, typecheck, unit tests (headless Chrome), full build |
| `image`   | push to `main`/`develop` only | Builds the Dockerfile, pushes `ghcr.io/thongnh268/ofc-index`        |
| `deploy`  | push, and only when enabled   | SSH to the VPS, pull the branch image, restart the container        |

Image tags: branch name (`main`, `develop`), commit SHA, and `latest` (main only).

### Enabling deploy

Deploy is off by default (VPS/domain not ready yet). To enable:

1. Repository variable `DEPLOY_ENABLED` = `true`.
2. Secrets: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY` (private key of a deploy user that can run
   docker), and `VPS_PORT` if sshd listens on a non-default port (defaults to 22).
3. Optional: protect the `production` / `staging` GitHub environments with required reviewers.

CI authenticates with a **per-app SSH key**, never a password:

```bash
ssh-keygen -t ed25519 -f ofc-index-deploy -C "ci-deploy-ofc-index" -N ''
ssh -p <PORT> deploy@<HOST> \
  "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys" \
  < ofc-index-deploy.pub
```

The private key goes into `VPS_SSH_KEY`. Each app gets its own key with its own comment, so
revoking one app is a single line: `sed -i '/ci-deploy-ofc-index/d' ~/.ssh/authorized_keys`.
Once keys work, disable password login (`PasswordAuthentication no` in `/etc/ssh/sshd_config`).

Containers on the VPS: `ofc-index-main` on `127.0.0.1:4000`, `ofc-index-develop` on `127.0.0.1:4001`.

### VPS layout (Docker + Nginx + cloudflared)

The container serves both locales itself (`tools/serve-ssr.mjs`: `/` → `/vi/`, `/en/`).
Nginx only reverse-proxies a domain to a port:

```nginx
server {
  server_name ofc.example.com;          # production
  location / { proxy_pass http://127.0.0.1:4000; }
}
server {
  server_name staging.ofc.example.com;  # staging
  location / { proxy_pass http://127.0.0.1:4001; }
}
```

Public ingress goes through a cloudflared tunnel pointing at Nginx; no ports are exposed publicly.

### Running the image locally

```bash
docker build -t ofc-index .
docker run --rm -p 4000:4000 ofc-index
# http://localhost:4000 → redirects to /vi/
```

## Code organization

```
src/app/
  core/data/        # single source of truth for company facts + navigation
    company.ts      # OFC_COMPANY (brand, legal name, offices, contact, socials)
    navigation.ts   # SECONDARY_NAV, MAIN_NAV, ABOUT_NAV, PRODUCT_NAV, INTRODUCTION_NAV
    index.ts        # barrel
  core/sanity/        # SanityService (GROQ over HttpClient), SANITY_CONFIG, queries, types
  shared/components/  # atomic reusable UI - standalone components, OnPush
    icon/             # <app-icon name="..." size="..." /> - @ng-icons (Tabler) wrapper
    brand/            # <app-brand imageHeightClass="..." /> - logo + home link
    footer-column/    # <app-footer-column heading="..."> <ng-content /> </>
    social-row/       # <app-social-row [links]="..." variant="header|footer" />
    subscription-form/ # <app-subscription-form inputId="..." (submitted)="..." />
    hamburger/        # <app-hamburger [active]="..." (toggled)="..." />
    mobile-drawer/    # <app-mobile-drawer [open]="..." (closed)="..."> <ng-content /> </>
    tabs/             # <app-tab-group groupId="..."> <app-tab label="..."> - APG tablist
    accordion/        # <app-accordion accordionId="..." [multi]> <app-accordion-item heading="...">
    dialog/           # <app-dialog [open] (closed) heading="..."> - centered modal, CDK focus trap
    pagination/       # <app-pagination [totalPages] [currentPage] (pageChanged) />
  shared/directives/  # style carriers on native elements (see below)
  layout/             # Header + Footer + LayoutComponent shell. No data, no SVG paths.
  pages/              # feature pages (grow in Sprint 2)
sanity/               # Sanity Studio (own package.json - not part of the Angular build)
```

### Style carriers vs behavioral primitives

Two kinds of shared UI primitives - pick deliberately:

- **Style carrier = directive on a native element** (`shared/directives/`): `button[appButton]`,
  `input|textarea|select[appField]`, `[appBadge]`, `[appCard]`. The directive only sets classes;
  visuals live ONCE in `src/styles.css` under `@layer components`. Native semantics, forms,
  `routerLink` and mobile keyboards keep working - never wrap a native control in a component
  just to style it.
- **Behavioral primitive = component** (`shared/components/`): tabs, accordion, dialog,
  pagination - anything owning state, keyboard handling or ARIA wiring.
- Components that need element ids for ARIA take an `*Id` input prefix (`groupId`, `accordionId`,
  `dialogId`) and derive ids per index - never module-level counters (they drift between server
  and client and break hydration).
- Angular CDK is allowed for hard a11y only (`cdkTrapFocus` in app-dialog). Do not pull in CDK
  overlay/menus while a native element (`<select>`) or a small hand-rolled pattern suffices.

## Component checklist (every new .component.ts must pass all)

Author every component (page, layout, or shared primitive) against this list. CI does not enforce all of these - discipline does.

### Required
- [ ] `standalone: true` - no NgModules anywhere in this project.
- [ ] `changeDetection: ChangeDetectionStrategy.OnPush` - without exception.
- [ ] Inputs via `input<T>(default)` or `input.required<T>()` - never the `@Input` decorator.
- [ ] Outputs via `output<T>()` - never the `@Output` decorator with `EventEmitter`.
- [ ] Outputs MUST NOT collide with DOM event names: use `toggled` not `toggle`, `closed` not `close`, `pressed` not `click`, etc. (`@angular-eslint/no-output-native` enforces this.)
- [ ] Template element refs via `viewChild()` / `viewChildren()` signal API - never the `@ViewChild` / `@ViewChildren` decorator.
- [ ] Type-only imports use `import type { ... }`.
- [ ] Selector prefix `app-`, kebab-case (`@angular-eslint/component-selector` enforces this).
- [ ] Component class name is `PascalCase` and ends in `Component`.
- [ ] Inline template is fine when ≤ 25 lines or when no other styling is needed; otherwise use `templateUrl` + `styleUrl` siblings.
- [ ] No `Subject` / `BehaviorSubject` / `ReplaySubject` for UI state. Use `signal()` + `computed()`.
- [ ] All RxJS subscriptions in components use `takeUntilDestroyed()` - no manual `unsubscribe`.

### Inputs / outputs
- [ ] Required inputs use `input.required<T>()` so callers cannot omit them.
- [ ] Optional inputs declare a `T` and a sensible default (`input<string>('')` etc.).
- [ ] Use `readonly` on every public field. Make implementation detail fields `protected readonly` so the template can still read them.

### Templates
- [ ] Loops track by a unique stable key (`@for (item of items; track item.route)`) - never `track $index` for routable lists.
- [ ] `[attr.aria-*]` for ARIA attributes, not `[attr.aria-label]="' ' + value"` string-concat tricks (use binding to a computed/string field).
- [ ] No inline SVG path data. Use `<app-icon name="..." />` (which wraps lucide-angular) so changing the icon library is one file.
- [ ] No hard-coded company strings (`+84 ...`, `cco@binhminhhp.com`, etc.). Bind to `company.*` from `core/data`.
- [ ] No hard-coded route slugs (`/about/board`). Bind to `*_NAV` arrays from `core/data/navigation`.

### Component-scoped CSS
- [ ] Do not set `display:*` on `:host` if a parent Tailwind utility (`hidden`, `lg:hidden`, `flex`, etc.) needs to control host visibility. Scoped attribute selectors raise specificity above global utilities and the utility silently loses.
- [ ] Each shared primitive owns the styles for the markup it ships. Do not put `.contact-row` styles in `header.component.css` if `<app-contact-row>` exists.
- [ ] Use `ViewEncapsulation.None` only when the component projects `<ng-content>` and must style projected anchors/paragraphs (currently `app-footer-column`). Comment the choice in the `@Component` block.
- [ ] In a `ViewEncapsulation.None` component, NEVER use a bare element selector (`a`, `p`, `svg`, `button`) - its rules are global with natural specificity and will match elements of OTHER components projected via `<ng-content>`. Always qualify with structural context the projected children don't share (`.footer-column nav a`, not `.footer-column a`). A reusable primitive (e.g. `app-social-row`) must own its full visual state and never depend on, or be overridden by, a container's cascade.
- [ ] No `::ng-deep`.

### Data layer
- [ ] Anything that appears in more than one place - strings, links, lists - goes in `src/app/core/data/`. Components import from the barrel `core/data`.
- [ ] Hardcode tells you the value belongs in `core/data/`. Move it before merging.
- [ ] Mark TODO comments where a value is provisional. (Example: Pellets vs Pallets resolution lives next to `PRODUCT_NAV`.)

## Styling

- Tailwind v4 utilities first. CSS in component `styleUrl` files only for layout-specific rules that don't fit a utility.
- Global tokens live in `src/styles.css` `@theme` block.
- Custom utilities go in `src/styles.css` via `@utility name { ... }` directive (Tailwind v4 native). Defined so far: `container-content` (max-width 1060px + mx-auto + padding-inline 1rem), `section-min` (50vh min-height).
- Always `container-content` for page-width containers. Never inline `max-w-[1060px]`.
- Global focus-visible rule (`:is(a, button, input):focus-visible`) lives ONCE in `src/styles.css` - do not duplicate it inside component CSS files.

## Icon library

Icons go through `<app-icon name="..." />`, which wraps **@ng-icons** (Tabler set, fill weight). To add a glyph:

1. Import the tabler icon in `src/app/shared/components/icon/icon.component.ts`.
2. Add one entry to the `ICONS` map (camelCase key) - `IconName` and the registry derive from it.
3. Use `<app-icon name="newName" size="20" />` in templates.

Do not inline SVG `<path>` data. Do not import the icon library directly from feature components - go through `<app-icon>` so swapping the library later is one file.

## Lessons learned (do not repeat)

1. **2026-06-09**: Tailwind v4 + Angular 19 silently emitted zero utility classes because `postcss.config.js` was used instead of `.postcssrc.json`. The build passed; the UI looked broken. Always verify utilities are in the emitted CSS after touching build setup.
2. **2026-06-09**: Codex bypassed the commit-msg hook with `--no-verify` to land a too-long body. Refactor prompts now explicitly forbid `--no-verify`.
3. **2026-06-09**: A `git add -A` swept the local `.design/` and `.claude/` directories into the scaffold commit. They now live in `.git/info/exclude` so this can't recur.
4. **2026-06-10**: Component-scoped CSS (`.hamburger { display: inline-flex }`) overrode the Tailwind utility `lg:hidden` because Angular adds an attribute selector to scoped rules, raising their specificity above the global utility. Fix is architectural: extract any element that needs responsive visibility into its own shared component and do not set host display in scoped CSS.
5. **2026-06-10**: Angular ESLint forbids `output()` names that match a standard DOM event (`toggle`, `close`, `click`, etc.). Use `toggled`, `closed`, etc., when emitting from shared components.
6. **2026-06-10**: New components landed without `OnPush` and without `viewChild()` signal API even though the conventions section said both were required. Convention text alone is not enough - every component PR review must run through the checklist above.
7. **2026-06-11**: `ng extract-i18n` only extracts from components reachable from the app -
   a shared component with no consumer is tree-shaken and its `i18n` strings silently skipped.
   Because `i18nMissingTranslation: error`, the build then fails LATER, when Sprint-2 first
   imports the component. Rule: when adding i18n strings to a not-yet-consumed shared component,
   add the `<trans-unit>` to `src/locale/messages.vi.xlf` by hand in the same commit (extra
   translations are harmless; missing ones break the build).
8. **2026-06-11**: Two components in one file where the parent queries the child
   (`contentChildren(Child)`) hit a TDZ crash - the compiled query lives in a static initializer
   that runs at class-definition time. Declare the CHILD first; the child may reference the
   parent only lazily (`inject(forwardRef(() => Parent))`).
9. **2026-06-10**: Social icons turned white-on-white ("trắng tinh") on hover. Root cause: `app-footer-column` uses `ViewEncapsulation.None` with a bare global rule `.footer-column a:hover { color: white }` (specificity 0,2,1). `app-social-row` is projected into the footer column, so its `<a class="social-button">` matched that global rule and the navy icon turned white on hover. The base `.social-button` color survived (scoped, 0,2,0) but lost on `:hover`. Fix is architectural, at the source of the leak: scope the footer-column rule to `.footer-column nav a` so it only targets the nav links it ships, never anchors of projected child components. Audit confirmed `footer-column` is the ONLY `ViewEncapsulation.None` component - every other component is Emulated, so its `:hover` rules carry `[_ngcontent]` and cannot leak across component boundaries.
