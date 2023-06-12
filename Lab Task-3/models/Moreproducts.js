const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  name: String,
  details: String,
  Price: Number,
  rating: Number,
  isPublished: Boolean, 
  image : String, 
});
let Model = mongoose.model("Moreproducts", modelSchema);
module.exports = Model;