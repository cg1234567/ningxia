module.exports = {
    devServer: {
        open: true,
        proxy: {
            '/ncov': {
                target: 'https://aincov1.datatom.com/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/ncov': ''
                }
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
};
