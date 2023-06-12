const express = require("express");
let app = express();
var expressLayouts = require("express-ejs-layouts");
var cookieParser = require("cookie-parser");
var session = require("express-session")
const flash = require('express-flash');

app.use(express.json());
app.use(express.urlencoded())
app.use(express.static("public"));
app.use(expressLayouts);
app.use(cookieParser());
app.use(
  session({
    secret: "My Top Secret String",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(require("./middlewares/checksession"));
app.set("view engine", "ejs");

app.use("/", require("./routes/api/masks"));
app.use("/", require("./routes/api/frames"));
app.use("/", require("./routes/api/moreproducts"));
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/menu-mask"));
app.use("/", require("./routes/menu-frames"));
app.use("/", require("./routes/menu-more"));
app.use("/", require("./routes/updateroute"));
// app.get("/", (req, res) => {
//   res.send("views")
// })



app.get("/", (req, res) => {
  res.render("home");
})
// app.use((req, res, next) => {
//   res.status(404).send("Not Found");
// });
// ye wala chal rha hai

app.listen(3000, () => {
  console.log("Server Started");
})
const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://jahanzaibbaig111:beyg@cluster0.vbzonaj.mongodb.net/Cluster0?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message));


  