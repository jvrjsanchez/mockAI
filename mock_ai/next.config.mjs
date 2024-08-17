/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  rewrites: async () => {
    return [
      {
        source: "/service/:path*",
        destination:
          process.env.NEXT_PUBLIC_VERCEL_URL
            ? "http://127.0.0.1:3001/service/:path*"
            : "/flask_api/",
      },
    ];
  },
};

export default nextConfig;
