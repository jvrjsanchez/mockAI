/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true
  },
  rewrites: async () => {
    return [
      {
        source: "/service/:path*",
        destination:
          process.env.NODE_ENV === "development"
          ? "http://localhost:3001/service/:path*"
          : "/api/",
      },
    ];
  },
};

export default nextConfig;
