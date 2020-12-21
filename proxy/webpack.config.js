module.exports = (env = {}) => {
  const mode = env.NODE_ENV || 'production';
  
  return {
    mode,
    devServer: {
      hot: false,                                             // Turn off hot/live reloading b/c it conflicts with proxy
      liveReload: false,
      inline: false,

      progress: true,                                         // Show percentage progress

      port: 8080,
      https: true,
      host: '0.0.0.0',                                        // Allow other computers on this network to access this localhost via this machine's IP address
      useLocalIp: true,                                       // Open browser to IP of this machine instead of 'localhost'
      index: '',                                              // Allows proxying when URI===''
      proxy: {                                                // NOTE: Webpack proxy is http-proxy-middleware. See their Github for extra documentation WebPack doesn't have 
        '/container': {
          target: 'http://localhost:8081/',
          secure: false,
          ws: true,
          changeOrigin: true,
          cookieDomainRewrite: 'localhost',
        },
        '/micro-app': {
          target: 'http://localhost:8082/',
          secure: false,
          ws: true,
          changeOrigin: true,
          cookieDomainRewrite: 'localhost',
        },
      }
    },
  };
};
