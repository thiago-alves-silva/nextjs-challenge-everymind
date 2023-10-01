/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "vlibras.gov.br",
      //   pathname: "/",
      //   port: "",
      // },
    ],
  },
  async redirects() {
    return [
      {
        source: "/dashboard/:path*",
        destination: "/",
        permanent: false,
        missing: [
          {
            type: "cookie",
            key: "token",
          },
        ],
      },
      {
        source: "/",
        destination: "/dashboard",
        permanent: false,
        has: [
          {
            type: "cookie",
            key: "token",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
