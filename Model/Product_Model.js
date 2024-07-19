const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  image: String,
  rate: Number,
  amount: Number,
  category: String, // Add category field
});

module.exports = mongoose.model("Products", ProductsSchema);
