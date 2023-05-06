import { DataTypes } from 'sequelize';

export interface Carplate extends CarplateParameters {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface CarplateParameters {
  plate_name?: string;
  owner?: string;
}

module.exports = (sequelize, Sequelize) => {
  const Carplate = sequelize.define('carplate', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    },
    plate_name: {
      type: DataTypes.STRING(6),
      unique: true,
      validate: {
        len: 6,
      },
    },
    owner: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 30],
      },
    },
  });

  return Carplate;
};
