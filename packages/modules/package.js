Package.describe({
  name: "modules",
  version: "0.6.1",
  summary: "CommonJS module system",
  documentation: "README.md"
});

Npm.depends({
  "postcss": "5.0.19",
  "postcss-modules-scope": "1.0.0",
  "postcss-modules-local-by-default": "1.0.1",
  "css": "2.2.1"
});

Package.onUse(function(api) {
  api.use("underscore");
  api.use("modules-runtime");
  api.mainModule("client.js", "client");
  api.mainModule("server.js", "server");
  api.export("meteorInstall");
  api.export("Buffer");
  api.export("process");
});
