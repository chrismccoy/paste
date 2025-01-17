const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser').urlencoded;
const cookieParser = require('cookie-parser');
const expressStaticGzip = require("express-static-gzip");
const addRequestId = require('express-request-id')({ setHeader: false });
const morgan = require('morgan');
const path = require('path');
const staticify = require('staticify')(path.join(__dirname, '../public'));

morgan.token('id', (req) => req.id.split('-')[0]);

function buildStack(routes) {
  const middleware = express();

  middleware.use(addRequestId);
  middleware.use((_req, resp, next) => {
    resp.locals.asset = staticify.getVersionedPath;
    next();
  });

  if (process.env.NODE_ENV === 'production') {
    middleware.use(expressStaticGzip('public', { index: false, enableBrotli: true }));
  } else {
    middleware.use(express.static('public'));
    middleware.use(staticify.middleware);
  }

  middleware.use(morgan("[:date[iso] #:id] Started :method :url for :remote-addr", { immediate: true }));
  middleware.use(morgan("[:date[iso] #:id] Completed :status :res[content-length] in :response-time ms"));

  middleware.use(bodyParser({ extended: false }));
  middleware.use(cookieParser());

  middleware.use(routes);

  middleware.use((err, _req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }

    console.error(err.stack);
    res.status(500).render("500");
  });

  middleware.use((_req, resp) => {
    resp.status(404).render("404");
  });

  return middleware;
}

module.exports = { middleware: buildStack };
