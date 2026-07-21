import { INQUIRY_TYPE_LABELS, PRODUCT_CATEGORY_LABELS } from '@krasidge/shared';

export const COMPANY = {
  name: 'KRASIDGE LLC',
  tagline: 'Beautiful Spaces. Intelligent Solutions.',
  email: 'kazbek.maratov@krasidge.org',
  url: 'https://krasidge.org',
  address: {
    street: '5450 Tech Center Dr',
    city: 'Colorado Springs',
    state: 'CO',
    postalCode: '80918',
    country: 'United States',
  },
} as const;

export const COMPANY_ADDRESS_LINE = `${COMPANY.address.street}, ${COMPANY.address.city}, ${COMPANY.address.state} ${COMPANY.address.postalCode}`;

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  {
    label: 'AI Landscape Design',
    href: '/ai-landscape-design',
    description: 'Guided, technology-assisted outdoor space planning.',
  },
  {
    label: 'Custom Software',
    href: '/custom-software',
    description: 'Bespoke software built around how your business works.',
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS: { title: string; links: NavLink[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Products', href: '/products' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Divisions',
    links: [
      { label: 'AI Landscape Design', href: '/ai-landscape-design' },
      { label: 'Custom Software', href: '/custom-software' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  },
];

export const CATEGORY_LABELS = PRODUCT_CATEGORY_LABELS;
export const INQUIRY_LABELS = INQUIRY_TYPE_LABELS;

export const CATEGORY_OPTIONS = Object.entries(PRODUCT_CATEGORY_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export const INQUIRY_TYPE_OPTIONS = Object.entries(INQUIRY_TYPE_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export const ENVIRONMENT_LABELS: Record<string, string> = {
  indoor: 'Indoor',
  outdoor: 'Outdoor',
  both: 'Indoor & Outdoor',
};
