# Git Pre-Commit Hook Setup for .NET Solution

## Overview

This document describes the pre-commit hook setup for the ChrisClaude .NET solution. The hook ensures code quality by running build and test validations before allowing commits to proceed.

## Purpose

The pre-commit hook automatically runs the following checks before each commit:
1. **dotnet build** - Ensures the solution compiles successfully
2. **dotnet test** - Ensures all unit and integration tests pass

If either check fails, the commit is aborted, preventing broken code from entering the repository.

## Implementation Approach

### Why Direct Git Hooks?

We chose to implement a direct git hook script rather than using third-party tools like Husky.Net for the following reasons:

1. **Simplicity** - No additional dependencies or NuGet packages required
2. **Reliability** - Direct git hooks are native to git and work across all platforms
3. **Performance** - No overhead from additional tooling
4. **Transparency** - The hook script is straightforward and easy to understand
5. **Team Sharing** - Hooks stored in `.githooks/` can be committed and shared with the team

### Hook Storage and Installation

The pre-commit hook source is stored in the repository at:
```
.githooks/pre-commit
```

This file is **committed to version control** so all team members have access to it.

When installed, the hook is symlinked to:
```
.git/hooks/pre-commit
```

**Note:** The `.git/hooks/` directory is not tracked by version control, so each developer must run the installation script to set up the hook on their local machine.

## Hook Script Details

The pre-commit hook performs the following steps:

1. **Get git root directory** - Uses `git rev-parse --show-toplevel` to find the repository root
2. **Navigate to backend directory** - Changes to the `backend` folder where the .NET solution resides
3. **Build the solution** - Runs `dotnet build ChrisClaude.sln --no-restore`
   - Uses `--no-restore` for faster execution (assumes restore was done previously)
   - Exits with error if build fails
4. **Run tests** - Runs `dotnet test ChrisClaude.sln --no-build --verbosity quiet`
   - Uses `--no-build` since we just built the solution
   - Uses `--verbosity quiet` for cleaner output
   - Exits with error if any tests fail
5. **Proceed with commit** - If all checks pass, allows the commit to proceed

### Script Content

The hook script is stored in `.githooks/pre-commit`:

```bash
#!/bin/sh

# Pre-commit hook for .NET solution
# This hook runs dotnet build and dotnet test before allowing a commit

echo "Running pre-commit checks for .NET solution..."

# Get the root directory of the git repository
ROOT_DIR=$(git rev-parse --show-toplevel)

# Navigate to the backend directory
cd "$ROOT_DIR/backend" || exit 1

# Run dotnet build
echo "Running dotnet build..."
dotnet build ChrisClaude.sln --no-restore
BUILD_RESULT=$?

if [ $BUILD_RESULT -ne 0 ]; then
  echo "❌ Build failed. Commit aborted."
  exit 1
fi

echo "✅ Build succeeded."

# Run dotnet test
echo "Running dotnet test..."
dotnet test ChrisClaude.sln --no-build --verbosity quiet
TEST_RESULT=$?

if [ $TEST_RESULT -ne 0 ]; then
  echo "❌ Tests failed. Commit aborted."
  exit 1
fi

echo "✅ All tests passed."
echo "✅ Pre-commit checks passed. Proceeding with commit..."

exit 0
```

## Installation Instructions

### Quick Setup (Recommended)

The repository includes an automated setup script that installs the git hooks for you.

1. **Run the setup script from the repository root:**
   ```bash
   ./setup-hooks.sh
   ```

   This script will:
   - Verify you're in a git repository
   - Create a symlink from `.git/hooks/pre-commit` to `.githooks/pre-commit`
   - Make the hook executable
   - Display installation confirmation

2. **Verify the installation:**
   ```bash
   ls -la .git/hooks/pre-commit
   ```

   You should see a symlink pointing to `.githooks/pre-commit`

3. **Test the hook:**
   ```bash
   # Make a small change
   echo "# test" >> README.md

   # Try to commit
   git add README.md
   git commit -m "test: verify pre-commit hook"

   # You should see the hook running build and tests
   ```

### Manual Setup (Alternative)

If you prefer to set up the hook manually:

1. **Create a symlink to the hook:**
   ```bash
   ln -s ../../.githooks/pre-commit .git/hooks/pre-commit
   ```

2. **Make the hook executable:**
   ```bash
   chmod +x .githooks/pre-commit
   ```

3. **Verify the installation:**
   ```bash
   ls -la .git/hooks/pre-commit
   ```

## Bypassing the Hook (Emergency Use Only)

In rare cases where you need to commit without running the checks (not recommended):

```bash
git commit --no-verify -m "your commit message"
```

**Warning:** Only use `--no-verify` in emergency situations. Bypassing the hook can introduce broken code into the repository.

## Troubleshooting

### Hook doesn't run

**Check if git is using a custom hooks path:**
```bash
git config --get core.hooksPath
```

If this returns anything (like `.husky`), git is using a custom hooks directory instead of `.git/hooks/`. To fix this:
```bash
git config --unset core.hooksPath
```

Then verify the hook is properly installed:
- Verify the hook file exists: `ls -la .git/hooks/pre-commit`
- Verify the hook is executable: `ls -la .git/hooks/pre-commit` (should show `-rwxr-xr-x` or `lrwxr-xr-x` for symlink)
- Run: `chmod +x .githooks/pre-commit` if needed

### Build fails in hook but works manually

- Ensure dependencies are restored: `cd backend && dotnet restore`
- The hook uses `--no-restore` for performance; run restore before committing

### Tests fail in hook but pass manually

- Ensure you're in the correct directory
- Check that all test dependencies are available
- Try running the exact command from the hook manually

### Hook takes too long

If the hook is too slow, consider:
- Using `dotnet build --no-restore` (already implemented)
- Using `dotnet test --no-build` (already implemented)
- Running only fast unit tests in the hook, leaving integration tests for CI

## CI/CD Integration

While this pre-commit hook provides local validation, it should **not replace** CI/CD pipeline checks. The hook serves as a first line of defense, but CI/CD should still run comprehensive checks including:

- Full build and test suite
- Code coverage analysis
- Static code analysis
- Integration tests
- Security scanning

## Maintenance

The pre-commit hook should be reviewed and updated when:
- The solution structure changes
- New test projects are added
- Build or test commands need modification
- Performance optimization is needed

## Benefits

1. **Prevents broken commits** - Catches build errors before they enter the repository
2. **Ensures test quality** - All tests must pass before committing
3. **Saves time** - Catches issues early, before code review or CI/CD
4. **Improves code quality** - Encourages developers to run tests regularly
5. **Reduces CI/CD failures** - Fewer failed builds in the pipeline

## Considerations

1. **Local only** - Each developer must install the hook independently
2. **Not foolproof** - Can be bypassed with `--no-verify`
3. **Performance** - Adds time to each commit (typically 10-30 seconds)
4. **Dependencies** - Requires .NET SDK to be installed and configured

## Repository Files

### `.githooks/pre-commit`
The actual pre-commit hook script that runs the build and test validations. This file is committed to version control and shared with all team members.

### `setup-hooks.sh`
An automated installation script that:
- Checks if you're in a git repository
- Creates symlinks from `.git/hooks/` to `.githooks/`
- Sets proper executable permissions
- Provides installation feedback

Team members should run this script once after cloning the repository to set up their local git hooks.

## Future Enhancements

Potential improvements to consider:
- Add code formatting checks (e.g., `dotnet format --verify-no-changes`)
- Add static analysis (e.g., using analyzers or security scanning)
- Add pre-push hooks for additional validation
- Implement selective testing (only run tests for changed files)
- Add commit message validation hooks

---

**Document Version:** 1.0
**Last Updated:** December 18, 2025
**Author:** Development Team
