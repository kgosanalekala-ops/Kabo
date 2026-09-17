import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mark nodemailer as an external package so Next.js doesn't try to bundle
  // it. nodemailer uses Node built-ins (net, tls, dns) that aren't bundleable.
  serverExternalPackages: ["nodemailer"],
  reactStrictMode: false,
};

export default nextConfig;
