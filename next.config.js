/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hlbtjfccobphbehsryid.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
