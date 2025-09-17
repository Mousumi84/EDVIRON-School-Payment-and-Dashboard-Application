require('dotenv').config();

const moduleconfig = {
  mongoAtlas: process.env.MONGOATLAS,
  port: process.env.PORT || 8050,
  salt: process.env.SALT,
  jwtSecret: process.env.JWT_SECRETKEY,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  pgKey: process.env.PG_KEY,
  paymentApiKey: process.env.PAYMENT_API_KEY,
  sessionSecret: process.env.SESSION_SECRET,
};

module.exports = moduleconfig;