exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("notetable")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("notetable").insert([
        { id: 0, note: "This is test note." },
        { note: "React is difficult..." },
        { note: "Heroku is very difficult..." },
      ]);
    });
};
