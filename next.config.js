module.exports = {
    reactStrictMode: true,
    images: {
      domains: ["brn-api.test","127.0.0.1","test.brntoken.net","192.168.241.31", "localhost", "https://strapiornek3.onrender.com"],      
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '1337',
          pathname: '/uploads/**',
        },
      ],
    },
  };
  