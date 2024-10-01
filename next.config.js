const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
    // i18n,
    images: {
        domains: ["brn-api.test","127.0.0.1","test.brntoken.net","192.168.241.31"],
    },
}

module.exports = nextConfig
