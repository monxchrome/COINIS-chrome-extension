const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        popup: path.resolve('./src/popup/popup.tsx'),
        background: path.resolve('./src/background/background.ts'),
        options: path.resolve('./src/options/options.tsx'),
        newTab: path.resolve('./src/Tabs/index.tsx')
    },
    module: {
        rules: [
            {
                use: "ts-loader",
                test: /\.tsx?$/,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.module\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    },
                }, 'postcss-loader'],
            },
            {
                type: 'asset/resource',
                test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/,
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve('src/static'), to: path.resolve('dist') },
            ]
        }),
        ...getHtmlPlugins([
            'popup',
            'options',
            'newTab'
        ])
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js'
    }
}

function getHtmlPlugins(chunks) {
    return chunks.map(chunk => new HtmlPlugin({
        title: 'React Extension',
        filename: `${chunk}.html`,
        chunks: [chunk]
    }))
}