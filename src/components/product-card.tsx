import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import type { Product } from '@/lib/types';
import { CATEGORY_LABELS, ENVIRONMENT_LABELS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/image-with-fallback';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images[0];

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <ImageWithFallback
            src={primaryImage?.url}
            alt={primaryImage?.alt ?? product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.featured && <Badge>Featured</Badge>}
            {product.isSample && (
              <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-800">
                Sample
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="space-y-2 p-5">
          <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-primary">
            <Leaf className="h-3.5 w-3.5" />
            {CATEGORY_LABELS[product.category]}
          </div>
          <h3 className="font-display text-lg font-semibold leading-snug">{product.name}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>
          <p className="pt-1 text-xs text-muted-foreground">{ENVIRONMENT_LABELS[product.environment]}</p>
        </CardContent>
      </Link>
    </Card>
  );
}
