import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  agentRules: false,
  allowedDevOrigins: ["192.168.*.*"],
};

export default nextConfig;
