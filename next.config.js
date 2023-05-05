const webpack = require('webpack')

module.exports = {
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            constants: false,
            querystring: false,
            url: false,
            path: false,
            os: false,
            http: require.resolve('http-browserify'),
            https: require.resolve('https-browserify'),
            zlib: false,
            stream: require.resolve('stream-browserify'),
            crypto: require.resolve('crypto-browserify'),
        }

        config.plugins.push(
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
                process: 'process/browser',
            })
        )

        return config
    },
}
