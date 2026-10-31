import { Children, cloneElement, type ReactElement, forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'brand' | 'outline' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'brand', size = 'md', disabled, asChild, children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 rounded font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
      brand:
        'bg-[#C5A059] text-white hover:bg-[#B5904A] active:bg-[#A5823C] shadow-sm',
      outline:
        'border border-[#F0E2DE] bg-white text-[#4A2E35] hover:bg-[#FDF2F0] active:bg-[#F3E8D9]',
      ghost:
        'bg-transparent text-[#8E6B73] hover:bg-[#FDF2F0] active:bg-[#F3E8D9]',
      text: 'bg-transparent text-[#C5A059] hover:underline active:opacity-70',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3 text-base',
    };

    const mergedClassName = cn(base, variants[variant], sizes[size], className);

    if (asChild) {
      const child = Children.only(children) as ReactElement & { props: any };
      return cloneElement(child, {
        className: cn(mergedClassName, child.props.className),
        ...(disabled ? { 'aria-disabled': true } : {}),
        ...props,
      } as any);
    }

    return (
      <button
        ref={ref}
        className={mergedClassName}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
