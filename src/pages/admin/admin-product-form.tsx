import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  productCategories,
  productEnvironments,
  type ProductCategory,
  type ProductEnvironment,
} from '@krasidge/shared';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { apiGet, apiPatch, apiPost, getErrorMessage } from '@/lib/api';
import type { Paginated, Product } from '@/lib/types';
import { CATEGORY_LABELS, ENVIRONMENT_LABELS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingState } from '@/components/loading-state';

interface ProductFormValues {
  name: string;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  environment: ProductEnvironment;
  materials: string;
  colors: string;
  length: string;
  width: string;
  height: string;
  unit: string;
  dimensionNotes: string;
  images: { url: string; alt: string }[];
  featured: boolean;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
}

const EMPTY_VALUES: ProductFormValues = {
  name: '',
  shortDescription: '',
  description: '',
  category: 'other',
  environment: 'both',
  materials: '',
  colors: '',
  length: '',
  width: '',
  height: '',
  unit: '',
  dimensionNotes: '',
  images: [{ url: '', alt: '' }],
  featured: false,
  published: false,
  seoTitle: '',
  seoDescription: '',
};

function productToFormValues(product: Product): ProductFormValues {
  return {
    name: product.name,
    shortDescription: product.shortDescription,
    description: product.description,
    category: product.category,
    environment: product.environment,
    materials: product.materials.join(', '),
    colors: product.colors.join(', '),
    length: product.dimensions?.length ?? '',
    width: product.dimensions?.width ?? '',
    height: product.dimensions?.height ?? '',
    unit: product.dimensions?.unit ?? '',
    dimensionNotes: product.dimensions?.notes ?? '',
    images: product.images.length > 0 ? product.images.map((i) => ({ url: i.url, alt: i.alt })) : [{ url: '', alt: '' }],
    featured: product.featured,
    published: product.published,
    seoTitle: product.seoTitle ?? '',
    seoDescription: product.seoDescription ?? '',
  };
}

export function AdminProductFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: allProducts, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['admin', 'products', 'all'],
    queryFn: () => apiGet<Paginated<Product>>('/admin/products', { params: { limit: 100, includeArchived: true } }),
    enabled: isEdit,
  });

  const existingProduct = allProducts?.items.find((product) => product.id === id);

  const form = useForm<ProductFormValues>({ defaultValues: EMPTY_VALUES });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'images' });

  useEffect(() => {
    if (existingProduct) {
      form.reset(productToFormValues(existingProduct));
    }
  }, [existingProduct, form]);

  const saveMutation = useMutation({
    mutationFn: async (values: ProductFormValues) => {
      const payload = {
        name: values.name,
        shortDescription: values.shortDescription,
        description: values.description,
        category: values.category,
        environment: values.environment,
        materials: values.materials.split(',').map((m) => m.trim()).filter(Boolean),
        colors: values.colors.split(',').map((c) => c.trim()).filter(Boolean),
        dimensions: {
          length: values.length || undefined,
          width: values.width || undefined,
          height: values.height || undefined,
          unit: values.unit || undefined,
          notes: values.dimensionNotes || undefined,
        },
        images: values.images
          .filter((image) => image.url.trim())
          .map((image, index) => ({ url: image.url.trim(), alt: image.alt.trim() || values.name, sortOrder: index })),
        featured: values.featured,
        published: values.published,
        seoTitle: values.seoTitle || undefined,
        seoDescription: values.seoDescription || undefined,
      };

      if (isEdit && id) {
        return apiPatch<{ product: Product }>(`/admin/products/${id}`, payload);
      }
      return apiPost<{ product: Product }>('/admin/products', payload);
    },
    onSuccess: () => {
      toast.success(isEdit ? 'Product updated' : 'Product created');
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/admin/products');
    },
    onError: (error) => {
      toast.error('Unable to save product', { description: getErrorMessage(error) });
    },
  });

  if (isEdit && isLoadingProduct) {
    return <LoadingState label="Loading product…" />;
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">{isEdit ? 'Edit product' : 'New product'}</h1>
        <p className="text-sm text-muted-foreground">
          {isEdit ? 'Update this product listing.' : 'Create a new product listing for the catalog.'}
        </p>
      </div>

      <form onSubmit={form.handleSubmit((values) => saveMutation.mutate(values))} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...form.register('name', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short description</Label>
              <Textarea id="shortDescription" rows={2} {...form.register('shortDescription', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Full description</Label>
              <Textarea id="description" rows={5} {...form.register('description', { required: true })} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={form.watch('category')}
                  onValueChange={(value) => form.setValue('category', value as ProductCategory)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {productCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {CATEGORY_LABELS[category]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Environment</Label>
                <Select
                  value={form.watch('environment')}
                  onValueChange={(value) => form.setValue('environment', value as ProductEnvironment)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {productEnvironments.map((environment) => (
                      <SelectItem key={environment} value={environment}>
                        {ENVIRONMENT_LABELS[environment]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="materials">Materials (comma separated)</Label>
                <Input id="materials" placeholder="Ceramic, Resin" {...form.register('materials')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="colors">Colors (comma separated)</Label>
                <Input id="colors" placeholder="Matte white, Charcoal" {...form.register('colors')} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dimensions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="length">Length</Label>
              <Input id="length" {...form.register('length')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input id="width" {...form.register('width')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input id="height" {...form.register('height')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input id="unit" placeholder="in" {...form.register('unit')} />
            </div>
            <div className="col-span-full space-y-2">
              <Label htmlFor="dimensionNotes">Notes</Label>
              <Input id="dimensionNotes" {...form.register('dimensionNotes')} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="grid gap-3 sm:grid-cols-[2fr_2fr_auto] sm:items-end">
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input placeholder="/images/products/example.jpg" {...form.register(`images.${index}.url`)} />
                </div>
                <div className="space-y-2">
                  <Label>Alt text</Label>
                  <Input placeholder="Describe the image" {...form.register(`images.${index}.alt`)} />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => append({ url: '', alt: '' })}>
              <Plus className="h-4 w-4" /> Add image
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Search engine details (optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seoTitle">SEO title</Label>
              <Input id="seoTitle" {...form.register('seoTitle')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seoDescription">SEO description</Label>
              <Textarea id="seoDescription" rows={2} {...form.register('seoDescription')} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Switch checked={form.watch('featured')} onCheckedChange={(checked) => form.setValue('featured', checked)} />
              <Label>Featured</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.watch('published')} onCheckedChange={(checked) => form.setValue('published', checked)} />
              <Label>Published</Label>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/products')}>
            Cancel
          </Button>
          <Button type="submit" disabled={saveMutation.isPending}>
            {saveMutation.isPending ? 'Saving…' : isEdit ? 'Save changes' : 'Create product'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminProductFormPage;
