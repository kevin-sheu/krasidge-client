import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import logoUrl from '@/assets/krasidge-logo.png';
import { COMPANY, COMPANY_ADDRESS_LINE, FOOTER_LINKS } from '@/lib/constants';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Link to="/" className="inline-block" aria-label={`${COMPANY.name} home`}>
            <img
              src={logoUrl}
              alt={`${COMPANY.name} logo`}
              className="h-12 w-auto max-w-[240px] object-contain"
            />
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            Technology-driven home and garden products with AI-powered software solutions.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{COMPANY_ADDRESS_LINE}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-foreground">
                {COMPANY.email}
              </a>
            </p>
          </div>
        </div>

        {FOOTER_LINKS.map((group) => (
          <div key={group.title}>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
              {group.title}
            </h3>
            <ul className="mt-4 space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} {COMPANY.name}. All rights reserved.</p>
          <p>Colorado Springs, CO</p>
        </div>
      </div>
    </footer>
  );
}
