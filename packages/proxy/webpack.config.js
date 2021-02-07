module.exports = (env = {}) => {
  const mode = env.NODE_ENV || 'production';

  const proxyPaths = {
    '/container':         'http://localhost:8081/',
    '/micro-app':         'http://localhost:8082/',
    '/api':               'http://localhost:8084/',
    '/ws':                'http://localhost:8084/',
    '/cra-app':           'http://localhost:8085/',
    '/cra-components':    'http://localhost:8086/',
  };

  const proxy = Object.entries(proxyPaths).map((entry) => {
    const [context, target] = entry;
    return {
      changeOrigin: true,
      context: [context],
      cookieDomainRewrite: 'localhost',
      secure: false,
      target,
      ws: true,
    };
  });

  
  return {
    mode,
    devServer: {
      injectClient: false,  // Force no hot reloading. Websocket can't connect through proxy
      port: 8080,
      https: true,
      host: '0.0.0.0',      // Allow other computers on this network to access this localhost via this machine's IP address
      index: '',            // Allows proxying when URI===''
      proxy                 // NOTE: Webpack proxy is http-proxy-middleware. See their Github for extra documentation WebPack doesn't have 
    },
  };
};
