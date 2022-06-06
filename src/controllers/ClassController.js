const { ClassesServices } = require("../services");
const classesServices = new ClassesServices();

const { Op } = require("sequelize");

class ClassController {
  static async get(req, res) {
    const { initialDate, finalDate } = req.query;
    const where = {};

    initialDate || finalDate ? (where.initialDate = {}) : null;

    initialDate ? (where.initialDate[Op.gte] = initialDate) : null; // greater than or equal
    finalDate ? (where.initialDate[Op.lte] = finalDate) : null; // lower than or equal

    try {
      const response = await Classes.findAll();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const response = await Classes.findOne({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async create(req, res) {
    const team = req.body;
    try {
      const response = await Classes.create(team);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const team = req.body;

    try {
      await Classes.update(team, {
        where: {
          id: Number(id),
        },
      });

      const response = await Classes.findOne({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;

    try {
      const response = await Classes.destroy({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ClassController;
