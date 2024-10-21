/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "via.placeholder.com",
      "www.google.com",
      "lh6.googleusercontent.com",
      "images.app.goo.gl",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://blog-api-xi8k.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
