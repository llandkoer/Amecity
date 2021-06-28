const { Router } = require("express");

const router = Router();

const usersController = require("../controllers/usersControllers");
const usersMiddlewares = require("../middlewares/usersMiddlewares");
const verifyToken = require("../middlewares/verifyToken");

const { config } = require("../config/config");

router.put(
  "/givePoints",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  usersMiddlewares.givePointsValidations(),
  usersController.givePoints
);

module.exports = router;
