"use strict";
module.exports = (sequelize, DataTypes) => {
  const Levels = sequelize.define(
    "Levels",
    {
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
    }
  );
  
  Levels.associate = function (models) {
    Levels.hasMany(models.Classes, {
      foreignKey: "level_id",
    }); // um nível possuí várias turmas
  };
  return Levels;
};
