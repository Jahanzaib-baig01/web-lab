const express = require("express");
let app = express();
var expressLayouts = require("express-ejs-layouts");

app.use(express.json());
app.use(express.urlencoded())
app.use(express.static("public"));
app.use(expressLayouts);

app.set("view engine", "ejs");

app.use("/", require("./routes/api/products"));
app.use("/", require("./routes/dressroute"));

// app.get("/", (req, res) => {
//   res.send("views")
// })

app.get("/", (req, res) => {
  res.render("home");
})
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(4000, () => {
  console.log("Server Started");
})
const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://jahanzaibbaig111:beyg@finallab.vbzonaj.mongodb.net/finallab?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message));


  