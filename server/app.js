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

app.get("/get", async (req, res) => {
  try {
    const notes = await db.select().table("notetable");
    res.json(notes);
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

/*
app.post("/postName", async (req, res) => {
  try {
    const name = req.body.name;
    const color = req.body.color;
    const hex = req.body.hex;
    await db("colors").insert({
      name: name,
      r: color[0],
      g: color[1],
      b: color[2],
      hex: hex,
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});*/

// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
  //res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
  res.json("This is localhost9000, server PORT!");
});

module.exports = app;
