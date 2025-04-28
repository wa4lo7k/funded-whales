import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  serverExternalPackages: [],
  transpilePackages: ['@babel/plugin-syntax-import-attributes'],

  // Disable ESLint during production builds
  eslint: {
    // Only run ESLint in development, not during builds
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript type checking during builds
  typescript: {
    // Only run type checking in development, not during builds
    ignoreBuildErrors: true,
  },
};

export default bundleAnalyzer(nextConfig);
