const { RemoteBrowserTarget } = require('happo.io');

module.exports = {
  apiKey: process.env.HAPPO_API_KEY,
  apiSecret: process.env.HAPPO_API_SECRET,
  targets: {
    chrome: new RemoteBrowserTarget('chrome', {
      viewport: '1024x768',
    }),
    firefox: new RemoteBrowserTarget('firefox', {
      viewport: '1024x768',
    }),
    edge: new RemoteBrowserTarget('edge', {
      viewport: '1024x768',
    }),
    ie: new RemoteBrowserTarget('internet explorer', {
      viewport: '1024x768',
      scrollStitch: true,
    }),
    safari: new RemoteBrowserTarget('safari', {
      viewport: '1024x768',
      scrollStitch: true,
    }),
    'ios-safari': new RemoteBrowserTarget('ios-safari', {
      viewport: '375x667',
      scrollStitch: true,
    }),
  },
};
