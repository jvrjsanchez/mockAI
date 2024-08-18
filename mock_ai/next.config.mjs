/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  rewrites: async () => {
    return [
      {
        source: "/service/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? "/flask_api/"
            : "http://127.0.0.1:3001/service/:path*",
      },
    ];
  },
};

export default nextConfig;
