const Router = require("express").Router;
const db = require("../database/connection");
const { ObjectId } = require("mongodb");

const router = Router();

router.get("/", function (req, res) {
  res.render("notes/create");
});

router.get("/:id", async function (req, res) {
  const id = new ObjectId(req.params.id);

  const notes = await db
    .getDatabase()
    .db()
    .collection("notes")
    .findOne({ _id: id });

  res.render("notes/detail", { notes });
});

router.post("/", function (req, res) {
  const data = req.body;
  const title = data.title;
  const description = data.description;

  db.getDatabase()
    .db()
    .collection("notes")
    .insertOne({ title: title, description: description });

  res.redirect(301, "/");
});

router.post("/delete", function (req, res) {
  const data = req.body;
  const id = new ObjectId(data.id);

  db.getDatabase().db().collection("notes").deleteOne({ _id: id });

  res.redirect(301, "/");
});

module.exports = router;
