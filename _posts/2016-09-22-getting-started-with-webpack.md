---
layout: post
title:  "Getting Started with Webpack"
date:   2016-09-22 
categories: webpack
published: false
---

I've been trying to find the right javascript build chain for a few days now. I started with `gulp`, since the idea of just piping together a bunch of single-task transforms on my source code sounded like it should be super easy and fun, right?

Unfortunately, everytime I tried to get something set up with gulp I would run into a wall a few hours in whereby some simple task's complexity would spiral out of control or maybe just not work at all. Gulp was designed to delegate pretty much every task you might want to perform out to little npm packages, which sounds great! But oftentimes the documentation and usage information just isn't good enough to stitch all these parts together.

So I've been looking into using `webpack` to solve my compilation needs.

I'd like to be able to 
 - Use `es2015` `import` statements to specify my external requirements
 - Have an easily launchable development server built into the project
 - Transpile `es2015` -> plain javascript
 - Transpile `scss` -> `css`



## Installation

``` bash
$ npm init
$ npm install --save-dev webpack babel-core babel-preset-es2015-webpack
```

## The Absolute Basics

All right. Here we go. The following configuration will take your source code in `src/main.js` and transpile it to `bundle.js`.

# webpack.config.js
``` javascript
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
```

## Loaders

