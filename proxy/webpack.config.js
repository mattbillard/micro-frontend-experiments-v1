module.exports = (env = {}) => {
  const mode = env.NODE_ENV || 'production';
  
  return {
    mode,
    devServer: {
      hot: false,                                             // Turn off hot/live reloading b/c it conflicts with proxy
      liveReload: false,
      inline: false,

      progress: true,                                         // Show percentage progress

      port: 8081,
      https: true,
      host: '0.0.0.0',                                        // Allow other computers on this network to access this localhost via this machine's IP address
      useLocalIp: true,                                       // Open browser to IP of this machine instead of 'localhost'
      index: '',                                              // Allows proxying when URI===''
      proxy: {                                                // NOTE: Webpack proxy is http-proxy-middleware. See their Github for extra documentation WebPack doesn't have 
        '/src': {
          target: 'http://localhost:8080/',
          secure: false,                                      // Do not insist target has valid SSL. (Useful for local development)
          ws: true,                                           // Also proxy WebSockets
          changeOrigin: true,                                 // So the target site doesn't see hostname as 'localhost'
          cookieDomainRewrite: 'localhost',
        },
        '/node_modules': {
          target: 'http://localhost:8080/',
          secure: false,                                      // Do not insist target has valid SSL. (Useful for local development)
          ws: true,                                           // Also proxy WebSockets
          changeOrigin: true,                                 // So the target site doesn't see hostname as 'localhost'
          cookieDomainRewrite: 'localhost',
        },
        '/': {
          target: 'http://localhost:3000/',
          secure: false,                                      // Do not insist target has valid SSL. (Useful for local development)
          ws: true,                                           // Also proxy WebSockets
          changeOrigin: true,                                 // So the target site doesn't see hostname as 'localhost'
          cookieDomainRewrite: 'localhost',
        },
      }
    },
  };
};
