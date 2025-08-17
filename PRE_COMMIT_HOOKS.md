# Pre-commit Hooks Setup

This project uses pre-commit hooks to ensure code quality and consistency before each commit. The hooks run automatically when you commit changes and will prevent the commit if any checks fail.

## What the Pre-commit Hooks Do

The pre-commit hooks perform the following checks in order:

1. **Code Formatting and Linting** (via lint-staged)
   - Runs ESLint with auto-fix on staged files
   - Runs Prettier to format staged files
   - Applies to: `.js`, `.jsx`, `.ts`, `.tsx`, `.json`, `.md`, `.yml`, `.yaml` files

2. **TypeScript Type Checking**
   - Runs `tsc --noEmit` to check for TypeScript errors
   - Ensures all types are correct without generating output files

3. **Build Verification**
   - Runs `next build` to ensure the project builds successfully
   - Catches any build-time errors or issues

## Setup

The pre-commit hooks are already set up and will work automatically. Here's what was installed:

### Root Level (Project Root)
- `husky`: Git hooks manager
- Root `package.json` with scripts to run frontend checks

### Frontend Level (`frontend/` directory)
- `eslint`: JavaScript/TypeScript linting
- `prettier`: Code formatting
- `eslint-config-prettier`: Prevents conflicts between ESLint and Prettier
- `eslint-plugin-prettier`: Runs Prettier as an ESLint rule
- `lint-staged`: Runs linters on staged files only

## Configuration Files

### ESLint Configuration (`.eslintrc.json`)
```json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "comma-dangle": ["error", "always-multiline"],
    "semi": ["error", "always"],
    "object-curly-spacing": ["error", "always"]
  }
}
```

### Prettier Configuration (`.prettierrc`)
```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### Prettier Ignore (`.prettierignore`)
Excludes build artifacts, dependencies, and other files that shouldn't be formatted.

### Lint-staged Configuration (in `package.json`)
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  }
}
```

## Available Scripts

### Root Level Scripts
- `npm run pre-commit`: Runs lint-staged on frontend
- `npm run type-check`: Runs TypeScript type checking
- `npm run build`: Runs Next.js build
- `npm run lint`: Runs ESLint on frontend
- `npm run format`: Runs Prettier on frontend

### Frontend Level Scripts
- `pnpm run lint`: Runs ESLint
- `pnpm run lint:fix`: Runs ESLint with auto-fix
- `pnpm run format`: Formats all files with Prettier
- `pnpm run format:check`: Checks if files are formatted correctly
- `pnpm run type-check`: Runs TypeScript type checking
- `pnpm run build`: Builds the Next.js application

## How It Works

1. When you run `git commit`, the pre-commit hook automatically triggers
2. The hook runs lint-staged, which:
   - Formats and lints only the files you've staged for commit
   - Automatically fixes formatting issues
   - Stashes any changes made by the formatters
3. TypeScript type checking runs on the entire project
4. A full build is performed to catch any build issues
5. If all checks pass, the commit proceeds
6. If any check fails, the commit is aborted and you'll see error messages

## Troubleshooting

### If Pre-commit Hooks Fail

1. **Formatting Issues**: Run `cd frontend && pnpm run format` to fix formatting
2. **Linting Issues**: Run `cd frontend && pnpm run lint:fix` to auto-fix linting issues
3. **Type Errors**: Fix TypeScript errors in your code
4. **Build Errors**: Fix any build-time errors before committing

### Manual Checks

You can run the checks manually to see what would happen:

```bash
# From the root directory
npm run pre-commit
npm run type-check
npm run build

# Or from the frontend directory
cd frontend
pnpm run lint
pnpm run format
pnpm run type-check
pnpm run build
```

### Bypassing Hooks (Not Recommended)

If you absolutely need to bypass the hooks (not recommended), you can use:

```bash
git commit --no-verify -m "Your commit message"
```

## Benefits

- **Consistent Code Style**: All code is automatically formatted to the same standards
- **Early Error Detection**: Catches TypeScript errors and build issues before they reach the repository
- **Quality Assurance**: Ensures only working, well-formatted code is committed
- **Team Collaboration**: Everyone's code follows the same formatting rules
- **CI/CD Ready**: The same checks can be run in your CI/CD pipeline

## Notes

- The hooks only run on staged files for performance
- Formatting is automatically applied, so you don't need to worry about manual formatting
- The build check ensures that your changes don't break the application
- All configuration files are committed to the repository, so the setup is shared across the team
