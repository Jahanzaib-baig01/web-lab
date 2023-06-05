const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  name: String,
  size: String,
  color:String,
  Price: Number, 
});
let Model = mongoose.model("Products", modelSchema);
module.exports = Model;