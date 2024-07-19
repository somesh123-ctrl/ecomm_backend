const mongoose = require("mongoose");

// Model/Users_Model.js
const UsersSchema = mongoose.Schema(
  {
    sr_no: Number,
    name: String,
    username: String,
    email: String,
    password: String,
    phone: String,
    website: String,
    role: { type: String, default: 'user' }, // Add this line
    orders: [
      {
        name: String,
        email: String,
        address: String,
        items: [{ title: String, amount: Number, price: Number }],
        total: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UsersSchema);
