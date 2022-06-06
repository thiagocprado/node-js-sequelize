const people = require("./peopleRoutes");
const classes = require("./classesRoutes");
const levels = require("./levelsRoutes");

exports.router = (app) => {
  app.use("/api/people", people);
  app.use("/api/classes", classes);
  app.use("/api/levels", levels);
};
