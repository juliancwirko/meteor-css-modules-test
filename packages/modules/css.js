var postcss = require('postcss');
var postcssModules = require('postcss-modules-scope');
var localByDefault = require('postcss-modules-local-by-default');
var cssParser = require('css');

var doc = document;
var head = doc.getElementsByTagName('head').item(0);

// generated class names format
var generateScopedName = function (exportedName, path) {
  var sanitisedPath = path.replace(/\.[^\.\/\\]+$/, '').replace(/[\W_]+/g, '_').replace(/^_|_$/g, '');
  var scopeRandomString = Math.random().toString(36).substring(21);
  return sanitisedPath + '__' + exportedName + '__' + scopeRandomString;
};

exports.addStyles = function (css) {
  var styleValueObject;

  var result = postcss([localByDefault, postcssModules({generateScopedName: generateScopedName})]).process(css);
  var resultWithoutExports = result.css.replace(/(:export)\s+[{](.*|(.*[/\n*])*)[}]/g, '');

  window.URL = window.URL || window.webkitURL;
  var blob = new Blob([resultWithoutExports], {type: 'text/css'});
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = window.URL.createObjectURL(blob);
  head.appendChild(link);

  var parsedCss = cssParser.parse(result.css);
  var styleObj = {};

  parsedCss.stylesheet.rules.filter(function (r) {
    return r.selectors[0] === ':export';
  })[0].declarations.forEach(function (d) {
    return styleObj[d.property] = d.value;
  });

  return styleObj;

};
