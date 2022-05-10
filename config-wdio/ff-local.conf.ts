var defaults = require("./base.conf").config;
var _ = require("lodash");
import * as configVal from "config";
const BASEURL = configVal.get("Environment.baseUrl");

var overrides = {
  baseUrl: BASEURL,

  runner: "local",

  logLevel: "error",

  services: [["selenium-standalone"]],

  capabilities: [
    {
      //"goog:maxInstances": 5,
      browserName: "ff",
    },
  ],
};

exports.config = _.defaultsDeep(overrides, defaults);

exports.config.capabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
