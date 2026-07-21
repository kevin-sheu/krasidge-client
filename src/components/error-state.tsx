import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getErrorMessage } from '@/lib/api';

interface ErrorStateProps {
  error?: unknown;
  title?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ error, title = 'Something went wrong', onRetry, className }: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 py-16 text-center ${className ?? ''}`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <p className="max-w-sm text-sm text-muted-foreground">{getErrorMessage(error, 'Please try again in a moment.')}</p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
