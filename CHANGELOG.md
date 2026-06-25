# Changelog

All notable changes are documented in this file following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/).

Each PR should add a changeset via `npm run changeset`. On merge, the Release workflow consolidates entries into this file.

## [Unreleased]

### Removed

- Reset `src/components/` — removed `Button`, `Input`, and `Combobox` wrappers to rebuild the design system from scratch

### Added

- Three-layer architecture: `src/ui/`, `src/components/`, `preview/`
- Exported utility `cn` and design tokens `SizeType`, `VariantType`

## [0.1.0] - 2025-06-25

### Added

- Initial release — React component library built on shadcn/ui
- Publish via GitHub: `npm install github:<user>/self-component#main`

[Unreleased]: https://github.com/Norman-Tran/self-component/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Norman-Tran/self-component/releases/tag/v0.1.0
