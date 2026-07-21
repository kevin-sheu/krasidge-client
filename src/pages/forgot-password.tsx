import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@krasidge/shared';
import type { z } from 'zod';
import { Mail } from 'lucide-react';
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

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(values: ForgotPasswordInput) {
    setFormError(null);
    try {
      await apiPost('/auth/forgot-password', values);
      setSubmitted(true);
    } catch (error) {
      setFormError(getErrorMessage(error, 'Unable to process your request'));
    }
  }

  return (
    <>
      <Seo title="Forgot Password | KRASIDGE LLC" description="Reset your KRASIDGE LLC account password." path="/forgot-password" noIndex />
      <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Forgot your password?</CardTitle>
            <CardDescription>Enter your email and we&apos;ll send reset instructions.</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  If an account exists for that email, password reset instructions have been sent.
                </AlertDescription>
              </Alert>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  {formError && (
                    <Alert variant="destructive">
                      <AlertDescription>{formError}</AlertDescription>
                    </Alert>
                  )}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input type="email" autoComplete="email" placeholder="jane@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Sending…' : 'Send reset instructions'}
                  </Button>
                </form>
              </Form>
            )}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              <Link to="/login" className="font-medium text-primary hover:underline">
                Back to sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
