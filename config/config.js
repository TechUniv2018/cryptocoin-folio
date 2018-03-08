module.exports = () => ({
  development: {
    username: process.env.CRYPTOCOIN_DB_DEV_USER,
    password: process.env.CRYPTOCOIN_DB_DEV_PASS,
    database: 'cryptocoin_development',
    host: process.env.CRYPTOCOIN_DB_DEV_HOST,
    dialect: 'postgres',
    port: process.env.CRYPTOCOIN_DB_DEV_PORT,
    pool: {
      max: 10,
      min: 0,
      acquire: 50000,
      idle: 10000,
    },
  },
  test: {
    username: process.env.CRYPTOCOIN_DB_TEST_USER,
    password: process.env.CRYPTOCOIN_DB_TEST_PASS,
    database: 'cryptocoin_test',
    host: process.env.CRYPTOCOIN_DB_TEST_HOST,
    dialect: 'postgres',
    port: process.env.CRYPTOCOIN_DB_TEST_PORT,
  },
  production: {
    username: process.env.CRYPTOCOIN_DB_PROD_USER,
    password: process.env.CRYPTOCOIN_DB_PROD_PASS,
    database: 'cryptocoin_production',
    host: process.env.CRYPTOCOIN_DB_PROD_HOST,
    dialect: 'postgres',
    port: process.env.CRYPTOCOIN_DB_PROD_PORT,
  },
});
