import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@krasidge/shared';
import type { z } from 'zod';
import { CheckCircle2 } from 'lucide-react';
import { apiPost, getErrorMessage } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Seo } from '@/components/seo';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordPage() {
  const { token: tokenParam } = useParams();
  const [searchParams] = useSearchParams();
  const token = tokenParam ?? searchParams.get('token') ?? '';
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token, password: '', confirmPassword: '' },
  });

  async function onSubmit(values: ResetPasswordInput) {
    setFormError(null);
    try {
      await apiPost('/auth/reset-password', values);
      setSubmitted(true);
    } catch (error) {
      setFormError(getErrorMessage(error, 'This password reset link is invalid or has expired.'));
    }
  }

  if (!token) {
    return (
      <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            This password reset link is missing a token. Please request a new one from the{' '}
            <Link to="/forgot-password" className="underline">
              forgot password
            </Link>{' '}
            page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <Seo title="Reset Password | KRASIDGE LLC" description="Reset your KRASIDGE LLC account password." path="/reset-password" noIndex />
      <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Set a new password</CardTitle>
            <CardDescription>Choose a strong password for your account.</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="space-y-4 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Your password has been updated. You can now sign in.
                </p>
                <Button className="w-full" onClick={() => navigate('/login')}>
                  Go to sign in
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  {formError && (
                    <Alert variant="destructive">
                      <AlertDescription>{formError}</AlertDescription>
                    </Alert>
                  )}
                  <input type="hidden" {...form.register('token')} />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New password</FormLabel>
                        <FormControl>
                          <Input type="password" autoComplete="new-password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm new password</FormLabel>
                        <FormControl>
                          <Input type="password" autoComplete="new-password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Updating…' : 'Update password'}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default ResetPasswordPage;
