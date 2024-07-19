// middlewares/adminMiddleware.js
module.exports = async (req, res, next) => {
    try {
      const user = await UsersModel.findById(req.body.userId);
      if (user && user.role === 'admin') {
        next();
      } else {
        res.status(403).send({ message: "Access denied. Admins only." });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error });
    }
  };
  