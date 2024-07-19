// middleware/adminAuth.js
const jwt = require("jsonwebtoken");
const userModel = require("../Model/Users_Model");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);
    if (!user || user.role !== "admin") {
      return res.status(403).send({
        message: "Forbidden: Admins only",
        success: false,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Authentication failed",
      success: false,
    });
  }
};
