import { Helmet } from 'react-helmet-async';
import { COMPANY } from '@/lib/constants';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article' | 'product';
}

const DEFAULT_IMAGE = `${COMPANY.url}/images/hero/hero-landscape.jpg`;

export function Seo({ title, description, path = '', image, noIndex, type = 'website' }: SeoProps) {
  const fullTitle = title.includes(COMPANY.name) ? title : `${title} | ${COMPANY.name}`;
  const canonical = `${COMPANY.url}${path}`;
  const ogImage = image ?? DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={COMPANY.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}

export function OrganizationJsonLd() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.name,
    url: COMPANY.url,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.state,
      postalCode: COMPANY.address.postalCode,
      addressCountry: 'US',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(json)}</script>
    </Helmet>
  );
}
