const express = require("express");
const router = express.Router();
const passport = require("passport");
// const restaurantsController = require('../controllers/client/restaurantsController');
const userController = require("../controllers/user.controller");
// const orderController = require('../controllers/client/orderController');

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get(
  "/user",
  //   passport.authenticate("jwt", { session: false }),
  userController.getUser
);

router.patch(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  userController.updateUser
);

module.exports = router;
