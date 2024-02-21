import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Carplate = sequelize.define('carplate', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    },
    plate_name: {
      type: DataTypes.STRING(6),
      allowNull: false,
      unique: true,
      validate: {
        len: [6, 6],
      },
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
      },
    },
  });

  return Carplate;
};
