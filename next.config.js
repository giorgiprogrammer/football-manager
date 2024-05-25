/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hlbtjfccobphbehsryid.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
