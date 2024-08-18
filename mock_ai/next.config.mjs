/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
  reactStrictMode: false,
=======
  typescript: {
    ignoreBuildErrors: true,
  },
>>>>>>> main
  rewrites: async () => {
    return [
      {
        source: "/service/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? "/flask_api/"
            : "http://127.0.0.1:3001/service/:path*",

        // Resource: https://vercel.com/docs/projects/environment-variables/system-environment-variables
      },
    ];
  },
};

export default nextConfig;
