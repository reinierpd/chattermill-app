const routes = require('next-routes');

module.exports = routes()
  .add('home', '/')
  .add('feed', '/feed.html');
