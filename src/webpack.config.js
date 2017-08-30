var webpack = require('webpack');
var path = require('path');
var cleanWebpackPlugin = require('clean-webpack-plugin');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;
var libraryName = 'hashstorage';
var outputFile = libraryName + '.js';
var plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
];
var outputFile = libraryName + '.umd.js'
var tsconfigFilename = 'tsconfig.json';
var devtoolmap = 'inline-source-map';
var entries = [
    __dirname + '/src/index.ts'
];

if (env === 'prod') {
    plugins.push(new UglifyJsPlugin({
        minimize: true,
        sourceMap: true,
        comments: false,
        // include: /\.min\.js$/,
    }));
    plugins.splice(0, 0, new cleanWebpackPlugin([
        path.join(__dirname, 'dist')
    ]));
    outputFile = libraryName + '.umd.min.js';
    tsconfigFilename = 'tsconfig.prod.json';
    devtoolmap = 'source-map';
} else if (env === 'build') {
    tsconfigFilename = 'tsconfig.prod.json';
    devtoolmap = 'source-map';
} else {
    entries.splice(0, 0, 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true');
}

var config = {
    context: __dirname,
    entry: entries,
    devtool: devtoolmap,
    output: {
        path: __dirname + '/dist/bundles',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        publicPath: '/',
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                options: {
                    configFileName: tsconfigFilename
                }
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    plugins: plugins
};

module.exports = config;