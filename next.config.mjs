/** @type {import('next').NextConfig} */
let nextConfig = {
  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
};

if (process.env.NODE_ENV === "production") {
  const withNextBundleAnalyzer = (await import("next-bundle-analyzer").then(m => m.default))();
  nextConfig = withNextBundleAnalyzer(nextConfig);
}

export default nextConfig;
