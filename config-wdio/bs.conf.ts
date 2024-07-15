const parallelConfig = {
    user: process.env.BS_USER,
    key: process.env.BS_KEY,
    hostname: 'hub.browserstack.com',
    services: ['browserstack'],
    capabilities: [
      {
        browserName: 'Chrome',
        'bstack:options': {
          os: 'Windows',
          osVersion: '10',
          browserVersion: '120.0'
        }
      }
    ],
    commonCapabilities: {
      'bstack:options': {
        buildName: 'browserstack-build-3'
      }
    },
    maxInstances: 10
  };
  const { config: baseConfig } = require('./base.conf');
  exports.config = { ...baseConfig, ...parallelConfig };
  // Code to support common capabilities
  exports.config.capabilities.forEach(function(caps) {
    for (var i in exports.config.commonCapabilities)
      caps[i] = { ...caps[i], ...exports.config.commonCapabilities[i] };
  });