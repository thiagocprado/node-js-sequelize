"use strict";
module.exports = (sequelize, DataTypes) => {
  const Classes = sequelize.define(
    "Classes",
    {
      initial_date: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      paranoid: true,
    }
  );
  
  Classes.associate = function (models) {
    Classes.hasMany(models.Registrations, {
      foreignKey: "class_id", // as chaves precisam ser iguais nas duas relações
    }); // uma turma possuí várias matrículas

    Classes.belongsTo(models.People, {
      foreignKey: "lecturer_id",
    }); // uma turma pertence a um professor
    Classes.belongsTo(models.Levels, {
      foreignKey: "level_id",
    }); // uma turma possuí um nível
  };
  return Classes;
};
