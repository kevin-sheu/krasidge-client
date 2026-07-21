import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { inquiryStatuses, type InquiryStatus } from '@krasidge/shared';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';
import { apiGet, apiPatch, getErrorMessage } from '@/lib/api';
import type { ContactInquiry, Paginated } from '@/lib/types';
import { INQUIRY_LABELS } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/error-state';
import { EmptyState } from '@/components/empty-state';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

const STATUS_VARIANT: Record<InquiryStatus, 'secondary' | 'success' | 'warning' | 'outline'> = {
  new: 'warning',
  'in-progress': 'secondary',
  resolved: 'success',
  archived: 'outline',
};

export function AdminInquiriesPage() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 350);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selected, setSelected] = useState<ContactInquiry | null>(null);
  const [notes, setNotes] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin', 'inquiries', debouncedSearch, statusFilter],
    queryFn: () =>
      apiGet<Paginated<ContactInquiry>>('/admin/contact', {
        params: {
          search: debouncedSearch || undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          limit: 50,
        },
      }),
  });

  const updateMutation = useMutation({
    mutationFn: (input: { id: string; status?: InquiryStatus; internalNotes?: string }) =>
      apiPatch<{ inquiry: ContactInquiry }>(`/admin/contact/${input.id}`, {
        status: input.status,
        internalNotes: input.internalNotes,
      }),
    onSuccess: ({ inquiry }) => {
      toast.success('Inquiry updated');
      queryClient.invalidateQueries({ queryKey: ['admin', 'inquiries'] });
      setSelected(inquiry);
    },
    onError: (error) => toast.error('Unable to update inquiry', { description: getErrorMessage(error) }),
  });

  function openDetail(inquiry: ContactInquiry) {
    setSelected(inquiry);
    setNotes(inquiry.internalNotes ?? '');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Inquiries</h1>
        <p className="text-sm text-muted-foreground">Review and respond to contact form submissions.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search inquiries…"
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {inquiryStatuses.map((status) => (
              <SelectItem key={status} value={status} className="capitalize">
                {status.replace('-', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <LoadingState label="Loading inquiries…" />
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : !data || data.items.length === 0 ? (
        <EmptyState icon={Mail} title="No inquiries found" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell>
                  <p className="font-medium">{inquiry.name}</p>
                  <p className="text-xs text-muted-foreground">{inquiry.email}</p>
                </TableCell>
                <TableCell className="max-w-64 truncate">{inquiry.subject}</TableCell>
                <TableCell>{INQUIRY_LABELS[inquiry.inquiryType]}</TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[inquiry.status]} className="capitalize">
                    {inquiry.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => openDetail(inquiry)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {selected && (
            <div className="space-y-5">
              <SheetHeader>
                <SheetTitle>{selected.subject}</SheetTitle>
              </SheetHeader>

              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">From: </span>
                  {selected.name} ({selected.email})
                </p>
                {selected.phone && (
                  <p>
                    <span className="font-medium">Phone: </span>
                    {selected.phone}
                  </p>
                )}
                {selected.company && (
                  <p>
                    <span className="font-medium">Company: </span>
                    {selected.company}
                  </p>
                )}
                <p>
                  <span className="font-medium">Type: </span>
                  {INQUIRY_LABELS[selected.inquiryType]}
                </p>
              </div>

              <div className="rounded-md border border-border bg-muted/40 p-3 text-sm">{selected.message}</div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={selected.status}
                  onValueChange={(status) =>
                    updateMutation.mutate({ id: selected.id, status: status as InquiryStatus })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {inquiryStatuses.map((status) => (
                      <SelectItem key={status} value={status} className="capitalize">
                        {status.replace('-', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Internal notes</label>
                <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} />
                <Button
                  size="sm"
                  onClick={() => updateMutation.mutate({ id: selected.id, internalNotes: notes })}
                  disabled={updateMutation.isPending}
                >
                  Save notes
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AdminInquiriesPage;
