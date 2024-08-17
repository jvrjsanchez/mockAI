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
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:3001/service/:path*"
            : "/flask_api/index.py",
      },
    ];
  },
};

export default nextConfig;
