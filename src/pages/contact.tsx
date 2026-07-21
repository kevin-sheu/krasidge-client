import { useSearchParams } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import type { InquiryType } from '@krasidge/shared';
import { inquiryTypes } from '@krasidge/shared';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { ContactForm } from '@/components/contact-form';
import { COMPANY, COMPANY_ADDRESS_LINE } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';

function parseInquiryType(value: string | null): InquiryType | undefined {
  if (value && (inquiryTypes as readonly string[]).includes(value)) {
    return value as InquiryType;
  }
  return undefined;
}

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const inquiryType = parseInquiryType(searchParams.get('inquiryType'));

  return (
    <>
      <Seo
        title="Contact | KRASIDGE LLC"
        description="Get in touch with KRASIDGE LLC for product inquiries, AI landscape design consultations, or custom software projects."
        path="/contact"
      />

      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project"
        description="Send us a message and our team will get back to you."
        size="compact"
      />

      <section className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href={`mailto:${COMPANY.email}`} className="text-sm text-muted-foreground hover:text-foreground">
                    {COMPANY.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{COMPANY_ADDRESS_LINE}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <ContactForm defaultInquiryType={inquiryType} />
          </CardContent>
        </Card>
      </section>
    </>
  );
}

export default ContactPage;
