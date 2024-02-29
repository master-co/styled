# Contributing to Monorepo
```bash
pnpm install
```

Run `pnpm build` in the project root to build all packages:
```bash
pnpm build
```
Split a new terminal and switch to the target directory for testing to avoid running tests from other packages:
```bash
cd packages/css
```

## Testing
```bash
pnpm test -- --watch
```

Commit your tests ( and create a Pull Request ):
```bash
Add @1aron tests
```

## Linting
Follow the [Techor ESLint Preset](https://github.com/techor-dev/techor/tree/main/packages/eslint-config)
```bash
pnpm lint
```

To automatically fix any violations in your code:
```
pnpm lint -- --fix
```

## Type Checking
```bash
pnpm type-check
```

## Commit Checking
Follow the [Techor Conventional Commits](https://github.com/techor-dev/techor/tree/main/packages/conventional-commits)
```bash
pnpm commit-check
```

## Checking
You have to pass `pnpm check` before submitting a pull request.
```bash
pnpm check
```
The command includes all of the following checks:

## Building
```
pnpm build
```
