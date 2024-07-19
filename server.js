var express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const app = express();
const mongoose = require("mongoose");
const ProductsModel = require("./Model/Product_Model.js");
const UsersModel = require("./Model/Users_Model.js");
const Order_Model = require("./Model/Order_Model.js");
const connectDB = require("./db.js");
const adminAuth = require("./middlewares/adminAuth");

app.use(express.json());
app.use(cors());
const categoriesRouter = require("./routes/categories");

dotenv.config();
app.use("/user", require("./routes/userRoutes"));
app.use("/categories", categoriesRouter);

connectDB();

app.post("/add-product", async (req, res) => {
  const product = new ProductsModel({
    id: req.body.id,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    rate: req.body.rate,
    amount: req.body.amount,
    category: req.body.category, // Handle category field
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a product
app.put("/update-product/:id", async (req, res) => {
  try {
    const product = await ProductsModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.image = req.body.image;
    product.Rate = req.body.Rate;
    product.amount = req.body.amount;
    product.category = req.body.category; // Handle category field

    const updatedProduct = await product.save();
    res.json({ product: updatedProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/products", function (req, res) {
  ProductsModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/my_orders/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  UsersModel.findOne({ email: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/order", (req, res) => {
  UsersModel.updateOne(
    { email: req.body.email },
    { $push: { orders: req.body } }
  )
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/user-post", (req, res) => {
  UsersModel.create({
    name: req.body.name,

    email: req.body.email,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.get("/users/:id", function (req, res) {
  const id = req.params.id;
  UsersModel.find({ email: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/getuser/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  UsersModel.findById({ _id: id })
    .then((resusers) => res.json(resusers))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  UsersModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
    }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UsersModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.post("/online_payment", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

app.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});
const port = process.env.PORT || 8081;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
  );
});
