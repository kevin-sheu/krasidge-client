import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userRoles, userStatuses, type UserRole, type UserStatus } from '@krasidge/shared';
import { Users as UsersIcon } from 'lucide-react';
import { toast } from 'sonner';
import { apiGet, apiPatch, getErrorMessage } from '@/lib/api';
import type { Paginated, User } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/error-state';
import { EmptyState } from '@/components/empty-state';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { formatDate } from '@/lib/utils';

export function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 350);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin', 'users', debouncedSearch],
    queryFn: () => apiGet<Paginated<User>>('/admin/users', { params: { search: debouncedSearch || undefined, limit: 50 } }),
  });

  const roleMutation = useMutation({
    mutationFn: (input: { id: string; role: UserRole }) =>
      apiPatch<{ user: User }>(`/admin/users/${input.id}/role`, { role: input.role }),
    onSuccess: () => {
      toast.success('Role updated');
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
    onError: (error) => toast.error('Unable to update role', { description: getErrorMessage(error) }),
  });

  const statusMutation = useMutation({
    mutationFn: (input: { id: string; status: UserStatus }) =>
      apiPatch<{ user: User }>(`/admin/users/${input.id}/status`, { status: input.status }),
    onSuccess: () => {
      toast.success('Status updated');
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
    onError: (error) => toast.error('Unable to update status', { description: getErrorMessage(error) }),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Users</h1>
        <p className="text-sm text-muted-foreground">Manage account roles and status.</p>
      </div>

      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by name or email…"
        className="max-w-sm"
      />

      {isLoading ? (
        <LoadingState label="Loading users…" />
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : !data || data.items.length === 0 ? (
        <EmptyState icon={UsersIcon} title="No users found" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((user) => {
              const userId = user.id ?? user._id ?? '';
              const isSelf = userId === (currentUser?.id ?? currentUser?._id);
              return (
                <TableRow key={userId}>
                  <TableCell>
                    <p className="font-medium">
                      {user.name} {isSelf && <Badge variant="outline" className="ml-2">You</Badge>}
                    </p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(role) => roleMutation.mutate({ id: userId, role: role as UserRole })}
                      disabled={isSelf}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {userRoles.map((role) => (
                          <SelectItem key={role} value={role} className="capitalize">
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.status}
                      onValueChange={(status) => statusMutation.mutate({ id: userId, status: status as UserStatus })}
                      disabled={isSelf}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {userStatuses.map((status) => (
                          <SelectItem key={status} value={status} className="capitalize">
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default AdminUsersPage;
