require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { NODE_ENV } = require("../config");
const FolderRouter = require("./Folder/folders-router");
const NoteRouter = require("./Note/notes-router");
const cors = require("cors");
const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(cors());

app.use("/folders", FolderRouter);
app.use("/notes", NoteRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
