const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    // mode: 'development',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [new NodePolyfillPlugin()],
    output: {
        filename: 'swagger-to-plantuml.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'SwaggerToPlantuml',
        libraryExport: 'default',
    },
};