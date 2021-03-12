module.exports = (env = {}) => {
  const mode = env.NODE_ENV || 'production';

  const proxyPaths = [
    // Core team
    { context: '/api',        target: 'http://localhost:8081/' },
    { context: '/wss',        target: 'http://localhost:8081/' },
    { context: '/openfin',    target: 'http://localhost:8082/' },

    // Micro team's standalone apps (for iframe and injectWholeAppHtml)
    { context: '/cra-url',    target: 'http://localhost:8083/' },
    { context: '/micro-url',  target: 'http://localhost:8084/' },
  ];

  const proxy = proxyPaths.map((obj) => {
    const {context, target} = obj;
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
      // https: true,       // NOTE: OpenFin requires a non-self-signed SSL cert
      host: '0.0.0.0',      // Allow other computers on this network to access this localhost via this machine's IP address

      index: '',            // Allows proxying when URI===''
      proxy,                // NOTE: Webpack proxy is http-proxy-middleware. See their Github for extra documentation WebPack doesn't have 

      contentBase: './dist',
      publicPath: '/site-url', // Better UX if doesn't need / on end
      historyApiFallback: {
        index: '/cdn/container-components/index.html'
      }
    },
  };
};
