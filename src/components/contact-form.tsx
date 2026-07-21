import { useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput, type InquiryType } from '@krasidge/shared';
import { CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { apiPost, ApiError } from '@/lib/api';
import { INQUIRY_TYPE_OPTIONS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type ContactFormValues = Omit<ContactInput, 'consent'> & { consent: boolean };

interface ContactFormProps {
  defaultInquiryType?: InquiryType;
  title?: string;
}

export function ContactForm({ defaultInquiryType = 'general', title }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema) as unknown as Resolver<ContactFormValues>,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      inquiryType: defaultInquiryType,
      subject: '',
      message: '',
      consent: false,
      website: '',
    },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      await apiPost('/contact', values satisfies ContactFormValues as unknown as ContactInput);
      setSubmitted(true);
      toast.success('Message sent', {
        description: "Thank you for reaching out — we'll be in touch shortly.",
      });
      form.reset({ ...values, name: '', email: '', phone: '', company: '', subject: '', message: '', consent: false });
    } catch (error) {
      if (error instanceof ApiError && error.errors) {
        for (const [field, messages] of Object.entries(error.errors)) {
          form.setError(field as keyof ContactFormValues, { message: messages[0] });
        }
      }
      toast.error('Unable to send message', {
        description: error instanceof ApiError ? error.message : 'Please try again in a moment.',
      });
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-6 py-12 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <h3 className="font-display text-xl font-semibold">Thank you</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Your message has been received. Our team will respond to you at the email address you provided.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      {title && <h3 className="mb-6 font-display text-2xl font-semibold">{title}</h3>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" autoComplete="name" {...field} />
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
                  <Input type="email" placeholder="jane@example.com" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone (optional)</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="(555) 555-5555" autoComplete="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Company name" autoComplete="organization" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="inquiryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What can we help with?</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an inquiry type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {INQUIRY_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Brief summary of your inquiry" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea rows={6} placeholder="Tell us more about what you need…" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Honeypot field — visually hidden from sighted users, left empty by real visitors */}
        <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...form.register('website')}
          />
        </div>

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-md border border-border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-normal">
                  I consent to KRASIDGE LLC contacting me about this inquiry.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Sending…' : 'Send message'}
        </Button>
      </form>
    </Form>
  );
}
