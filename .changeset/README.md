# Changesets

When a change affects consumers, create a changeset on a `feature/` or `fix/` branch **before** opening a PR into `dev`:

```bash
npm run changeset
```

Choose `patch` / `minor` / `major` and write a detailed summary. Changesets accumulate on `dev` until a `dev` → `main` PR and the Release workflow merge the changelog.

For docs-only or internal changes with no consumer impact:

```bash
npm run changeset:empty
```
