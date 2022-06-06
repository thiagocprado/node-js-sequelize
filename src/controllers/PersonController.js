const { PeopleServices } = require("../services");
const peopleServices = new PeopleServices();

class PersonController {
  // people

  // podemos chamar esse método sem precisar instânciá-lo
  static async get(req, res) {
    try {
      const response = await peopleServices.getAll();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getActives(req, res) {
    try {
      const response = await peopleServices.getAcitvesRegistrations();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      // os parâmetros são passados como objetos
      const response = await peopleServices.findOne({
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
    const person = req.body;
    try {
      const response = await peopleServices.create(person);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const person = req.body;

    try {
      // se retornarmos apenas a atualização, ele nos retorna um booleano
      await peopleServices.update(person, {
        where: {
          id: Number(id),
        },
      });

      const response = await peopleServices.findOne({
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
      const response = await peopleServices.destroy({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  // restaura um item deletado com paranoid
  static async restore(req, res) {
    const { id } = req.params;

    try {
      const response = await peopleServices.restore({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  // registrations

  static async getRegistrationById(req, res) {
    const { student_id, registration_id } = req.params;

    try {
      const response = await Registrations.findOne({
        where: {
          id: Number(registration_id),
          student_id: Number(student_id),
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createRegistration(req, res) {
    const { student_id } = req.params;
    const registration = { ...req.body, student_id: Number(student_id) };

    try {
      const response = await Registrations.create(registration);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateRegistration(req, res) {
    const { student_id, registration_id } = req.params;
    const registration = { ...req.body, student_id: Number(student_id) };

    try {
      await Registrations.update(registration, {
        where: {
          id: Number(registration_id),
          student_id: Number(student_id),
        },
      });

      const response = await Registrations.findOne({
        where: {
          id: Number(registration_id),
          student_id: Number(student_id),
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async destroyRegistration(req, res) {
    const { student_id, registration_id } = req.params;

    try {
      const response = await Registrations.destroy({
        where: {
          id: Number(registration_id),
          student_id: Number(student_id),
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getRegistrations(req, res) {
    const { student_id } = req.params;

    try {
      const person = await peopleServices.findOne({
        where: {
          id: Number(student_id),
        },
      });

      // esse método é baseado no escopo de associação que criamos na nossa model
      const response = await person.getRegistrationClasses();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getRegistrationsByClass(req, res) {
    const { class_id } = req.params;

    try {
      const response = await Registrations.findAndCountAll({
        where: {
          class_id: Number(class_id),
          status: "confirmado",
        },
        limit: 20,
        order: [["student_id", "ASC"]],
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getCrowdedClasses(req, res) {
    const classCapacity = 2;

    try {
      const response = await Registrations.findAndCountAll({
        attributes: ["class_id"],
        where: {
          status: "confirmado",
        },
        group: ["class_id"],
        having: Sequelize.literal(`COUNT(class_id) >= ${classCapacity}`),
      });

      return res.status(200).json(response.count);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cancelPerson(req, res) {
    const { student_id } = req.params;

    try {
      await peopleServices.cancelPersonAndRegistrations(Number(student_id));

      return res.status(200).json({
        message: `Matrículas ref. estudante ${student_id} canceladas`,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PersonController;
