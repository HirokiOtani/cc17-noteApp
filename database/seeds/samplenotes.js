exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("notetable")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("notetable").insert([
        { note: "react is difficult..." },
        { note: "Do i learn a little?" },
      ]);
    });
};
