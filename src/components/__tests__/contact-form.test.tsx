import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/contact-form';

describe('ContactForm', () => {
  it('shows validation errors when required fields are missing', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument();
      expect(screen.getByText(/subject must be at least 3 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/consent is required/i)).toBeInTheDocument();
    });
  });

  it('renders a visually hidden honeypot field that is empty by default', () => {
    render(<ContactForm />);

    const honeypot = screen.getByLabelText('Website', { selector: 'input' }) as HTMLInputElement;
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute('tabIndex', '-1');
    expect(honeypot.value).toBe('');
    expect(honeypot.closest('div')).toHaveAttribute('aria-hidden', 'true');
  });
});
