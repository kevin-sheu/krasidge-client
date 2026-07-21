import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Mail, Package, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Inquiries', href: '/admin/inquiries', icon: Mail },
  { label: 'Users', href: '/admin/users', icon: Users },
];

export function AdminSidebar() {
  return (
    <nav className="space-y-1" aria-label="Admin">
      {ADMIN_NAV.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          end={item.href === '/admin'}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
              isActive && 'bg-accent text-accent-foreground',
            )
          }
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
