import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Package, Pencil, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { apiDelete, apiGet, getErrorMessage } from '@/lib/api';
import type { Paginated, Product } from '@/lib/types';
import { CATEGORY_LABELS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/error-state';
import { EmptyState } from '@/components/empty-state';
import { ConfirmationDialog } from '@/components/confirmation-dialog';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

export function AdminProductsPage() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 350);
  const [pendingDelete, setPendingDelete] = useState<Product | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin', 'products', debouncedSearch],
    queryFn: () =>
      apiGet<Paginated<Product>>('/admin/products', {
        params: { search: debouncedSearch || undefined, limit: 50, includeArchived: true },
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (product: Product) => apiDelete(`/admin/products/${product.id}`),
    onSuccess: () => {
      toast.success('Product archived');
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      setPendingDelete(null);
    },
    onError: (error) => {
      toast.error('Unable to archive product', { description: getErrorMessage(error) });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Products</h1>
          <p className="text-sm text-muted-foreground">Manage your product catalog.</p>
        </div>
        <Button asChild>
          <Link to="/admin/products/new">
            <Plus className="h-4 w-4" /> New product
          </Link>
        </Button>
      </div>

      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search products…"
        className="max-w-sm"
      />

      {isLoading ? (
        <LoadingState label="Loading products…" />
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : !data || data.items.length === 0 ? (
        <EmptyState icon={Package} title="No products found" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-2 font-medium">
                    {product.name}
                    {product.isSample && (
                      <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-800">
                        Sample
                      </Badge>
                    )}
                    {product.featured && <Badge>Featured</Badge>}
                  </div>
                </TableCell>
                <TableCell>{CATEGORY_LABELS[product.category]}</TableCell>
                <TableCell>
                  {product.archived ? (
                    <Badge variant="destructive">Archived</Badge>
                  ) : product.published ? (
                    <Badge variant="success">Published</Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/admin/products/${product.id}/edit`} aria-label={`Edit ${product.name}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setPendingDelete(product)}
                      aria-label={`Archive ${product.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <ConfirmationDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Archive this product?"
        description={`"${pendingDelete?.name}" will be unpublished and archived. This can be reversed by editing the product.`}
        confirmLabel="Archive"
        destructive
        isLoading={deleteMutation.isPending}
        onConfirm={() => pendingDelete && deleteMutation.mutate(pendingDelete)}
      />
    </div>
  );
}

export default AdminProductsPage;
