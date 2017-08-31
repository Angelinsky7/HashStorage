const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
// const config = require('./webpack.config.js');
const config = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
const compiler = webpack(config);

app.use(require('morgan')('short'));
app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath,
    hot: true,
    stats: { colors: true }
}));
app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

// app.use(express.static(path.join(__dirname, '/dist')));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!\n');
});