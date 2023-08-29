const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("API router working");
});

router.use("/users", require("./users"));
router.use("/products", require("./products"));
// router.use("/cart", require("./cart"));

module.exports = router;