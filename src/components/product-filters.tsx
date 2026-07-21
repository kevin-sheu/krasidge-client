import { Search, X } from 'lucide-react';
import { CATEGORY_OPTIONS } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface ProductFilterState {
  search: string;
  category: string;
  environment: string;
}

interface ProductFiltersProps {
  value: ProductFilterState;
  onChange: (value: ProductFilterState) => void;
}

const ENVIRONMENT_OPTIONS = [
  { value: 'all', label: 'All environments' },
  { value: 'indoor', label: 'Indoor' },
  { value: 'outdoor', label: 'Outdoor' },
];

export function ProductFilters({ value, onChange }: ProductFiltersProps) {
  const hasActiveFilters = value.search || value.category !== 'all' || value.environment !== 'all';

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value.search}
          onChange={(event) => onChange({ ...value, search: event.target.value })}
          placeholder="Search products…"
          className="pl-9"
          aria-label="Search products"
        />
      </div>

      <Select value={value.category} onValueChange={(category) => onChange({ ...value, category })}>
        <SelectTrigger className="sm:w-52" aria-label="Filter by category">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {CATEGORY_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={value.environment} onValueChange={(environment) => onChange({ ...value, environment })}>
        <SelectTrigger className="sm:w-48" aria-label="Filter by environment">
          <SelectValue placeholder="Environment" />
        </SelectTrigger>
        <SelectContent>
          {ENVIRONMENT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground"
          onClick={() => onChange({ search: '', category: 'all', environment: 'all' })}
        >
          <X className="h-3.5 w-3.5" /> Clear
        </Button>
      )}
    </div>
  );
}
