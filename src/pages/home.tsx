import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  Building2,
  Cpu,
  Flower2,
  HardHat,
  Home as HomeIcon,
  Leaf,
  Shrub,
  ShoppingBag,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { apiGet } from '@/lib/api';
import type { Paginated, Product } from '@/lib/types';
import { CATEGORY_LABELS } from '@/lib/constants';
import { Seo } from '@/components/seo';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageWithFallback } from '@/components/image-with-fallback';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const FEATURED_CATEGORIES = [
  { slug: 'figurines', image: '/images/products/figurine.jpg' },
  { slug: 'plant-pots', image: '/images/products/plant-pots.jpg' },
  { slug: 'vases', image: '/images/products/vase.jpg' },
  { slug: 'planters', image: '/images/products/outdoor-planter.jpg' },
  { slug: 'indoor-decor', image: '/images/products/indoor-planter.jpg' },
  { slug: 'outdoor-decor', image: '/images/products/patio-decor.jpg' },
] as const;

const GALLERY_IMAGES = [
  {
    src: '/images/carousel/carousel-1.jpg',
    alt: 'Conceptual landscaped outdoor living space',
  },
  {
    src: '/images/carousel/carousel-2.jpg',
    alt: 'Conceptual decorative outdoor planters',
  },
  {
    src: '/images/carousel/carousel-3.jpg',
    alt: 'Conceptual modern home décor setting',
  },
  {
    src: '/images/carousel/carousel-4.jpg',
    alt: 'Conceptual garden products and greenery',
  },
  {
    src: '/images/carousel/carousel-5.jpg',
    alt: 'Conceptual landscape planning scene',
  },
  {
    src: '/images/carousel/carousel-6.jpg',
    alt: 'Conceptual AI-assisted garden design visualization',
  },
];

const AI_STEPS = [
  {
    title: 'Describe the space',
    description:
      'Share goals, preferences, and details about the outdoor or garden area you want to improve.',
  },
  {
    title: 'Generate concepts',
    description:
      'KRASIDGE develops AI-powered solutions designed to help generate landscaping concepts and layout ideas.',
  },
  {
    title: 'Refine the design',
    description:
      'Review plant layout suggestions, decorative elements, and arrangements, then refine toward a practical plan.',
  },
];

const CUSTOMER_TYPES = [
  {
    icon: HomeIcon,
    title: 'Homeowners',
    description: 'Decorative and functional products for indoor and outdoor living spaces.',
  },
  {
    icon: Flower2,
    title: 'Landscape designers',
    description: 'Tools and products that support visualization and planning workflows.',
  },
  {
    icon: HardHat,
    title: 'Contractors',
    description: 'Products and technology solutions that support landscape project planning.',
  },
  {
    icon: Shrub,
    title: 'Garden professionals',
    description: 'Resources for garden arrangements, plant layouts, and decorative elements.',
  },
  {
    icon: ShoppingBag,
    title: 'Retail and commercial buyers',
    description: 'Home and garden products intended for residential and commercial environments.',
  },
  {
    icon: Building2,
    title: 'Businesses needing custom software',
    description: 'AI development, automation, implementation, and ongoing technical support.',
  },
];

const WHY_KRASIDGE = [
  {
    icon: Leaf,
    title: 'Integrated product and technology',
    description:
      'Home and garden products combined with AI-powered landscape and software capabilities.',
  },
  {
    icon: HomeIcon,
    title: 'Residential and commercial focus',
    description: 'Solutions for individual consumers and commercial customers.',
  },
  {
    icon: Wrench,
    title: 'Customizable software services',
    description:
      'Custom development, implementation, customization, maintenance, and product improvements.',
  },
  {
    icon: Sparkles,
    title: 'Support through the lifecycle',
    description: 'Technical support and maintenance across implementation and ongoing use.',
  },
  {
    icon: Flower2,
    title: 'Functional and decorative environments',
    description:
      'Products and solutions intended for durable indoor and outdoor decorative settings.',
  },
];

export function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () =>
      apiGet<Paginated<Product>>('/products', { params: { featured: true, limit: 8 } }),
  });

  const featured = data?.items ?? [];

  return (
    <>
      <Seo
        title="Beautiful Spaces. Intelligent Solutions."
        description="KRASIDGE LLC combines premium home and garden products with AI-powered landscape design and custom software solutions. Colorado Springs, CO."
        path="/"
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/hero/hero-landscape.jpg"
            alt="Landscaped outdoor living space with greenery"
            className="h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>
        <div className="container-page relative flex min-h-[78vh] flex-col justify-center py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">KRASIDGE LLC</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Beautiful Spaces. Intelligent Solutions.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            KRASIDGE combines premium home and garden products with AI-powered landscape and software
            solutions for residential and commercial customers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/products">
                Explore Our Products <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/ai-landscape-design">Discover AI Solutions</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="Business divisions"
          title="Products and intelligent software"
          description="Two complementary capabilities under one company."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Card className="overflow-hidden border-border/80 shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="flex h-full flex-col gap-4 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-semibold">Home &amp; Garden Products</h3>
              <p className="text-muted-foreground">
                Figurines, plant pots, vases, planters, and indoor and outdoor décor made from durable,
                high-quality materials.
              </p>
              <Button variant="link" className="mt-auto w-fit p-0" asChild>
                <Link to="/products">
                  View products <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-border/80 shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="flex h-full flex-col gap-4 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-semibold">AI &amp; Software Solutions</h3>
              <p className="text-muted-foreground">
                AI-powered landscape design applications and custom software development, automation,
                implementation, and support.
              </p>
              <Button variant="link" className="mt-auto w-fit p-0" asChild>
                <Link to="/custom-software">
                  Explore software services <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Catalog"
            title="Featured product categories"
            description="Browse decorative and functional home and garden categories."
            actions={
              <Button variant="outline" asChild>
                <Link to="/products">View All Products</Link>
              </Button>
            }
          />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {FEATURED_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                to={`/products?category=${category.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-background shadow-sm transition hover:border-primary/40"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={category.image}
                    alt={`Conceptual image for ${CATEGORY_LABELS[category.slug]}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="p-3 text-center text-sm font-medium">
                  {CATEGORY_LABELS[category.slug]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="Inspiration"
          title="Spaces, products, and planning"
          description="Conceptual imagery representing landscaped spaces, décor, and design planning."
        />
        <div className="mt-8">
          <Carousel opts={{ align: 'start', loop: true }} className="w-full">
            <CarouselContent>
              {GALLERY_IMAGES.map((image) => (
                <CarouselItem key={image.src} className="md:basis-1/2 lg:basis-1/3">
                  <div className="overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
                    <ImageWithFallback
                      src={image.src}
                      alt={image.alt}
                      className="aspect-[4/3] h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>

      {featured.length > 0 || isLoading ? (
        <section className="border-y border-border bg-secondary/20 py-16 sm:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Featured products"
              title="From the catalog"
              description="Published products from the KRASIDGE catalog. Sample listings are clearly marked."
            />
            <div className="mt-8">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="aspect-[4/3] w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                <Carousel opts={{ align: 'start', loop: featured.length > 3 }} className="w-full">
                  <CarouselContent>
                    {featured.map((product) => (
                      <CarouselItem key={product.id} className="sm:basis-1/2 lg:basis-1/3">
                        <Link to={`/products/${product.slug}`} className="group block">
                          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                            <ImageWithFallback
                              src={product.images[0]?.url}
                              alt={product.images[0]?.alt ?? product.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {product.isSample && (
                              <Badge
                                className="absolute left-3 top-3 border-amber-300 bg-amber-50 text-amber-800"
                                variant="outline"
                              >
                                Sample
                              </Badge>
                            )}
                          </div>
                          <p className="mt-3 font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {CATEGORY_LABELS[product.category]}
                          </p>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
              )}
            </div>
          </div>
        </section>
      ) : null}

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="AI landscape design"
              title="Concepts, layouts, and arrangements"
              description="KRASIDGE develops AI-powered applications designed to help visualize outdoor spaces, recommend plant layouts, suggest decorative elements, and optimize garden arrangements."
            />
            <div className="mt-8 grid gap-4">
              {AI_STEPS.map((step, index) => (
                <div key={step.title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
            <Button className="mt-6" asChild>
              <Link to="/ai-landscape-design">
                Learn about AI landscape design <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <ImageWithFallback
              src="/images/services/ai-landscape.jpg"
              alt="Conceptual landscape design visualization"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30 py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
              <ImageWithFallback
                src="/images/services/software-workspace.jpg"
                alt="Software development workspace"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div>
              <SectionHeading
                eyebrow="Custom software"
                title="Development, automation, and support"
                description="Custom AI applications, business automation, web development, implementation, customization, maintenance, and technical support."
              />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <ServiceCard
                  icon={Cpu}
                  title="AI development"
                  description="Intelligent applications tailored to business workflows."
                />
                <ServiceCard
                  icon={Wrench}
                  title="Automation"
                  description="Software that reduces repetitive operational work."
                />
                <ServiceCard
                  icon={Sparkles}
                  title="Implementation"
                  description="Deployment, customization, and product improvements."
                />
                <ServiceCard
                  icon={Building2}
                  title="Ongoing support"
                  description="Maintenance and technical support after launch."
                />
              </div>
              <Button className="mt-6" asChild>
                <Link to="/custom-software">
                  Explore custom software <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="Customers"
          title="Who KRASIDGE serves"
          description="Individuals and organizations across home, garden, and software needs."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CUSTOMER_TYPES.map((type) => (
            <ServiceCard
              key={type.title}
              icon={type.icon}
              title={type.title}
              description={type.description}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/20 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Why KRASIDGE" title="Practical advantages" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_KRASIDGE.map((item) => (
              <ServiceCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="container-page flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Discuss products, landscape technology, or custom software
          </h2>
          <p className="max-w-2xl text-primary-foreground/90">
            Contact KRASIDGE LLC to inquire about home and garden products, AI landscape design
            solutions, or custom software services.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

export default HomePage;
