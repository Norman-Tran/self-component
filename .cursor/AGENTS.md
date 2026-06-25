# self-component — Agent Guide

Thư viện React component cá nhân trên shadcn/ui. Đọc file này trước khi sửa code.

## Kiến trúc 3 lớp

```
src/ui/          → Primitives (shadcn/Radix). Nội bộ, không export trực tiếp.
src/components/  → Design system. API public, controlled props, label/error.
src/index.ts     → Barrel export duy nhất ra ngoài.
preview/         → Demo app, không publish.
```

## Quy trình thêm component

1. `npm run ui:add -- <name>` → thêm primitive vào `src/ui/`
2. Tạo wrapper `src/components/<name>.tsx`
3. Export trong `src/index.ts`
4. Demo trong `preview/App.tsx`
5. `npm run build` verify types

## Skills Cursor hữu ích

| Skill | Khi dùng |
| --- | --- |
| `create-rule` | Thêm/sửa quy tắc trong `.cursor/rules/` |
| `create-skill` | Tạo skill workflow riêng cho repo |
| `review-bugbot` | Review diff trước khi merge |
| `review-security` | Review bảo mật khi có form/auth |

## Scripts

- `npm run dev` — preview
- `npm run build` — build library → `dist/`
- `npm run ui:add -- <name>` — shadcn CLI

## Không làm

- Không tạo v1/v2 song song
- Không export `src/ui/` từ `index.ts`
- Không thêm business logic vào `src/ui/`
- Không commit `dist/` nếu dùng build trên CI (tùy chiến lược publish)

## Rules chi tiết

Xem `.cursor/rules/*.mdc` — mỗi file một concern.
