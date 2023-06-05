const express = require("express");
let router = express.Router();
let Product = require("../models/Products");
router.get("/products", async (req, res) => {
    let products = await Product.find();
    //   return res.send(masks);
    res.render("product.ejs", {
      products,
      // pageTitle: "Frames From Menu",
    });
  });
  module.exports = router;