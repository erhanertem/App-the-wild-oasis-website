/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gbqeulszotpidhqlpfpy.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // output: "export", // Required for SSG
  // experimental: {
  //   ppr: "incremental",
  // }, // Required for PPR w/Canary NextJS version
};

export default nextConfig;
