import { Sequelize, Dialect } from 'sequelize';
import { mysqlConfig as dbConfig } from './mysql.db';
import { CarplateModel } from '@backend-express/carplate/schema';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect as Dialect,
  port: parseInt(dbConfig.port),
  operatorsAliases: {},
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const CarplateSchema = CarplateModel(sequelize);

const db = {
  Sequelize,
  sequelize,
  CarplateSchema,
};

export default db;
