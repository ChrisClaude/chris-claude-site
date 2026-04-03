import React, { useId } from 'react';

type SharedFieldProps = {
  label?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  variant?: string;
  labelPlacement?: string;
  classNames?: Record<string, string>;
};

type InputProps = SharedFieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

type TextAreaProps = SharedFieldProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    minRows?: number;
    maxRows?: number;
  };

const baseInputClassName =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100';

const baseTextAreaClassName =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100';

const labelClassName = 'mb-1.5 block text-sm font-medium text-gray-700';

export const Input: React.FC<InputProps> = ({
  label,
  isRequired,
  isDisabled,
  className,
  id,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col">
      {label ? (
        <label htmlFor={inputId} className={labelClassName}>
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        required={isRequired}
        disabled={isDisabled}
        className={[baseInputClassName, className].filter(Boolean).join(' ')}
        {...props}
      />
    </div>
  );
};

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  isRequired,
  isDisabled,
  className,
  id,
  minRows,
  maxRows,
  rows,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col">
      {label ? (
        <label htmlFor={inputId} className={labelClassName}>
          {label}
        </label>
      ) : null}
      <textarea
        id={inputId}
        required={isRequired}
        disabled={isDisabled}
        rows={rows ?? minRows ?? 3}
        className={[baseTextAreaClassName, className].filter(Boolean).join(' ')}
        {...props}
      />
      {maxRows ? (
        <span className="mt-1 text-xs text-gray-400">Max rows: {maxRows}</span>
      ) : null}
    </div>
  );
};
