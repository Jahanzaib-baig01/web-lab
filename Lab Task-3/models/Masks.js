const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  name: String,
  details: String,
  Price: Number,
  rating: Number,
  isPublished: Boolean, 
});
let Model = mongoose.model("Masks", modelSchema);
module.exports = Model;