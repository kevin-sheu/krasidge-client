import { Cpu, Leaf, MapPin, Users } from 'lucide-react';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card';
import { COMPANY, COMPANY_ADDRESS_LINE } from '@/lib/constants';

export function AboutPage() {
  return (
    <>
      <Seo
        title="About | KRASIDGE LLC"
        description="KRASIDGE LLC is based in Colorado Springs, CO, operating an AI landscape design and décor division alongside a custom software development division."
        path="/about"
      />

      <PageHero
        eyebrow="About us"
        title="One company, two focused divisions"
        description="KRASIDGE LLC brings together décor and design guidance with custom software development, operating out of Colorado Springs, CO."
        size="compact"
      />

      <section className="container-page space-y-6 py-16">
        <SectionHeading title="Who we are" />
        <div className="max-w-3xl space-y-4 text-muted-foreground">
          <p>
            KRASIDGE LLC operates two focused divisions under one company: AI-assisted landscape and interior design
            guidance paired with a decorative product catalog, and custom software development for businesses.
          </p>
          <p>
            We work directly with our customers — homeowners, businesses, and landscape professionals — from initial
            inquiry through project completion.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30 py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Our divisions" title="What we do" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <ServiceCard
              icon={Leaf}
              title="AI Landscape Design"
              description="Decorative garden and home products paired with AI-assisted design guidance for indoor and outdoor spaces."
            />
            <ServiceCard
              icon={Cpu}
              title="Custom Software"
              description="Bespoke software development for businesses, from internal tools to customer-facing applications."
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading eyebrow="Where we are" title="Based in Colorado Springs" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <ServiceCard icon={MapPin} title="Our location" description={COMPANY_ADDRESS_LINE} />
          <ServiceCard
            icon={Users}
            title="Get in touch"
            description={`Reach our team directly at ${COMPANY.email}.`}
          />
        </div>
      </section>
    </>
  );
}

export default AboutPage;
