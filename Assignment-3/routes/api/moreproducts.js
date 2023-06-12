const express = require("express");
const Moreproducts= require("../../models/Moreproducts");
let router = express.Router();
router.post("/api/moreproducts", async function (req, res) {
  let record = new Moreproducts(req.body);
  await record.save();
  res.send(record);
});

router.put("/api/moreproducts/:id", async function (req, res) {
  //   return res.send(req.body);
  let record = await Moreproducts.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(record);
});
router.delete("/api/moreproducts/:id", async function (req, res) {
  let record = await Moreproducts.findByIdAndDelete(req.params.id);
  res.send("Done");
});
router.get("/api/moreproducts/:id", async function (req, res) {
  let record = await Moreproducts.findById(req.params.id);
  res.send(record);
});
router.get("/api/moreproducts", async function (req, res) {
  let records = await Moreproducts.find();
  res.send(records);
});

module.exports = router;