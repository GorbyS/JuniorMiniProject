const router = require("express").Router();
router.get("/", function (req, res) {
  res.status(200).json({
    status: "API Its Working",
    message: "Welcome to TestApi crafted with love!",
  });
});

module.exports = router;
