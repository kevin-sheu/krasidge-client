import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, LogOut, Menu, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRIMARY_NAV } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className="mt-4 flex flex-1 flex-col gap-1" aria-label="Mobile primary">
          {PRIMARY_NAV.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-accent',
                  isActive && 'bg-accent text-accent-foreground',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>

        <Separator className="my-4" />

        {isAuthenticated && user ? (
          <div className="space-y-2">
            <p className="truncate text-sm text-muted-foreground">Signed in as {user.email}</p>
            <Button variant="outline" className="w-full justify-start gap-2" asChild onClick={() => setOpen(false)}>
              <Link to="/account">
                <UserIcon className="h-4 w-4" /> My account
              </Link>
            </Button>
            {isAdmin && (
              <Button variant="outline" className="w-full justify-start gap-2" asChild onClick={() => setOpen(false)}>
                <Link to="/admin">
                  <LayoutDashboard className="h-4 w-4" /> Admin dashboard
                </Link>
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-destructive"
              onClick={() => {
                setOpen(false);
                logout();
              }}
            >
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Button className="w-full" asChild onClick={() => setOpen(false)}>
              <Link to="/register">Get started</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild onClick={() => setOpen(false)}>
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
