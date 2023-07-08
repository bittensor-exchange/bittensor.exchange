/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => [
        {
            source: '/api/:path*',
            destination: 'http://localhost:5000/:path*',
        },
        {
            source: "/auth/verify/:token",
            destination: "http://localhost:5000/auth/verify/:token",
        },
    ]
}

module.exports = nextConfig
