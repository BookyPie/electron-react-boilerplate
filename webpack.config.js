import webpack from 'webpack';

const port = process.env.PORT || 3000;

const entry = ['./app/src/index.js'];
if(process.env.HOT) entry.push(`webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`);

export default {
    debug: true,
    entry: entry,
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js',
        publicPath: `http://localhost:${port}/`
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exlcude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.css/,
                loaders: ['style', 'css'],
                include: __dirname + '/app/src/'
            },
            {
                test: /\.sass$/,
                loader: ['style', 'css', 'sass']
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', 'jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
    ],
    target: 'electron-renderer'
};