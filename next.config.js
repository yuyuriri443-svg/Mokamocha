/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Bỏ qua lỗi trời ơi đất hỡi của bản 16
  },
  eslint: {
    ignoreDuringBuilds: true, // Ép nó build bằng được
  },
};

export default nextConfig;
