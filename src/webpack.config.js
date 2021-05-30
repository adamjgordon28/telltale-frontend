const REACT_APP_BASE_URL =
    process.env.NODE_ENV === 'production'
        ? 'http://www.telltale.site'
        : 'http://localhost:4000'

module.exports = {
    module: {
        loaders: [
            {
                test: /plugin\.css$/,
                loaders: ['style-loader', 'css'],
            },
        ],
    },
}
