import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  value: number;
  readOnly?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  onChange?: (value: number) => void;
}

export function StarRating({
  value = 0,
  readOnly = false,
  size = 'md',
  className,
  onChange,
}: StarRatingProps) {
  const sizes = { sm: 'w-4 h-4', md: 'w-5 h-5' };

  return (
    <div
      className={cn('flex items-center gap-1', className)}
      role="radiogroup"
      aria-label="Calificación"
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= value;
        const handleClick = () => {
          if (!readOnly && onChange) onChange(n);
        };
        return (
          <button
            key={n}
            type="button"
            onClick={handleClick}
            disabled={readOnly}
            aria-pressed={filled}
            aria-label={`${n} estrellas`}
            className={cn(
              sizes[size],
              'text-[#F0E2DE] transition-colors',
              !readOnly && 'hover:text-[#D4AF37] active:scale-95',
              filled && 'text-[#D4AF37]'
            )}
          >
            <Star size={size === 'sm' ? 16 : 20} fill={filled ? 'currentColor' : 'none'} stroke={filled ? 'none' : 'currentColor'} strokeWidth={2} />
          </button>
        );
      })}
    </div>
  );
}
