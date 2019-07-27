/* eslint-disable no-console */
const { parse } = require('path');
const express = require('express');
const next = require('next');
const routes = require('./routes.js');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: process.env.DIR_SRC || './' });
const server = express();
const handler = routes.getRequestHandler(app);
const PORT = process.env.PORT || 3000;

const serverHandler = (req, res) => {
  const parsedUrl = parse(req.url, true);
  handler(req, res, parsedUrl);
};

if (dev) {
  app
    .prepare()
    .then(() => {
      server.use(serverHandler);
      server.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
      });
    })
    .catch(error => {
      console.log('>> Next app with problems', error);
    });
} else {
  server.get('*', (req, res) => {
    console.log('> Server Started');
    res.status(200);
    res.json({});
  });

  server.use(serverHandler);
  server.listen(PORT, err => {
    if (err) throw err;
    console.log('> Prod Ready on http://localhost:', PORT);
  });
}
