import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '@krasidge/shared';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { ApiError, getErrorMessage } from '@/lib/api';
import logoUrl from '@/assets/krasidge-logo.png';
import { COMPANY } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
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

type RegisterFormValues = Omit<RegisterInput, 'acceptTerms'> & { acceptTerms: boolean };

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema) as never,
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', acceptTerms: false },
  });

  async function onSubmit(values: RegisterFormValues) {
    setFormError(null);
    try {
      await register(values as unknown as RegisterInput);
      toast.success('Account created', { description: 'Welcome to KRASIDGE LLC.' });
      navigate('/', { replace: true });
    } catch (error) {
      setFormError(getErrorMessage(error, 'Unable to create your account'));
      if (error instanceof ApiError && error.errors) {
        for (const [field, messages] of Object.entries(error.errors)) {
          form.setError(field as keyof RegisterFormValues, { message: messages[0] });
        }
      }
    }
  }

  return (
    <>
      <Seo title="Create an Account | KRASIDGE LLC" description="Create a KRASIDGE LLC account." path="/register" noIndex />
      <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-4">
            <Link to="/" className="mx-auto block w-fit" aria-label={`${COMPANY.name} home`}>
              <img
                src={logoUrl}
                alt={`${COMPANY.name} logo`}
                className="h-14 w-auto max-w-[240px] object-contain"
              />
            </Link>
            <div className="space-y-1.5 text-center">
              <CardTitle>Create an account</CardTitle>
              <CardDescription>Sign up to save inquiries and track your requests.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {formError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input autoComplete="name" placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
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
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input type="password" autoComplete="new-password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start gap-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal">
                          I agree to the{' '}
                          <Link to="/terms" className="text-primary hover:underline">
                            Terms of Use
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                          .
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Creating account…' : 'Create account'}
                </Button>
              </form>
            </Form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default RegisterPage;
