const express = require("express");
const router = express.Router();

// Static list of categories
const categories = ["Electronics", "Books", "Clothing", "Home", "Toys", "Sports"];

router.get("/", (req, res) => {
  res.json(categories);
});

module.exports = router;
