/**
 * Shared styling constants for Resume Editor form components
 *
 * This module provides consistent, beautiful styling for all input components
 * with rounded borders and optimized user experience.
 */

/**
 * Standard input/textarea classNames configuration with:
 * - Rounded borders (rounded-lg)
 * - Consistent colors and hover states
 * - Proper label positioning
 * - Clean white backgrounds
 */
export const inputClassNames = {
  input: 'text-gray-900',
  inputWrapper:
    '!bg-white !border-2 !border-gray-300 hover:!border-gray-400 data-[focus=true]:!border-blue-500 !rounded-xl !shadow-sm !transition-all',
  label: 'text-gray-700 !text-sm !font-medium !mb-1.5 !static !transform-none',
  base: 'bg-white',
  mainWrapper: 'bg-white',
} as const;

/**
 * Textarea-specific classNames (inherits from inputClassNames)
 */
export const textareaClassNames = {
  ...inputClassNames,
  inputWrapper:
    '!bg-white !border-2 !border-gray-300 hover:!border-gray-400 data-[focus=true]:!border-blue-500 !rounded-xl !shadow-sm !transition-all',
} as const;

/**
 * Select component classNames with rounded borders
 */
export const selectClassNames = {
  input: 'text-gray-900',
  inputWrapper:
    '!bg-white !border-2 !border-gray-300 hover:!border-gray-400 data-[focus=true]:!border-blue-500 !rounded-xl !shadow-sm !transition-all',
  label: 'text-gray-700 !text-sm !font-medium !mb-1.5 !static !transform-none',
  base: 'bg-white',
  mainWrapper: 'bg-white',
  trigger: 'bg-white rounded-xl',
  listbox: 'bg-white',
  popoverContent: 'bg-white rounded-xl',
} as const;

/**
 * Error message container styling
 */
export const errorContainerClassName =
  'bg-red-50 border-2 border-red-200 rounded-xl p-3 shadow-sm';

/**
 * Error text styling
 */
export const errorTextClassName = 'text-sm text-red-600 space-y-1';

/**
 * Card styling for consistent rounded corners
 */
export const cardClassNames = {
  base: 'bg-white rounded-xl',
  header: 'bg-white',
  body: 'bg-white',
} as const;

/**
 * Nested card styling (for cards within cards)
 */
export const nestedCardClassName =
  'border-2 border-gray-200 bg-white rounded-xl shadow-md';
