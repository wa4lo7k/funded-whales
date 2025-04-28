import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fundedwhales.com';

  // Define all static routes
  const routes = [
    '',
    '/landing',
    '/challenges',
    '/why-us',
    '/how-it-works',
    '/pricing',
    '/faq',
    '/login',
    '/register',
    '/calculator',
    '/dashboard',
  ];

  // Create sitemap entries
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' || route === '/landing' ? 1.0 : 0.8,
  })) as MetadataRoute.Sitemap;
}
