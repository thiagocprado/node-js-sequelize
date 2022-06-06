"use strict";
module.exports = (sequelize, DataTypes) => {
  const Registrations = sequelize.define(
    "Registrations",
    {
      status: {
        type: DataTypes.STRING,
      },
      
    },
    {
      paranoid: true,
    }
  );
  
  Registrations.associate = function (models) {
    Registrations.belongsTo(models.People, {
      foreignKey: "student_id",
    }); // uma matrícula pertence a um estudante
    Registrations.belongsTo(models.Classes, {
      foreignKey: "class_id",
    }); // uma matrícula pertence a uma turma
  };
  return Registrations;
};
