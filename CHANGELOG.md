# Changelog

Tất cả thay đổi đáng chú ý được ghi theo [Keep a Changelog](https://keepachangelog.com/vi/1.1.0/) và [Semantic Versioning](https://semver.org/lang/vi/).

Mỗi PR thêm changeset qua `npm run changeset`. Khi merge, workflow Release gộp vào file này.

## [Unreleased]

### Added

- Kiến trúc 3 lớp: `src/ui/`, `src/components/`, `preview/`
- Component public: `Button`, `Input`, `Combobox`
- Export utility `cn` và design tokens `SizeType`, `VariantType`

## [0.1.0] - 2025-06-25

### Added

- Initial release — thư viện component React trên shadcn/ui
- Publish qua GitHub: `npm install github:<user>/self-component#main`

[Unreleased]: https://github.com/Norman-Tran/self-component/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Norman-Tran/self-component/releases/tag/v0.1.0
