---
layout: post
title:  "Configuring Webpack to use Absolute Paths"
date:   2017-10-19
categories: webpack javascript es6
published: true
---

One of my favorite additions in Javascript ES6 is the inclusion of [an actual file import keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import). When you first start a project however, you might find that your project is stuck using ugly and definitely not copy-paste friendly relative imports like this:

{% highlight javascript %}
import foo from '../bar'
import {apple, orange} from './fruits'
{% endhighlight %}

What we really want is be able to use absolute imports, like this:

{% highlight javascript %}
import foo from 'foo/bar'
import {apple, orange} from 'food/fruits'
{% endhighlight %}

Resolving these imports is the job of whatever javascript transpiler you're using. In this case I'm using [Webpack](https://webpack.js.org/configuration/resolve/).

Configuring Webpack can oftentimes get pretty byzantine, but this is a simple `resolve` block that will enable you to use absolute imports instead.

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

A quick breakdown on this configuration:
 - `modules` defines what paths webpack will use to attempt to resolve imports
 - `extensions` allows you to omit file extensions in your `import` statements. So in our example, 
{% highlight javascript %}
import foo from 'foo/bar'
{% endhighlight %}
will attempt to resolve to `foo/bar.js` `foo/bar.jsx` `foo/bar.css` and `foo/bar.scss`
