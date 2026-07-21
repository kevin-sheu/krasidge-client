import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { Seo } from '@/components/seo';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found | KRASIDGE LLC" description="The page you're looking for could not be found." noIndex />
      <div className="container-page flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
        <Compass className="h-12 w-12 text-primary" />
        <h1 className="font-display text-4xl font-semibold">Page not found</h1>
        <p className="max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Button asChild>
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </>
  );
}

export default NotFoundPage;
