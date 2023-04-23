const dbConfig = require('../middleware/mysql.db.ts');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = { Sequelize, sequelize, carplates: {} };

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.carplates = require('./carplate.model.ts')(sequelize, Sequelize);

module.exports = db;
