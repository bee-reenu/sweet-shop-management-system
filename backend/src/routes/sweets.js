'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sweet extends Model {
    /**
     * Associations (if needed later)
     */
    static associate(models) {
      // Example:
      // Sweet.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Sweet.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Sweet',
      tableName: 'Sweets',   // Ensures correct table name
      timestamps: true,      // createdAt, updatedAt
    }
  );

  return Sweet;
};
