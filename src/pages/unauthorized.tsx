import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { Seo } from '@/components/seo';
import { Button } from '@/components/ui/button';

export function UnauthorizedPage() {
  return (
    <>
      <Seo title="Access Denied | KRASIDGE LLC" description="You do not have permission to view this page." noIndex />
      <div className="container-page flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
        <ShieldAlert className="h-12 w-12 text-destructive" />
        <h1 className="font-display text-4xl font-semibold">Access denied</h1>
        <p className="max-w-md text-muted-foreground">
          You don&apos;t have permission to view this page. If you believe this is a mistake, contact our team.
        </p>
        <Button asChild>
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </>
  );
}

export default UnauthorizedPage;
