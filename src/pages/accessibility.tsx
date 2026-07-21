import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { COMPANY } from '@/lib/constants';

export function AccessibilityPage() {
  return (
    <>
      <Seo
        title="Accessibility | KRASIDGE LLC"
        description="Learn about the KRASIDGE LLC commitment to web accessibility."
        path="/accessibility"
      />
      <PageHero eyebrow="Legal" title="Accessibility" size="compact" />

      <section className="container-page max-w-3xl space-y-8 py-16 text-muted-foreground">
        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Our commitment</h2>
          <p>
            KRASIDGE LLC is committed to providing a website that is accessible to the widest possible audience.
            We aim to follow recognized best practices for accessible web design, including keyboard navigation,
            visible focus states, and support for reduced-motion preferences.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Ongoing efforts</h2>
          <p>
            Accessibility is an ongoing effort. We continue to review and improve this site as we add new
            features.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Feedback</h2>
          <p>
            If you encounter an accessibility barrier on this site, please let us know at{' '}
            <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">
              {COMPANY.email}
            </a>{' '}
            so we can address it.
          </p>
        </div>
      </section>
    </>
  );
}

export default AccessibilityPage;
