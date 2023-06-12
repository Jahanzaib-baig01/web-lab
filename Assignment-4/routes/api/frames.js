const express = require("express");
const Frames= require("../../models/Frames");
let router = express.Router();
router.post("/api/frames", async function (req, res) {
  let record = new Frames(req.body);
  await record.save();
  res.send(record);
});

router.put("/api/frames/:id", async function (req, res) {
  //   return res.send(req.body);
  let record = await Frames.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(record);
});
router.delete("/api/frames/:id", async function (req, res) {
  let record = await Frames.findByIdAndDelete(req.params.id);
  res.send("Done");
});
router.get("/api/frames/:id", async function (req, res) {
  let record = await Frames.findById(req.params.id);
  res.send(record);
});
router.get("/api/frames", async function (req, res) {
  let records = await Frames.find();
  res.send(records);
});

module.exports = router;