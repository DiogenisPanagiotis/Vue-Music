
var webpack = require('webpack');

module.exports = {
  // This is the "main" file which should include all other modules
  entry: [
    'webpack-hot-middleware/client',
    './src/app.js'
  ],
  // Where should the compiled file go?
  output: {
    // To the `dist` folder
    path: __dirname,
    publicPath: '/',
    // With the filename `build.js` so it's dist/build.js
    filename: 'build.js'
  },
  resolve: {
    // NPM by default installs Runtime Only version, which will not compile html templates
    alias: {
      // this is the solution.
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    // Special compilation rules
    loaders: [
      {
        // Ask webpack to check: If this file ends with .js, then apply some transforms
        test: /\.js$/,
        // Transform it with babel
        loader: 'babel',
        // don't transform node_modules folder (which don't need to be compiled)
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  vue: {
    loaders: {
      js: 'babel'
    }
  }
}