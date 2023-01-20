/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ALCHEMY_API_KEY: "kjR5GebH2_XGT0jduHnG8bZmXuujoOpF",
    ALCHEMY_WEBSOCKET_URL: "wss://eth-goerli.g.alchemy.com/v2/kjR5GebH2_XGT0jduHnG8bZmXuujoOpF"
  },
};

module.exports = nextConfig
