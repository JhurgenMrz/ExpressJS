require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    DB_URI : process.env.MONGODB_URI,
    DB_NAME : process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    sentryDns: process.env.SENTRY_DNS,
    sentryId: process.env.SENTRY_ID
}

module.exports = {config}