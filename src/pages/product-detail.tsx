import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Mail } from 'lucide-react';
import { apiGet } from '@/lib/api';
import type { Product } from '@/lib/types';
import { CATEGORY_LABELS, ENVIRONMENT_LABELS } from '@/lib/constants';
import { Seo } from '@/components/seo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageWithFallback } from '@/components/image-with-fallback';
import { ErrorState } from '@/components/error-state';
import { ProductGrid } from '@/components/product-grid';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function ProductDetailPage() {
  const { slug = '' } = useParams();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products', slug],
    queryFn: () => apiGet<{ product: Product; related: Product[] }>(`/products/${slug}`),
    enabled: Boolean(slug),
  });

  if (isLoading) {
    return (
      <div className="container-page space-y-6 py-12">
        <Skeleton className="h-6 w-64" />
        <div className="grid gap-10 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="container-page py-16">
        <ErrorState title="Product not found" onRetry={() => refetch()} />
      </div>
    );
  }

  const { product, related } = data;
  const primaryImage = product.images[0];

  return (
    <>
      <Seo
        title={product.seoTitle || `${product.name} | KRASIDGE LLC`}
        description={product.seoDescription || product.shortDescription}
        path={`/products/${product.slug}`}
        image={primaryImage?.url}
        type="product"
      />

      <div className="container-page space-y-10 py-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/products">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <ImageWithFallback src={primaryImage?.url} alt={primaryImage?.alt ?? product.name} className="h-full w-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(1, 5).map((image) => (
                  <div key={image.url} className="aspect-square overflow-hidden rounded-md bg-muted">
                    <ImageWithFallback src={image.url} alt={image.alt} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{CATEGORY_LABELS[product.category]}</Badge>
              <Badge variant="outline">{ENVIRONMENT_LABELS[product.environment]}</Badge>
              {product.featured && <Badge>Featured</Badge>}
              {product.isSample && (
                <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-800">
                  Sample product
                </Badge>
              )}
            </div>

            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>
            <p className="text-muted-foreground">{product.shortDescription}</p>

            <Separator />

            <div className="space-y-2 text-sm">
              {product.materials.length > 0 && (
                <p>
                  <span className="font-medium text-foreground">Materials: </span>
                  <span className="text-muted-foreground">{product.materials.join(', ')}</span>
                </p>
              )}
              {product.colors.length > 0 && (
                <p>
                  <span className="font-medium text-foreground">Colors: </span>
                  <span className="text-muted-foreground">{product.colors.join(', ')}</span>
                </p>
              )}
              {product.dimensions && Object.values(product.dimensions).some(Boolean) && (
                <p>
                  <span className="font-medium text-foreground">Dimensions: </span>
                  <span className="text-muted-foreground">
                    {[product.dimensions.length, product.dimensions.width, product.dimensions.height]
                      .filter(Boolean)
                      .join(' × ')}
                    {product.dimensions.unit ? ` ${product.dimensions.unit}` : ''}
                    {product.dimensions.notes ? ` — ${product.dimensions.notes}` : ''}
                  </span>
                </p>
              )}
            </div>

            <p className="whitespace-pre-line text-muted-foreground">{product.description}</p>

            <Button size="lg" asChild>
              <Link to={`/contact?inquiryType=product-inquiry&subject=${encodeURIComponent(product.name)}`}>
                <Mail className="h-4 w-4" /> Inquire about this product
              </Link>
            </Button>
          </div>
        </div>

        {related.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">You may also like</h2>
              <Button variant="ghost" asChild>
                <Link to="/products">
                  <ArrowLeft className="h-4 w-4" /> Back to products
                </Link>
              </Button>
            </div>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetailPage;
