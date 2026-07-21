import { Link, Outlet } from 'react-router-dom';
import { ArrowLeft, TriangleAlert } from 'lucide-react';
import logoUrl from '@/assets/krasidge-logo.png';
import { AdminSidebar } from '@/components/admin-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';

export function AdminLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/admin" className="flex items-center gap-3" aria-label="KRASIDGE admin home">
            <img
              src={logoUrl}
              alt="KRASIDGE LLC logo"
              className="h-9 w-auto max-w-[160px] object-contain"
            />
            <span className="font-display text-lg font-semibold">Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">{user?.email}</span>
            <ThemeToggle />
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back to site
            </Link>
          </div>
        </div>
      </header>

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[220px_1fr]">
        <AdminSidebar />
        <div className="space-y-6">
          <Alert variant="warning">
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>Sample data in use</AlertTitle>
            <AlertDescription>
              Some products in this workspace are demonstration seed data (marked <strong>Sample</strong>). Replace
              them with real inventory before launch.
            </AlertDescription>
          </Alert>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
