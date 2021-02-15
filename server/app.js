// server/app.js
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("./knex.js");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("/getAll", async (req, res) => {
  try {
    const notes = await db.select().table("notetable");
    res.json(notes);
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

app.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const note = await db.where({ id: id }).select().from("notetable");
    res.json(note);
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.where({ id: id }).del().from("notetable");
    res.sendStatus(200);
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

app.post("/add", async (req, res) => {
  try {
    await db.insert([{ note: "Please write here!" }]).from("notetable");
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

app.put("/update/:id/:updated", async (req, res) => {
  try {
    const id = req.params.id;
    const note = req.params.updated;
    await db.where({ id: id }).update({ note: note }).from("notetable");
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

app.get("*", (req, res) => {
  //res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
  res.json("This is localhost9000, server PORT!");
});

module.exports = app;
