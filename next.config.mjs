/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/guidelines", destination: "/how-it-works", permanent: true },
      { source: "/contact", destination: "/faq#contact", permanent: true },
      { source: "/announcements", destination: "/#updates", permanent: true },
      { source: "/the-x", destination: "/", permanent: true },
    ];
  },
};
export default nextConfig;
