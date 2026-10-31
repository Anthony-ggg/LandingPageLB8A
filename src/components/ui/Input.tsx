import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-[#4A2E35] mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'flex h-10 w-full rounded-md border border-[#F0E2DE] bg-white px-3 py-2 text-sm text-[#4A2E35] placeholder:text-[#C9B7BD]',
            'focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#FDF2F0]',
            error && 'border-[#C5A059]/40 focus:ring-[#C5A059] focus:border-[#C5A059]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-[#C5A059]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
