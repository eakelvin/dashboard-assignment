/** @type {import('next').NextConfig} */

const nextConfig = {
    compiler: {
        removeConsole: process.env.NODE_ENV === "production"
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/dashboard",
                permanent: true
            },
        ]
    },
    env: {
        BASE_URL: process.env.BASE_URL,
    },
};

export default nextConfig;
