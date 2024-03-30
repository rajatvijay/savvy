/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/pending-categorization",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
