import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { COMPANY, COMPANY_ADDRESS_LINE } from '@/lib/constants';

/**
 * LEGAL REVIEW REQUIRED
 * This privacy policy is a template for website launch preparation.
 * Have qualified legal counsel review and approve it before production use.
 * See docs/LEGAL_REVIEW.md.
 */
export function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy | KRASIDGE LLC"
        description="Privacy practices for the KRASIDGE LLC website, contact form, and accounts."
        path="/privacy"
      />
      <PageHero eyebrow="Legal" title="Privacy Policy" size="compact" />

      <section className="container-page max-w-3xl space-y-8 py-16 text-muted-foreground">
        <Alert>
          <AlertTitle>Template for legal review</AlertTitle>
          <AlertDescription>
            This page is a professional template. It must be reviewed by legal counsel before production
            use.
          </AlertDescription>
        </Alert>

        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Who we are</h2>
          <p>
            {COMPANY.name} operates this website at {COMPANY.url}. Contact:{' '}
            <a className="text-foreground underline" href={`mailto:${COMPANY.email}`}>
              {COMPANY.email}
            </a>
            . Business address: {COMPANY_ADDRESS_LINE}, {COMPANY.address.country}.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Contact form data</h2>
          <p>
            When you submit the public contact form, we collect the information you provide (such as name,
            email, optional phone and company, inquiry type, subject, and message) and your consent
            acknowledgement. Submissions are stored in our database so we can respond and manage inquiries.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Account data</h2>
          <p>
            If you create an account, we store your name, email address, and a hashed password. We do not
            store passwords in plain text. Account sessions use secure HTTP-only cookies.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Cookies</h2>
          <p>
            We use essential authentication cookies to keep you signed in. These cookies are HTTP-only and
            are not accessible to client-side scripts. Theme preference may be stored locally in your browser.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Security</h2>
          <p>
            We apply industry-standard protections such as password hashing, rate limiting, input validation,
            and secure cookie configuration. No method of transmission over the Internet is completely secure.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Data retention</h2>
          <p>
            Contact inquiries and account records are retained as needed to operate the business, respond to
            requests, and meet legal obligations. You may contact us to request account closure or inquiry
            deletion subject to applicable law.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Your rights</h2>
          <p>
            Depending on your location, you may have rights to access, correct, or delete personal data we
            hold about you. Contact {COMPANY.email} to make a request.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Third-party service providers</h2>
          <p>
            We may use infrastructure providers (for example hosting, databases, and email delivery) to operate
            this website. Those providers process data only as needed to provide their services to us.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Contact</h2>
          <p>
            Privacy questions: {COMPANY.email}
            <br />
            {COMPANY.name}
            <br />
            {COMPANY_ADDRESS_LINE}
            <br />
            {COMPANY.address.country}
          </p>
        </div>
      </section>
    </>
  );
}

export default PrivacyPage;
