const path = require("path");
const webpack = require("webpack");
const NodemonPlugin = require( 'nodemon-webpack-plugin' )
//const serverEnvironment = require("../src/server/server-environment");

let config = {
    entry: ['babel-polyfill', "./src/server/server.ts"],
    output: {
        filename: 'server.js',
        path: path.resolve(`./dist`),
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
        libraryTarget: 'commonjs'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: [path.resolve("./src/client"), "node_modules"]
    },
    externals: [
        /^(?!\.|\/|\$|services|data|views|components).+/i,
    ],
    module: {
        rules: [{
                test: /\.tsx?$/,
                loaders: ['babel-loader', "awesome-typescript-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss|sass|less)$/,
                loader: "ignore-loader"
            }
        ]
    },
    target: "node",
    devtool: "source-map",
    node: {
        __dirname: false
    },
    plugins: [
      new NodemonPlugin({
        /// Arguments to pass to the script being watched
        args: ['demo'],
        // What to watch
        watch: path.resolve('./dist'),
        // Files to ignore
        ignore: ['*.js.map'],
        // Detailed log
        verbose: true,
        // Node arguments
        nodeArgs: [ '--inspect=9222' ]
      })
    ]
};

module.exports = config;