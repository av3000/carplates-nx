export const mysqlConfig = {
  HOST: process.env.DB_HOST || 'localhost',
  USER: process.env.DB_USER || 'rootuser',
  PASSWORD: process.env.DB_PASSWORD || 'rootpassword',
  DB: process.env.DB_NAME || 'carplates_dev',
  port: process.env.DB_PORT || '3306',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
