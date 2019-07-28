const routes = require('next-routes');

module.exports = routes()
  .add('dashboard', '/')
  .add('feed', '/feed.html');
