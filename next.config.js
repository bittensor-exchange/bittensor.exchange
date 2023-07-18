/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => [
        {
            source: '/api/:path*',
            destination: 'http://127.0.0.1:5000/:path*',
        },
        {
            source: "/auth/verify/:token",
            destination: "http://127.0.0.1:5000/auth/verify/:token",
        },
    ]
}

module.exports = nextConfig
