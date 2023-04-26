module.exports = (sequelize, Sequelize) => {
  const Carplate = sequelize.define('carplate', {
    plate_name: {
      type: Sequelize.STRING,
    },
    owner: {
      type: Sequelize.STRING,
    },
  });

  return Carplate;
};
