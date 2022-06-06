"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Levels",
      [
        {
          description: "básico",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: "intermediário",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: "avançado",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Levels", null, {});
  },
};
