/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => {
    return [
      {
        source: "/service/:path*",
        destination: "http://localhost:3001/service/:path*",
      },
    ];
  },
};

export default nextConfig;
