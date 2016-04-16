var postcss = require('postcss');
var postcssModules = require('postcss-modules-scope');
var localByDefault = require('postcss-modules-local-by-default');
var cssParser = require('css');

var doc = document;
var head = doc.getElementsByTagName("head").item(0);

exports.addStyles = function (css) {
  var style = doc.createElement("style");
  var styleValueObject;

  style.setAttribute("type", "text/css");

  var result = postcss([localByDefault, postcssModules]).process(css);

  var resultWithoutExports = result.css.replace(/(:export)\s+[{](.*|(.*[/\n*])*)[}]/g, '');

  // https://msdn.microsoft.com/en-us/library/ms535871(v=vs.85).aspx
  var internetExplorerSheetObject =
    style.sheet || // Edge/IE11.
    style.styleSheet; // Older IEs.

  if (internetExplorerSheetObject) {
    internetExplorerSheetObject.cssText = resultWithoutExports;
  } else {
    style.appendChild(doc.createTextNode(resultWithoutExports));
  }

  var parsedCss = cssParser.parse(result.css);
  var styleObj = {};

  parsedCss.stylesheet.rules.filter(function (r) {
    return r.selectors[0] === ':export';
  })[0].declarations.forEach(function (d) {
    return styleObj[d.property] = d.value;
  });

  head.appendChild(style);

  return styleObj;

};
