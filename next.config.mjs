/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/admincircuitx/:path*", // also matches /admincircuitx itself
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "same-origin" },
        ],
      },
    ];
  },
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
