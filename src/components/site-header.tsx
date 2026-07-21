import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react';
import logoUrl from '@/assets/krasidge-logo.png';
import { cn } from '@/lib/utils';
import { COMPANY, PRIMARY_NAV } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { MobileNavigation } from '@/components/mobile-navigation';
import { initials } from '@/lib/utils';

export function SiteHeader() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b transition-colors',
        scrolled
          ? 'border-border bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80'
          : 'border-transparent bg-background/70 backdrop-blur-sm',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2" aria-label={`${COMPANY.name} home`}>
          <img
            src={logoUrl}
            alt={`${COMPANY.name} logo`}
            className="h-10 w-auto max-w-[180px] object-contain sm:h-11 sm:max-w-[220px]"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {PRIMARY_NAV.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                  isActive && 'bg-accent text-accent-foreground',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">{initials(user.name)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-28 truncate text-sm font-medium md:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account" className="gap-2">
                    <UserIcon className="h-4 w-4" /> My account
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="gap-2">
                      <LayoutDashboard className="h-4 w-4" /> Admin dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="gap-2 text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Get started</Link>
              </Button>
            </div>
          )}

          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
