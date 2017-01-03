import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { spawn } from 'child_process';

import webpackConfig from './webpack.config';

const app = express();
const compiler = webpack(webpackConfig);
const PORT = process.env.PORT || 3000;

const wdm = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true
    }
});

app.use(wdm);

app.use(webpackHotMiddleware(compiler));

const server = app.listen(PORT, 'localhost', serverError => {
    if (serverError) {
        return console.error(serverError);
    }

    spawn('npm', ['run', 'start'], { shell: true, env: process.env, stdio: 'inherit' })
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));

    console.log(`Listening at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    console.log('Stopping dev server');
    wdm.close();
    server.close(() => { process.exit(0); });
});
