const express = require("express");
const Masks= require("../../models/Masks");
let router = express.Router();
router.post("/api/masks", async function (req, res) {
  let record = new Masks(req.body);
  await record.save();
  res.send(record);
});

router.put("/api/masks/:id", async function (req, res) {
  //   return res.send(req.body);
  let record = await Masks.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(record);
});
router.delete("/api/masks/:id", async function (req, res) {
  let record = await Masks.findByIdAndDelete(req.params.id);
  res.send("Done");
});
router.get("/api/masks/:id", async function (req, res) {
  let record = await Masks.findById(req.params.id);
  res.send(record);
});
router.get("/api/masks", async function (req, res) {
  let records = await Masks.find();
  res.send(records);
});

module.exports = router;