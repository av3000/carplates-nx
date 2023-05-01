const PLATE_SYMBOLS_TOTAL = 6;
const OWNER_NAME_MAX_LENGTH = 30;
const OWNER_NAME_MIN_LENGTH = 3;

module.exports = (sequelize, Sequelize) => {
  const Carplate = sequelize.define('carplate', {
    plate_name: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        min: PLATE_SYMBOLS_TOTAL,
        max: PLATE_SYMBOLS_TOTAL,
      },
    },
    owner: {
      type: Sequelize.STRING,
      validate: {
        min: OWNER_NAME_MIN_LENGTH,
        max: OWNER_NAME_MAX_LENGTH,
      },
    },
  });

  return Carplate;
};
