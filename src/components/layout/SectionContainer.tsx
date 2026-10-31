import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function SectionContainer({
  children,
  className,
  padded = true,
}: SectionContainerProps) {
  return (
    <section className={cn(padded ? 'py-16 md:py-20' : '', className)}>
      <div className="container px-4 md:px-6">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('text-center max-w-3xl mx-auto mb-16 md:mb-20', className)}>
      <h2 className="text-3xl md:text-4xl font-bold text-[#4A2E35] tracking-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-[#8E6B73]">{description}</p>
      )}
    </div>
  );
}
