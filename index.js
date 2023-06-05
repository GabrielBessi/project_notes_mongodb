//configurações
const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const notesRouter = require("./routes/notes");
const db = require("./database/connection");

const app = express();
const port = 8000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async function (req, res) {
  const notes = await db
    .getDatabase()
    .db()
    .collection("notes")
    .find({})
    .toArray();

  res.render("home", { notes });
});

app.use("/notes", notesRouter);

db.initDatabase((err, db) => {
  if (err) {
    console.log("A conexão apresentou o seguinte erro:", err);
  } else {
    console.log("Banco conectado com sucesso !");

    app.listen(port, () => {
      console.log(`Servidor rodando na porta: ${port}`);
    });
  }
});
