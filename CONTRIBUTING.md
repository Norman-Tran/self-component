# Contributing & Git Workflow

This repo uses a **3-tier branch model**: develop on `feature/` or `fix/`, integrate on `dev`, release through `main`. Do not commit or push directly to `main`.

## Branch model

```text
main  ─────────────────────────────────────────► release (protected)
         ▲
         │ PR dev → main (when ready to release)
         │
dev   ───┴────────────────────────────────────► integration + changelog (protected)
         ▲              ▲
         │ PR           │ PR
feature/…              fix/…
(new components)       (bug fixes)
```

| Branch           | Purpose                                     | Branch from | Merge into |
| ---------------- | ------------------------------------------- | ----------- | ---------- |
| `main`           | Stable release, version tags                | —           | —          |
| `dev`            | Aggregate small commits, collect changesets | `main`      | `main`     |
| `feature/<name>` | New component/API                           | `dev`       | `dev`      |
| `fix/<name>`     | Bug fixes for existing components           | `dev`       | `dev`      |

Side branches: `docs/`, `chore/`, `refactor/` — same PR rules into `dev`.

## New component workflow

```bash
git checkout dev && git pull
git checkout -b feature/dialog

# ... implement, preview ...
npm run build
npm run changeset          # minor — new component

git commit -m "feat(dialog): add Dialog component"
git push -u origin feature/dialog
# Open PR: feature/dialog → dev
```

## Bug fix workflow

```bash
git checkout dev && git pull
git checkout -b fix/combobox-keyboard

npm run build
npm run changeset          # patch — bug fix

git commit -m "fix(combobox): fix keyboard navigation"
git push -u origin fix/combobox-keyboard
# Open PR: fix/combobox-keyboard → dev
```

## Release workflow (dev → main)

When `dev` is stable and changesets are ready:

```bash
git checkout dev && git pull
npm run build
npm run changeset:status:main   # ensure all changes have changesets

# Open PR: dev → main
```

After merging into `main`, the **Release** workflow opens a **Version Packages** PR (version bump + `CHANGELOG.md` update). Merge that PR → tag `vX.Y.Z`.

Consumers install:

```bash
npm install github:Norman-Tran/self-component#v0.2.0
```

## GitHub branch protection (manual setup)

GitHub has **no** UI option for “merge only from branch X”. This repo uses the **Branch policy** workflow (`.github/workflows/branch-policy.yml`) to validate PR sources, combined with **Rulesets** to block direct pushes.

**Prerequisite:** merge/push the workflow setup to `dev` or `main` so Actions can run.

Open: `https://github.com/Norman-Tran/self-component/settings/rules`

### Step 1 — Ruleset for `main`

1. **New ruleset** → **New branch ruleset**
2. **Ruleset name:** `protect-main`
3. **Enforcement status:** Active
4. **Bypass list:** leave empty (or admin only for emergencies)
5. **Target branches** → **Add target** → **Include by pattern:** `main`
6. Enable rules:

| Rule                                      | Configuration                               |
| ----------------------------------------- | ------------------------------------------- |
| **Restrict deletions**                    | Enable                                      |
| **Block force pushes**                    | Enable                                      |
| **Require a pull request before merging** | Enable                                      |
| ↳ Required approvals                      | `0` (solo repo) or `1`                      |
| ↳ Dismiss stale reviews                   | Optional                                    |
| **Require status checks to pass**         | Enable                                      |
| ↳ Status checks (after first CI run)      | `build`, `check-source-branch`, `changeset` |
| **Require branches to be up to date**     | Recommended                                 |

7. **Create** / **Save**

**Result:** PRs into `main` merge only when the source is `dev` (or `changeset-release/main` from the release bot). The `check-source-branch` job fails if someone opens `feature/...` → `main`.

### Step 2 — Ruleset for `dev`

1. **New branch ruleset**
2. **Ruleset name:** `protect-dev`
3. **Enforcement status:** Active
4. **Target branches** → pattern: `dev`
5. Enable rules similar to `main`:

| Rule                                      | Configuration                               |
| ----------------------------------------- | ------------------------------------------- |
| **Restrict deletions**                    | Enable                                      |
| **Block force pushes**                    | Enable                                      |
| **Require a pull request before merging** | Enable                                      |
| **Require status checks to pass**         | Enable                                      |
| ↳ Status checks                           | `build`, `check-source-branch`, `changeset` |

6. **Save**

**Result:** PRs into `dev` merge only from `feature/*`, `fix/*`, `docs/*`, `chore/*`, `refactor/*`.

### Step 3 — Select status checks (first time)

Status checks appear in the dropdown **only after** a workflow has run at least once:

1. Open a test PR `feature/test → dev` (can close afterward)
2. Go to the **Checks** tab — wait for `check-source-branch` (**Branch policy** workflow) to finish
3. Return to **Settings → Rules** → ruleset → add `check-source-branch` under **Require status checks**

Same for the **CI** workflow: jobs `build`, `changeset`.

### Step 4 — Verify

| Test                    | Expected                      |
| ----------------------- | ----------------------------- |
| PR `feature/x` → `dev`  | ✅ Merge allowed (CI passes)  |
| PR `fix/x` → `dev`      | ✅ Merge allowed              |
| PR `random` → `dev`     | ❌ `check-source-branch` fail |
| PR `dev` → `main`       | ✅ Merge allowed              |
| PR `feature/x` → `main` | ❌ `check-source-branch` fail |
| Direct push to `main`   | ❌ Ruleset blocks             |

### Legacy UI (branch protection rules)

If the repo does not use Rulesets: **Settings → Branches → Add branch protection rule** — enable **Require a pull request**, **Require status checks**, **Do not allow bypassing**. Source-branch restrictions still require the **Branch policy** workflow above.

Husky blocks local commits/pushes to `main` — an extra safeguard, not a replacement for GitHub rulesets.

## Branch naming

| Prefix      | When to use                | Example                    |
| ----------- | -------------------------- | -------------------------- |
| `feature/`  | New component/API          | `feature/dialog-component` |
| `fix/`      | Bug fix                    | `fix/combobox-keyboard`    |
| `docs/`     | README, CONTRIBUTING       | `docs/install-guide`       |
| `chore/`    | Tooling, deps, CI          | `chore/eslint-config`      |
| `refactor/` | Restructure, no API change | `refactor/button-variants` |

Always branch from `dev`, not `main`.

## Commit messages (Conventional Commits)

Format: `type(scope): short description`

```bash
feat(combobox): add multiple select support
fix(input): fix label not showing when disabled
docs(readme): update peer deps install guide
chore(ci): add PR build workflow
```

The `commit-msg` hook (Commitlint) validates commits locally.

## Changesets — per-change changelog

Create a changeset on `feature/` or `fix/` **before** merging into `dev`:

```bash
npm run changeset
```

1. Select package `self-component`
2. **Semver bump:** `patch` (fix), `minor` (feature), `major` (breaking)
3. Write a detailed description — merged into `CHANGELOG.md` on `main` release

Example `.changeset/add-dialog.md`:

```markdown
---
'self-component': minor
---

Add Dialog component with controlled `open` / `onOpenChange` API.
Requires peer dependency `@radix-ui/react-dialog`.
```

### When a changeset is **not** required

- Changes only in `preview/`, docs, CI, Cursor rules
- Internal refactor without changing `src/index.ts` exports

### Local checks

```bash
# Before PR into dev (feature/fix)
npm run changeset:status

# Before PR dev → main
npm run changeset:status:main
```

The CI `changeset` job compares against `origin/dev` (PR → dev) or `origin/main` (PR → main).

## Pull requests

| Source                   | Target | When                 |
| ------------------------ | ------ | -------------------- |
| `feature/*`              | `dev`  | New component/API    |
| `fix/*`                  | `dev`  | Bug fix              |
| `dev`                    | `main` | Release              |
| `changeset-release/main` | `main` | Automated version PR |

Template: `.github/pull_request_template.md`.

## Related scripts

| Script                          | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| `npm run changeset`             | Create a new changeset                          |
| `npm run changeset:status`      | Check missing changesets vs `origin/dev`        |
| `npm run changeset:status:main` | Check before PR `dev` → `main`                  |
| `npm run version`               | Bump version + changelog (CI Release on `main`) |

## Before opening a PR

**PR `feature/` / `fix/` → `dev`:**

```bash
npm run build
npm run format:check
npm run changeset:status
```

**PR `dev` → `main`:**

```bash
npm run build
npm run format:check
npm run changeset:status:main
```

See the component checklist in `.cursor/rules/06-development-workflow.mdc`.
