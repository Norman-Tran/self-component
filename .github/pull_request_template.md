## Mục tiêu PR

<!-- Chọn một -->

- [ ] `feature/*` → `dev` — component/API mới
- [ ] `fix/*` → `dev` — sửa lỗi
- [ ] `dev` → `main` — release
- [ ] Khác (mô tả bên dưới)

## Mô tả

<!-- Thay đổi gì và tại sao -->

## Loại thay đổi

- [ ] `feat` — component/API mới
- [ ] `fix` — sửa bug
- [ ] `docs` — README, CONTRIBUTING
- [ ] `refactor` — tái cấu trúc, không đổi API
- [ ] `chore` — tooling, CI, deps

## Changeset

- [ ] Đã chạy `npm run changeset` (bắt buộc nếu thay đổi `src/` — PR vào `dev`)
- [ ] Đã chạy `npm run changeset:status:main` (PR `dev` → `main`)
- [ ] Không cần changeset (chỉ docs/CI, không ảnh hưởng consumer)

## Checklist

- [ ] `npm run build` pass
- [ ] `npm run format:check` pass
- [ ] Cập nhật `preview/App.tsx` nếu thêm/sửa API public
- [ ] Cập nhật `README.md` nếu đổi cách cài hoặc export

## Ghi chú cho consumer

<!-- Breaking change? Migration? Peer dep mới? Để trống nếu không áp dụng -->
