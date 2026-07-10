# self-component — Agent Guide

Thư viện React component cá nhân trên shadcn/ui. Đọc file này trước khi sửa code.

## Kiến trúc 3 lớp

```
src/ui/          → Primitives (shadcn/Radix). Nội bộ, không export trực tiếp.
src/components/  → Design system. API public, controlled props, *Field (RHF), variants.
src/index.ts     → Barrel export duy nhất ra ngoài.
preview/         → Doc app: pages/components + components/doc shell (TOC, Preview/Code).
```

## Quy trình thêm component

1. Đọc `03-design-system-components.mdc`, `08-shadcn-patterns.mdc`, `09-preview-component-docs.mdc`
2. Skill `component-scaffold` + `shadcn-component-patterns`
3. `npm run ui:add -- <name>` → primitive vào `src/ui/` (nếu cần)
4. Wrapper `src/components/<name>/` — form: forwardRef, controlled, optional `*-field.tsx`
5. Doc page: `DocSection` (`id`, `code`) + `PropsTable` — mẫu `ComboboxPage.tsx`
6. Export `src/index.ts` + `npm run changeset`
7. `npm run check`

## Skills Cursor hữu ích

| Skill                       | Khi dùng                                 |
| --------------------------- | ---------------------------------------- |
| `component-scaffold`        | Thêm component public end-to-end         |
| `shadcn-component-patterns` | CVA, compound components, shadcn anatomy |
| `create-rule`               | Thêm/sửa `.cursor/rules/`                |
| `review-bugbot`             | Review diff trước merge                  |

## Scripts

- `npm run check` — typecheck + build + format (trước PR)
- `npm run dev` — preview
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
