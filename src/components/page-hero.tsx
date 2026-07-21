import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  align?: 'left' | 'center';
  image?: string;
  className?: string;
  size?: 'default' | 'compact';
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  align = 'left',
  image,
  className,
  size = 'default',
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/40 via-background to-background',
        className,
      )}
    >
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/50" />
        </div>
      )}
      <div
        className={cn(
          'container-page relative flex flex-col gap-6',
          size === 'default' ? 'py-20 sm:py-28' : 'py-14 sm:py-20',
          align === 'center' && 'items-center text-center',
        )}
      >
        {eyebrow && (
          <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {eyebrow}
          </span>
        )}
        <h1
          className={cn(
            'max-w-3xl text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl',
          )}
        >
          {title}
        </h1>
        {description && (
          <p className={cn('max-w-2xl text-balance text-lg text-muted-foreground')}>{description}</p>
        )}
        {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
      </div>
    </section>
  );
}
