/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
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
    async rewrites() {
        return [
            {
                source: "/about",
                destination: "/test",
            },
        ];
    },
};

module.exports = nextConfig;
