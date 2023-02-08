var fs = require('fs');
var postcss = require('postcss');
var { postcssPxToViewport } = require('../lib');
var css = fs.readFileSync('main.css', 'utf8');

var processedCss = postcss(postcssPxToViewport({})).process(css).css;

fs.writeFile('main-viewport.css', processedCss, function(err) {
  if (err) {
    throw err;
  }
  console.log('File with viewport units written.');
});
