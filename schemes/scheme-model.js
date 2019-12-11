const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
  // SELECT steps.id
  //     , schemes.scheme_name
  //     , step_number
  //     , instructions
  // FROM steps
  // JOIN schemes ON steps.scheme_id = schemes.id
  // WHERE schemes.id=5
  // ORDER BY step_number;

  return db("steps")
    .select(
      "steps.id",
      "schemes.scheme_name as schemeName",
      "step_number as stepNumber",
      "instructions"
    )
    .from("steps")
    .join("schemes", "steps.scheme_id", "schemes.id")
    .where({ scheme_id: id })
    .orderBy("step_number");
}
