import { Outlet } from 'react-router-dom';
import { AnnouncementBar } from '@/components/announcement-bar';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SkipToContent } from '@/components/skip-to-content';
import { OrganizationJsonLd } from '@/components/seo';

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <OrganizationJsonLd />
      <SkipToContent />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
