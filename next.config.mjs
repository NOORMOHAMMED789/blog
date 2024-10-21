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
};

export default nextConfig;
