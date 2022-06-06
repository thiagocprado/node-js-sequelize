const { LevelsServices } = require("../services");
const levelsServices = new LevelsServices();

class LevelController {
  static async get(req, res) {
    try {
      const response = await levelsServices.findAll();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const response = await levelsServices.findOne({
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
    const level = req.body;
    try {
      const response = await levelsServices.create(level);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const level = req.body;

    try {
      await levelsServices.update(level, {
        where: {
          id: Number(id),
        },
      });

      const response = await levelsServices.findOne({
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
      const response = await levelsServices.destroy({
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

module.exports = LevelController;
