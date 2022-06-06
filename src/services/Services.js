const database = require("../models");

class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async getAll() {
    return database[this.modelName].findAll();
  }

  async getById() {}

  async update(data, id, transaction = {}) {
    return database[this.modelName].update(
      data,
      { where: { id: id } },
      { transaction }
    );
  }

  async updates(data, id, transaction = {}) {
    return database[this.modelName].update(
      data,
      { where: { ...where } },
      { transaction }
    );
  }

  async create() {}

  async destroy() {}
}

module.exports = Services;
