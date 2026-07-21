import { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-primary text-primary-foreground">
      <div className="container-page flex items-center justify-center gap-2 py-2 text-center text-xs font-medium sm:text-sm">
        <p>
          Now booking AI-assisted landscape consultations —{' '}
          <Link to="/ai-landscape-design" className="underline underline-offset-2 hover:no-underline">
            learn how it works
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="absolute right-4 rounded-sm p-0.5 opacity-80 transition hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
