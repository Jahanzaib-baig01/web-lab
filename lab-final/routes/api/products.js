const express = require("express");
const Products= require("../../models/Products");
let router = express.Router();
router.post("/api/products", async function (req, res) {
  let record = new Products(req.body);
  await record.save();
  res.send(record);
});

router.delete("/api/products/:id", async function (req, res) {
  let record = await Products.findByIdAndDelete(req.params.id);
  res.send("Done");
});
router.get("/api/products/:id", async function (req, res) {
  let record = await Products.findById(req.params.id);
  res.send(record);
});
router.get("/api/products", async function (req, res) {
  let records = await Products.find();
  res.send(records);
});

module.exports = router;