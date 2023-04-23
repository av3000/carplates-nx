module.exports = (sequelize, Sequelize) => {
  const Carplate = sequelize.define('carplate', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    owner: {
      type: Sequelize.STRING,
    },
  });

  return Carplate;
};
