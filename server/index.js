const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/config').default;

const app = express();

const port = 1337;
app.use(morgan('short'));
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false })); // Replaces Body Parser
app.use(express.json());

/** Rules of our API */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.header('origin'));
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

app.get('/users', (req, res) => {});

/** Health Check */
app.get('/healthcheck', (req, res) => res.status(200).json({ messgae: 'Server is running!' }));
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
