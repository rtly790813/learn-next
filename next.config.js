/**
 * @format
 * @type {import('next').NextConfig}
 */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});
// next.config.js
const securityHeaders = [
    {
        key: "Content-Security-Policy",
        value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none';",
    },
    // 其他安全头
];

const nextConfig = {
    experimental: {
        ppr: "incremental",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.astralweb.com.tw",
                port: "",
                pathname: "/wp-content/uploads/**",
            },
        ],
    },
    async headers() {
        return [
            {
                // 对所有路由应用 CSP 头
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
    // Rewrite test
    async rewrites() {
        return [
            {
                source: "/about",
                destination: "/test",
            },
        ];
    },
};

module.exports = withBundleAnalyzer(nextConfig);
