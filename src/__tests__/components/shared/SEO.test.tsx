import React from 'react';
import { render } from '@testing-library/react';
import { SEO } from '@/components/shared/seo';

// Mock next/head
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="head">{children}</div>,
  };
});

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/test-path',
  }),
}));

describe('SEO', () => {
  beforeEach(() => {
    // Set environment variable
    process.env.NEXT_PUBLIC_SITE_URL = 'https://fundeddolphin.com';
  });

  afterEach(() => {
    // Reset environment variable
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  it('renders with default props', () => {
    const { container } = render(<SEO />);

    // Get the HTML as a string
    const html = container.innerHTML;

    // Check if default title is included
    expect(html).toContain('<title>Funded Whales | Proprietary Trading Firm for Forex & Futures</title>');

    // Check if default description is included
    expect(html).toContain('Get funded to trade forex, futures, and crypto with Funded Whales');

    // Check if default keywords are included
    expect(html).toContain('funded trading, prop firm, proprietary trading');

    // Check if Open Graph tags are included
    expect(html).toContain('<meta property="og:title"');
    expect(html).toContain('<meta property="og:description"');
    expect(html).toContain('<meta property="og:url" content="https://fundedwhales.com/test-path"');
    expect(html).toContain('<meta property="og:type" content="website"');
    expect(html).toContain('<meta property="og:image" content="https://fundedwhales.com/og-image.jpg"');

    // Check if Twitter tags are included
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image"');
    expect(html).toContain('<meta name="twitter:title"');
    expect(html).toContain('<meta name="twitter:description"');
    expect(html).toContain('<meta name="twitter:image"');

    // Check if canonical URL is included
    expect(html).toContain('<link rel="canonical" href="https://fundedwhales.com/test-path"');

    // Check if favicon links are included
    expect(html).toContain('<link rel="icon" href="/favicon.ico"');
    expect(html).toContain('<link rel="apple-touch-icon"');
    expect(html).toContain('<link rel="manifest" href="/site.webmanifest"');

    // Check if preconnect links are included
    expect(html).toContain('<link rel="preconnect" href="https://fonts.googleapis.com"');
    expect(html).toContain('<link rel="preconnect" href="https://fonts.gstatic.com"');
    expect(html).toContain('<link rel="preconnect" href="https://s3.tradingview.com"');
  });

  it('renders with custom props', () => {
    const { container } = render(
      <SEO
        title="Custom Title"
        description="Custom description for testing"
        keywords="test, seo, custom"
        ogImage="/custom-image.jpg"
        ogType="article"
        twitterCard="summary"
        canonicalUrl="https://fundeddolphin.com/custom-url"
        noIndex={true}
      />
    );

    // Get the HTML as a string
    const html = container.innerHTML;

    // Check if custom title is included
    expect(html).toContain('<title>Custom Title</title>');

    // Check if custom description is included
    expect(html).toContain('Custom description for testing');

    // Check if custom keywords are included
    expect(html).toContain('test, seo, custom');

    // Check if custom Open Graph tags are included
    expect(html).toContain('<meta property="og:title" content="Custom Title"');
    expect(html).toContain('<meta property="og:type" content="article"');
    expect(html).toContain('<meta property="og:image" content="https://fundedwhales.com/custom-image.jpg"');

    // Check if custom Twitter tags are included
    expect(html).toContain('<meta name="twitter:card" content="summary"');

    // Check if custom canonical URL is included
    expect(html).toContain('<link rel="canonical" href="https://fundeddolphin.com/custom-url"');

    // Check if noIndex is included
    expect(html).toContain('<meta name="robots" content="noindex, nofollow"');
  });
});
