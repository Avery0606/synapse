# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-05-01

### Changed
- **Skills handling reverted**: Skills are no longer bundled inside the npm package.
- Skills installation now uses the original `npm run setup-skills` command (consistent with pre-0.1.0 behavior).
- Removed `bin` field (`synapse-setup-skills`) from package.json.
- Removed `skills` directory from the published package files.
- Updated documentation to reflect the new (original) installation flow.

### Removed
- `npx synapse-setup-skills` command (no longer provided).

### Notes
- This version restores the original project structure and user experience.
- 0.1.0 was an experimental release that included skills in the npm package.

## [0.1.0] - 2026-05-01

### Added
- Initial release of `synapse-code-team` on npm.
- Core plugin with Synapse, Oracle, Ares, and Inspector agents.
- Custom commands: `/deep-init`, `/plan`, `/plan-atomic`, `/plan-socratic`, `/plan-clarify`, `/self-improving`, `/apply-skill`.
- Multiple built-in skills (agents-md-creator, test-case-generator, skill-refiner, act-like-socratic).
- TypeScript build system with `dist/` output.
- Local `npm run setup-skills` support.

### Notes
- First published version (experimental structure with skills bundled).
