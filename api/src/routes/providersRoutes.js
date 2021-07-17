const { Router } = require("express");

const router = Router();

const providersControllers = require("../controllers/providersControllers");
const providersMiddlewares = require("../middlewares/providerMiddlewares");
const verifyToken = require("../middlewares/verifyToken");

const { config } = require("../config/config");

router.post(
  "/create",
  verifyToken.verifyToken(config.jwt.admin.admin, config.jwt.admin.label),
  providersMiddlewares.createProviderValidations(),
  providersControllers.createProvider
);

router.get(
  "/getAll",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  providersControllers.getAll
);

module.exports = router;
