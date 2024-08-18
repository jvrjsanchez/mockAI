/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracing: true,
  outputFileTracingIncludes: [
    "**/*.py",
    "**/api/**/*.py",
    "**/static/**/*",
  ],

  rewrites: async () => {
    return [
      {
        source: "/service/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? "/api/"
            : "http://127.0.0.1:3001/service/:path*",

        // Resource: https://vercel.com/docs/projects/environment-variables/system-environment-variables
      },
    ];
  },
};

module.exports = nextConfig;
