const db = require("../models");
const Services = require("./Services");

class PeopleServices extends Services {
  constructor() {
    super("People");
    this.registrations = new Services("Registrations");
  }

  async getAll(where = {}) {
    return db[this.modelName].scope("all").findAll({ where: { ...where } });
  }

  async getAcitvesRegistrations(where = {}) {
    return db[this.modelName].findAll({ where: { ...where } });
  }

  async cancelPersonAndRegistrations(student_id) {
    return db.sequelize.transaction(async (transaction) => {
      await super.update({ active: true }, student_id, { transaction });
      await this.registrations.updates(
        { status: "cancelado" },
        { student_id },
        { transaction }
      );
    });
  }
}

module.exports = PeopleServices;
