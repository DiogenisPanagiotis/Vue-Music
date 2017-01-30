const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3000;
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, './dist')));

var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: '/'
}));
app.use(require("webpack-hot-middleware")(compiler));

app.use(cors());
app.options('*', cors());
app.delete('*', cors());

routes(app, express);

app.listen(port, () => console.log(`Listening on port ${port}!`));