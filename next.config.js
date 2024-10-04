module.exports = {
    reactStrictMode: true,
    images: {
      domains: ["brn-api.test","127.0.0.1","test.brntoken.net","192.168.241.31", "http://51.20.121.61:1337/","localhost"],      
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
  