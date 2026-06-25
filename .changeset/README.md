# Changesets

Khi thay đổi code ảnh hưởng consumer, tạo changeset trên nhánh `feature/` hoặc `fix/` (trước khi PR vào `dev`):

```bash
npm run changeset
```

Chọn `patch` / `minor` / `major` và mô tả chi tiết. Changeset tích lũy trên `dev` cho đến khi PR `dev` → `main` và workflow Release gộp changelog.
