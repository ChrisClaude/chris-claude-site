#!/bin/sh

# Git Hooks Setup Script
# This script installs the git hooks from .githooks directory

echo "Setting up git hooks for ChrisClaude project..."

# Get the root directory of the git repository
ROOT_DIR=$(git rev-parse --show-toplevel 2>/dev/null)

if [ -z "$ROOT_DIR" ]; then
  echo "❌ Error: Not in a git repository"
  exit 1
fi

# Define paths
HOOKS_DIR="$ROOT_DIR/.githooks"
GIT_HOOKS_DIR="$ROOT_DIR/.git/hooks"

# Check if .githooks directory exists
if [ ! -d "$HOOKS_DIR" ]; then
  echo "❌ Error: .githooks directory not found"
  exit 1
fi

# Check if git is configured to use a custom hooks path
CUSTOM_HOOKS_PATH=$(git config --get core.hooksPath 2>/dev/null)
if [ -n "$CUSTOM_HOOKS_PATH" ]; then
  echo "⚠️  Warning: Git is configured to use custom hooks path: $CUSTOM_HOOKS_PATH"
  echo "This will prevent hooks in .git/hooks/ from running."
  echo ""
  echo "Removing custom hooks path configuration..."
  git config --unset core.hooksPath
  echo "✅ Custom hooks path removed. Now using default .git/hooks/"
  echo ""
fi

# Create .git/hooks directory if it doesn't exist
if [ ! -d "$GIT_HOOKS_DIR" ]; then
  mkdir -p "$GIT_HOOKS_DIR"
fi

# Install pre-commit hook
if [ -f "$HOOKS_DIR/pre-commit" ]; then
  # Remove existing hook if it exists
  if [ -f "$GIT_HOOKS_DIR/pre-commit" ] || [ -L "$GIT_HOOKS_DIR/pre-commit" ]; then
    rm "$GIT_HOOKS_DIR/pre-commit"
    echo "Removed existing pre-commit hook"
  fi

  # Create symlink to the hook
  ln -s "$HOOKS_DIR/pre-commit" "$GIT_HOOKS_DIR/pre-commit"

  # Make sure the hook is executable
  chmod +x "$HOOKS_DIR/pre-commit"

  echo "✅ Pre-commit hook installed successfully"
else
  echo "⚠️  Warning: pre-commit hook not found in .githooks directory"
fi

# Display installation summary
echo ""
echo "Git hooks installation complete!"
echo ""
echo "Installed hooks:"
if [ -L "$GIT_HOOKS_DIR/pre-commit" ]; then
  echo "  ✅ pre-commit (runs dotnet build and dotnet test)"
fi

echo ""
echo "To bypass hooks in an emergency (not recommended):"
echo "  git commit --no-verify -m \"your message\""
echo ""
echo "To uninstall hooks:"
echo "  rm .git/hooks/pre-commit"
echo ""
