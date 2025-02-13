const { Router } = require("express");

const router = Router();

const authController = require("../controllers/authControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.post(
  "/signup",
  authMiddlewares.signupValidations(),
  authController.createUser
);

router.post(
  "/login",
  authMiddlewares.loginValidations(),
  authController.loginUser
);

module.exports = router;
