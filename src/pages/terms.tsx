import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { COMPANY, COMPANY_ADDRESS_LINE } from '@/lib/constants';

/**
 * LEGAL REVIEW REQUIRED
 * This terms-of-use page is a template. Have qualified legal counsel review
 * and approve it before production use. See docs/LEGAL_REVIEW.md.
 */
export function TermsPage() {
  return (
    <>
      <Seo
        title="Terms of Use | KRASIDGE LLC"
        description="Terms of use for the KRASIDGE LLC website and related services."
        path="/terms"
      />
      <PageHero eyebrow="Legal" title="Terms of Use" size="compact" />

      <section className="container-page max-w-3xl space-y-8 py-16 text-muted-foreground">
        <Alert>
          <AlertTitle>Template for legal review</AlertTitle>
          <AlertDescription>
            This page is a professional template. It must be reviewed by legal counsel before production
            use.
          </AlertDescription>
        </Alert>

        <p>
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Use of this site</h2>
          <p>
            By using this website operated by {COMPANY.name}, you agree to use it only for lawful purposes
            and in a manner consistent with these terms. Product listings and content are provided for
            informational purposes and may include clearly labeled sample or demonstration records.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for
            activity that occurs under your account. We may suspend accounts that violate these terms or
            pose a security risk.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Inquiries and orders</h2>
          <p>
            Submitting a contact or product inquiry does not create a binding purchase order. Availability,
            specifications, and commercial terms are confirmed directly by {COMPANY.name}.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Intellectual property</h2>
          <p>
            Website content, branding, and software materials remain the property of {COMPANY.name} or its
            licensors unless otherwise stated.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {COMPANY.name} is not liable for indirect or
            consequential damages arising from use of this website. This clause is a template and requires
            legal review for your jurisdiction.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Contact</h2>
          <p>
            Questions about these terms:{' '}
            <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">
              {COMPANY.email}
            </a>
            <br />
            {COMPANY.name}, {COMPANY_ADDRESS_LINE}, {COMPANY.address.country}
          </p>
        </div>
      </section>
    </>
  );
}

export default TermsPage;
