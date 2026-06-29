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

1. Đọc `.cursor/rules/08-shadcn-patterns.mdc` + skill `shadcn-component-patterns`
2. `npm run ui:add -- <name>` → primitive vào `src/ui/` (nếu cần)
3. Wrapper `src/components/<name>/` hoặc `<name>.tsx`
4. Doc page `preview/pages/components/<Name>Page.tsx` + `navigation.ts`
5. Export `src/index.ts` + `npm run changeset`
6. `npm run build`

## Skills Cursor hữu ích

| Skill                       | Khi dùng                                 |
| --------------------------- | ---------------------------------------- |
| `component-scaffold`        | Thêm component public end-to-end         |
| `shadcn-component-patterns` | CVA, compound components, shadcn anatomy |
| `create-rule`               | Thêm/sửa `.cursor/rules/`                |
| `review-bugbot`             | Review diff trước merge                  |

## Scripts

- `npm run dev` — preview
- `npm run build` — build library → `dist/`
- `npm run ui:add -- <name>` — shadcn CLI
- `npm run changeset` — tạo changeset (trước PR ảnh hưởng consumer)

## Git

`feature/` / `fix/` → PR `dev` → PR `main`. Không push `main`. Chi tiết: `CONTRIBUTING.md`.

## Không làm

- Không tạo v1/v2 song song
- Không export `src/ui/` từ `index.ts`
- Không thêm business logic vào `src/ui/`
- Không commit `dist/` nếu dùng build trên CI (tùy chiến lược publish)

## Rules chi tiết

Xem `.cursor/rules/*.mdc` — mỗi file một concern.
