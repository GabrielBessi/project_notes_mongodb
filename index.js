//configurações
const express = require("express");
const handleBars = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

app.engine(
  "handlebars",
  handleBars.engine({
    extname: "handlebars",
    defaultLayout: false,
    layoutsDir: "views/layouts/",
  })
);

app.set("view engine", "handlebars");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
