const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep
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

function add(schemeData) {
  // Submits an insert to the database table schemes, and since the DB is set to
  // return an array of ids, we want to grab the first index of that id,
  // and return it by using the findById() callback function
  return db("schemes")
    .insert(schemeData, "id")
    .then(ids => {
      const [id] = ids;

      // The call back function to print the results of the newly created scheme back to the user
      return findById(id);
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes, "*");
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}

function addStep(stepData, schemeId) {
  // INSERT INTO steps (step_number, instructions, scheme_id) VALUES ("2", "Adopt all the dogs", "8")
  return db("steps")
    .insert({ ...stepData, scheme_id: schemeId })
    .then(response => {
      return findSteps(schemeId);
    });
}
