import { Link } from 'react-router-dom';
import { ArrowRight, Boxes, Code2, Cpu, LifeBuoy, Plug, ShieldCheck } from 'lucide-react';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card';
import { Button } from '@/components/ui/button';

const CAPABILITIES = [
  {
    icon: Code2,
    title: 'Web applications',
    description: 'Custom web applications designed around your workflows, from internal dashboards to customer portals.',
  },
  {
    icon: Boxes,
    title: 'Internal tools',
    description: 'Purpose-built tools that replace spreadsheets and manual processes with something built for your team.',
  },
  {
    icon: Plug,
    title: 'Integrations',
    description: 'Connecting the systems and services you already use so data moves where it needs to go.',
  },
  {
    icon: Cpu,
    title: 'Automation',
    description: 'Automating repetitive tasks so your team can focus on higher-value work.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure by design',
    description: 'Authentication, access control, and data handling built in from the start, not bolted on later.',
  },
  {
    icon: LifeBuoy,
    title: 'Ongoing support',
    description: 'Direct access to the team that built your software for updates, fixes, and future work.',
  },
];

const PROCESS = [
  { title: 'Discovery', description: 'We learn about your business, current workflows, and what success looks like.' },
  { title: 'Design & build', description: 'We design and build the software iteratively, keeping you in the loop.' },
  { title: 'Launch & support', description: 'We help you launch and remain available for support and future iterations.' },
];

export function CustomSoftwarePage() {
  return (
    <>
      <Seo
        title="Custom Software Development | KRASIDGE LLC"
        description="KRASIDGE LLC builds custom software — web applications, internal tools, and integrations — tailored to how your business works."
        path="/custom-software"
      />

      <PageHero
        eyebrow="Division"
        title="Custom Software"
        description="Bespoke software development built around how your business actually operates."
        actions={
          <Button size="lg" asChild>
            <Link to="/contact?inquiryType=custom-software">
              Discuss your project <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
        size="compact"
      />

      <section className="container-page py-16">
        <SectionHeading eyebrow="Capabilities" title="What we build" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((item) => (
            <ServiceCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30 py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Process" title="How a project comes together" />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {PROCESS.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-border bg-background p-6">
                <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-primary py-16 text-primary-foreground">
        <div className="container-page flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Have a software project in mind?</h2>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact?inquiryType=custom-software">Tell us about it</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

export default CustomSoftwarePage;
