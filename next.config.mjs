/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/guidelines", destination: "/#journey", permanent: true },
      { source: "/how-it-works", destination: "/#journey", permanent: true },
      { source: "/contact", destination: "/faq#contact", permanent: true },
      { source: "/domains", destination: "/themes", permanent: true },
      { source: "/announcements", destination: "/#updates", permanent: true },
      { source: "/the-x", destination: "/", permanent: true },
    ];
  },
};
export default nextConfig;
