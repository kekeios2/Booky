import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "ik.imagekit.io",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "res.cloudinary.com",
      "books.google.com",
      "www.nsvrc.org",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      // Optional: Add more specific patterns
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/xt6hfeibgz/**",
      },
    ],
  },
};

export default nextConfig;
