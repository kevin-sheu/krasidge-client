import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
  /** When true, loads eagerly (useful for hero images). */
  priority?: boolean;
}

/**
 * Wraps <img> with a graceful fallback so a missing asset never renders as a
 * broken-image icon — it degrades to a soft placeholder instead.
 */
export function ImageWithFallback({
  className,
  fallbackClassName,
  alt,
  priority,
  loading,
  ...props
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-muted to-accent text-muted-foreground',
          className,
          fallbackClassName,
        )}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="h-8 w-8 opacity-40" />
      </div>
    );
  }

  return (
    <img
      className={className}
      alt={alt}
      onError={() => setFailed(true)}
      loading={priority ? 'eager' : (loading ?? 'lazy')}
      {...props}
    />
  );
}
