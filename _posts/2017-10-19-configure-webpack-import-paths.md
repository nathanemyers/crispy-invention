---
layout: post
title:  "Configuring Webpack to use Absolute Paths"
date:   2017-10-19
categories: webpack javascript es6
published: true
---

Webpack is a pretty cool compiler, but configuring it can be a real beast. You can use webpack to configure your javascipt imports to be absolute instead of relative.

{% highlight javascript %}
// webpack.config.js

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  // This is the block that configures path lookup
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.jsx', '.scss', '.css']
  },
  // end block
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/  },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/  }
    ]
  }
}
{% endhighlight %}


