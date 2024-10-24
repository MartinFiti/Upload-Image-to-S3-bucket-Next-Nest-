/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:9000/api/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'personal-bucket-martinfiti.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/profile/**',
      },
    ],
  },
};

export default nextConfig;