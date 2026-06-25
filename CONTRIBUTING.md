# Đóng góp & quy trình Git

Repo dùng **3 tầng nhánh**: phát triển trên `feature/` hoặc `fix/`, tích hợp trên `dev`, release qua `main`. Không commit/push trực tiếp lên `main`.

## Mô hình nhánh

```text
main  ─────────────────────────────────────────► release (protected)
         ▲
         │ PR dev → main (khi sẵn sàng release)
         │
dev   ───┴────────────────────────────────────► tích hợp + changelog (protected)
         ▲              ▲
         │ PR           │ PR
feature/…              fix/…
(component mới)        (sửa lỗi)
```

| Nhánh           | Mục đích                                     | Tạo từ | Merge vào |
| --------------- | -------------------------------------------- | ------ | --------- |
| `main`          | Release ổn định, tag version                 | —      | —         |
| `dev`           | Tổng hợp commit nhỏ, gom changeset/changelog | `main` | `main`    |
| `feature/<tên>` | Component/API mới                            | `dev`  | `dev`     |
| `fix/<tên>`     | Sửa bug component đã có                      | `dev`  | `dev`     |

Ngoài lề: `docs/`, `chore/`, `refactor/` — cùng quy tắc PR vào `dev`.

## Luồng phát triển component mới

```bash
git checkout dev && git pull
git checkout -b feature/dialog

# ... implement, preview ...
npm run build
npm run changeset          # minor — component mới

git commit -m "feat(dialog): thêm component Dialog"
git push -u origin feature/dialog
# Mở PR: feature/dialog → dev
```

## Luồng sửa lỗi

```bash
git checkout dev && git pull
git checkout -b fix/combobox-keyboard

npm run build
npm run changeset          # patch — sửa bug

git commit -m "fix(combobox): sửa điều hướng keyboard"
git push -u origin fix/combobox-keyboard
# Mở PR: fix/combobox-keyboard → dev
```

## Luồng release (dev → main)

Khi `dev` đã ổn định và changelog (changesets) đã gom đủ:

```bash
git checkout dev && git pull
npm run build
npm run changeset:status:main   # đảm bảo mọi thay đổi đã có changeset

# Mở PR: dev → main
```

Sau merge vào `main`, workflow **Release** tự mở PR **Version Packages** (bump version + cập nhật `CHANGELOG.md`). Merge PR đó → tag `vX.Y.Z`.

Consumer cài:

```bash
npm install github:Norman-Tran/self-component#v0.2.0
```

## Bảo vệ nhánh trên GitHub (bật thủ công)

GitHub **không có** tùy chọn UI “chỉ merge từ nhánh X”. Repo dùng workflow **Branch policy** (`.github/workflows/branch-policy.yml`) để kiểm tra nguồn PR, kết hợp **Rulesets** chặn push trực tiếp.

**Trước tiên:** merge/push workflow setup lên `dev` hoặc `main` để Actions chạy được.

Mở repo: `https://github.com/Norman-Tran/self-component/settings/rules`

### Bước 1 — Ruleset cho `main`

1. **New ruleset** → **New branch ruleset**
2. **Ruleset name:** `protect-main`
3. **Enforcement status:** Active
4. **Bypass list:** để trống (hoặc chỉ admin nếu cần khẩn cấp)
5. **Target branches** → **Add target** → **Include by pattern:** `main`
6. Bật các rule:

| Rule                                      | Cấu hình                                    |
| ----------------------------------------- | ------------------------------------------- |
| **Restrict deletions**                    | Bật                                         |
| **Block force pushes**                    | Bật                                         |
| **Require a pull request before merging** | Bật                                         |
| ↳ Required approvals                      | `0` (solo repo) hoặc `1`                    |
| ↳ Dismiss stale reviews                   | Tùy                                         |
| **Require status checks to pass**         | Bật                                         |
| ↳ Status checks (sau lần CI đầu)          | `build`, `check-source-branch`, `changeset` |
| **Require branches to be up to date**     | Khuyến nghị bật                             |

7. **Create** / **Save**

**Kết quả:** PR vào `main` chỉ merge được nếu nguồn là `dev` (hoặc `changeset-release/main` từ bot release) — workflow `check-source-branch` sẽ fail nếu ai mở PR `feature/...` → `main`.

### Bước 2 — Ruleset cho `dev`

1. **New branch ruleset**
2. **Ruleset name:** `protect-dev`
3. **Enforcement status:** Active
4. **Target branches** → pattern: `dev`
5. Bật rule tương tự `main`:

| Rule                                      | Cấu hình                                    |
| ----------------------------------------- | ------------------------------------------- |
| **Restrict deletions**                    | Bật                                         |
| **Block force pushes**                    | Bật                                         |
| **Require a pull request before merging** | Bật                                         |
| **Require status checks to pass**         | Bật                                         |
| ↳ Status checks                           | `build`, `check-source-branch`, `changeset` |

6. **Save**

**Kết quả:** PR vào `dev` chỉ merge được từ `feature/*`, `fix/*`, `docs/*`, `chore/*`, `refactor/*`.

### Bước 3 — Chọn status checks (lần đầu)

Status check chỉ hiện trong dropdown **sau khi** workflow đã chạy ít nhất một lần:

1. Mở PR thử `feature/test → dev` (có thể đóng sau)
2. Vào tab **Checks** — đợi job `check-source-branch` (workflow **Branch policy**) chạy xong
3. Quay lại **Settings → Rules** → ruleset → thêm check `check-source-branch` vào **Require status checks**

Tương tự cho workflow **CI**: job `build`, `changeset`.

### Bước 4 — Kiểm tra

| Thử                     | Kỳ vọng                       |
| ----------------------- | ----------------------------- |
| PR `feature/x` → `dev`  | ✅ Merge được (khi CI pass)   |
| PR `fix/x` → `dev`      | ✅ Merge được                 |
| PR `random` → `dev`     | ❌ `check-source-branch` fail |
| PR `dev` → `main`       | ✅ Merge được                 |
| PR `feature/x` → `main` | ❌ `check-source-branch` fail |
| Push trực tiếp `main`   | ❌ Ruleset chặn               |

### Giao diện cũ (Branch protection rules)

Nếu repo chưa dùng Rulesets: **Settings → Branches → Add branch protection rule** — bật tương đương **Require a pull request**, **Require status checks**, **Do not allow bypassing**. Giới hạn nguồn PR vẫn cần workflow **Branch policy** như trên.

Hook Husky chặn commit/push trên `main` local — lớp phòng thủ thêm, không thay ruleset GitHub.

## Tên nhánh

| Prefix      | Khi dùng                    | Ví dụ                      |
| ----------- | --------------------------- | -------------------------- |
| `feature/`  | Component/API mới           | `feature/dialog-component` |
| `fix/`      | Sửa bug                     | `fix/combobox-keyboard`    |
| `docs/`     | README, CONTRIBUTING        | `docs/install-guide`       |
| `chore/`    | Tooling, deps, CI           | `chore/eslint-config`      |
| `refactor/` | Tái cấu trúc, không đổi API | `refactor/button-variants` |

Luôn tạo nhánh từ `dev`, không từ `main`.

## Commit message (Conventional Commits)

Format: `type(scope): mô tả ngắn`

```bash
feat(combobox): thêm hỗ trợ multiple select
fix(input): sửa label không hiện khi disabled
docs(readme): cập nhật hướng dẫn cài peer deps
chore(ci): thêm workflow build PR
```

Hook `commit-msg` (Commitlint) validate khi commit local.

## Changesets — changelog theo từng thay đổi

Tạo changeset trên nhánh `feature/` hoặc `fix/` **trước khi** merge vào `dev`:

```bash
npm run changeset
```

1. Chọn package `self-component`
2. **Semver bump**: `patch` (fix), `minor` (feature), `major` (breaking)
3. Mô tả chi tiết — gộp vào `CHANGELOG.md` khi release `main`

Ví dụ file `.changeset/add-dialog.md`:

```markdown
---
'self-component': minor
---

Thêm component Dialog với API controlled `open` / `onOpenChange`.
Cần peer dependency `@radix-ui/react-dialog`.
```

### Khi **không** cần changeset

- Chỉ sửa `preview/`, docs, CI, Cursor rules
- Refactor nội bộ không đổi export `src/index.ts`

### Kiểm tra local

```bash
# Trước PR vào dev (feature/fix)
npm run changeset:status

# Trước PR dev → main
npm run changeset:status:main
```

CI job `changeset` so với `origin/dev` (PR → dev) hoặc `origin/main` (PR → main).

## Pull Request

| Nguồn                    | Đích   | Khi                      |
| ------------------------ | ------ | ------------------------ |
| `feature/*`              | `dev`  | Component/API mới        |
| `fix/*`                  | `dev`  | Sửa lỗi                  |
| `dev`                    | `main` | Release                  |
| `changeset-release/main` | `main` | PR version tự động (bot) |

Template: `.github/pull_request_template.md`.

## Scripts liên quan

| Script                          | Mô tả                                             |
| ------------------------------- | ------------------------------------------------- |
| `npm run changeset`             | Tạo changeset mới                                 |
| `npm run changeset:status`      | Kiểm tra thiếu changeset so với `origin/dev`      |
| `npm run changeset:status:main` | Kiểm tra trước PR `dev` → `main`                  |
| `npm run version`               | Bump version + changelog (CI Release trên `main`) |

## Trước khi mở PR

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

Xem thêm checklist component trong `.cursor/rules/06-development-workflow.mdc`.
