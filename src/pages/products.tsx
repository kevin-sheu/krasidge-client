import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/lib/api';
import type { Paginated, Product } from '@/lib/types';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { ProductFilters, type ProductFilterState } from '@/components/product-filters';
import { ProductGrid } from '@/components/product-grid';
import { ErrorState } from '@/components/error-state';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ProductFilterState = {
    search: searchParams.get('search') ?? '',
    category: searchParams.get('category') ?? 'all',
    environment: searchParams.get('environment') ?? 'all',
  };
  const page = Number(searchParams.get('page') ?? '1') || 1;
  const debouncedSearch = useDebouncedValue(filters.search, 350);

  function updateFilters(next: ProductFilterState) {
    const params = new URLSearchParams();
    if (next.search) params.set('search', next.search);
    if (next.category !== 'all') params.set('category', next.category);
    if (next.environment !== 'all') params.set('environment', next.environment);
    setSearchParams(params);
  }

  function goToPage(nextPage: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(nextPage));
    setSearchParams(params);
  }

  const queryParams = useMemo(
    () => ({
      page,
      limit: 12,
      search: debouncedSearch || undefined,
      category: filters.category !== 'all' ? filters.category : undefined,
      environment: filters.environment !== 'all' ? filters.environment : undefined,
    }),
    [page, debouncedSearch, filters.category, filters.environment],
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => apiGet<Paginated<Product>>('/products', { params: queryParams }),
    placeholderData: (previous) => previous,
  });

  const totalPages = data?.pagination.totalPages ?? 1;

  return (
    <>
      <Seo
        title="Products | KRASIDGE LLC"
        description="Browse decorative garden and home products from KRASIDGE LLC, including planters, figurines, vases, and outdoor décor."
        path="/products"
      />

      <PageHero
        eyebrow="Catalog"
        title="Décor products"
        description="Browse our catalog of decorative products for indoor and outdoor spaces."
        size="compact"
      />

      <section className="container-page space-y-8 py-12">
        <ProductFilters value={filters} onChange={updateFilters} />

        {isError ? (
          <ErrorState onRetry={() => refetch()} title="We couldn't load products" />
        ) : (
          <>
            <ProductGrid products={data?.items ?? []} isLoading={isLoading && !data} />

            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => goToPage(Math.max(1, page - 1))}
                      className={page <= 1 ? 'pointer-events-none opacity-50' : undefined}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink isActive={page === index + 1} onClick={() => goToPage(index + 1)}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => goToPage(Math.min(totalPages, page + 1))}
                      className={page >= totalPages ? 'pointer-events-none opacity-50' : undefined}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default ProductsPage;
