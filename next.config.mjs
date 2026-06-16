/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      // Supabase Storage public bucket (set your project ref in env/host)
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
