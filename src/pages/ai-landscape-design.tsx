import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardList, Leaf, Sparkles, Users } from 'lucide-react';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const STEPS = [
  {
    icon: ClipboardList,
    title: '1. Share your space',
    description:
      'Tell us about your property — indoor or outdoor — along with your goals, constraints, and any photos or measurements you have.',
  },
  {
    icon: Sparkles,
    title: '2. AI-assisted concepts',
    description:
      'Our team uses AI-assisted design tools to generate layout and planting concepts based on what you share, then reviews them with you.',
  },
  {
    icon: Leaf,
    title: '3. Refine and implement',
    description:
      'Together we refine the concept and put together a practical plan — including relevant KRASIDGE décor products — for bringing it to life.',
  },
];

const FAQ = [
  {
    question: 'Is this an automated design generator?',
    answer:
      'No. AI-assisted tools support our process, but a member of our team is involved in reviewing and refining every concept with you.',
  },
  {
    question: 'Do I need professional renderings or a survey?',
    answer:
      'No. Photos, rough measurements, and a description of the space are enough to get started. We can advise if more detail would help.',
  },
  {
    question: 'Can this be used for indoor spaces too?',
    answer:
      'Yes. The same guided process applies to indoor plantings and décor placement, not just outdoor landscaping.',
  },
];

export function AiLandscapeDesignPage() {
  return (
    <>
      <Seo
        title="AI Landscape Design | KRASIDGE LLC"
        description="AI-assisted landscape and interior design guidance from KRASIDGE LLC, paired with our decorative product catalog."
        path="/ai-landscape-design"
      />

      <PageHero
        eyebrow="Division"
        title="AI Landscape Design"
        description="Guided, technology-assisted planning for indoor and outdoor spaces — paired with our décor catalog."
        actions={
          <Button size="lg" asChild>
            <Link to="/contact?inquiryType=ai-landscape-design">
              Start a consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
        size="compact"
      />

      <section className="container-page py-16">
        <SectionHeading eyebrow="How it works" title="A simple, guided process" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <ServiceCard key={step.title} icon={step.icon} title={step.title} description={step.description} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">Who it&apos;s for</span>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              For homeowners and property teams alike
            </h2>
            <p className="text-muted-foreground">
              Whether you&apos;re planning a single garden bed or coordinating décor across a commercial property,
              our guided process scales to fit the project.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceCard icon={Users} title="Homeowners" description="Get a clear plan for your garden, patio, or indoor plant displays." />
            <ServiceCard icon={Leaf} title="Property teams" description="Coordinate décor and layout planning across multiple spaces." />
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
        <Accordion type="single" collapsible className="mt-8 max-w-2xl">
          {FAQ.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="border-t border-border bg-primary py-16 text-primary-foreground">
        <div className="container-page flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Ready to plan your space?</h2>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact?inquiryType=ai-landscape-design">Start a consultation</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

export default AiLandscapeDesignPage;
