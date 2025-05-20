// import type { NextConfig } from "next";
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
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
        hostname: "ik.imagekit.io",
        pathname: "/xt6hfeibgz/**", // مثال على فلترة دقيقة للصورة
      },
    ],
  },

  compress: true, // ✅ ضغط استجابات HTML و JS
  experimental: {
    optimizePackageImports: [
      "@mui/material",
      "@mui/icons-material",
      "@emotion/react",
      "@emotion/styled",
    ], // ✅ يقلل unused JS في الباندل
  },

  // optional: لمنع تحميل polyfills غير ضرورية
  // modern: true, ← (هذا الخيار أُزيل من Next.js 13+)
};

module.exports = withBundleAnalyzer(nextConfig); // ⬅️ مهم
