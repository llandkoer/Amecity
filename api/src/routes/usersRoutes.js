const { Router } = require("express");
const router = Router();

const usersController = require("../controllers/usersControllers");
const usersMiddlewares = require("../middlewares/usersMiddlewares");
const verifyToken = require("../middlewares/verifyToken");

const { config } = require("../config/config");

router.get("/getPoints", verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label), usersController.getPoints);

router.put(
  "/redeemPoints",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  usersMiddlewares.givePointsValidations(),
  usersController.redimePoints,
);

router.put(
  "/givePoints",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  usersMiddlewares.givePointsValidations(),
  usersController.givePoints
);

router.get(
  "/getInfo",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  usersController.getInfo
);

router.get(
  "/getPhoto",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  usersController.getPhoto
);

router.put(
  "/updatePassword",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  usersMiddlewares.updatePasswordValidations(),
  usersController.updatePassword
);

router.put(
  "/updateUsername",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  usersMiddlewares.updateUsernameValidations(),
  usersController.updateUsername
);

router.put(
  "/updateName",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  usersMiddlewares.updateNameValidations(),
  usersController.updateName
);

router.put(
  "/updateEmail",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  usersMiddlewares.updateEmailValidations(),
  usersController.updateEmail
);

router.delete(
  "/deleteAccount",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  usersController.deleteAccount
);

module.exports = router;
