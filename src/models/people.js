"use strict";
module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define(
    "People",
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          validateName: (username) => {
            if (username.length < 3)
              throw new Error("O nome deve ter ao menos três caracteres");
          },
        },
      },

      active: {
        type: DataTypes.BOOLEAN,
      },

      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "E-mail inválido!",
          },
        },
      },

      role: {
        type: DataTypes.STRING,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },

      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      paranoid: true, // faz uma deleção lógica, não exclui realmente do banco

      // esse nome é padrão
      defaultScope: {
        where: { active: true },
      },

      scopes: {
        // nomes podem ser personalizados
        all: { where: {} },
        // etc: { constraint: valor }
      },
    }
  );

  People.associate = function (models) {
    People.hasMany(models.Classes, {
      foreignKey: "lecturer_id",
    }); // um professor possuí várias turmas
    People.hasMany(models.Registrations, {
      foreignKey: "student_id",
      scope: { status: "confirmado" }, // escopo de associação
      as: 'registrationClasses' // alias
    }); // um estudante possuí várias matrículas
  };
  return People;
};

// Os escopos são usados ​​para ajudá-lo a reutilizar o código.
// Você pode definir consultas comumente usadas,
// especificando opções como onde, incluir, limitar, etc.
