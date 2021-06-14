const { Router } = require("express");
const { config } = require("../config/config");

const pointController = require("../controllers/pointController");
const verifyToken = require("../middlewares/verifyToken");

const router = Router();

router.get(
  "/get",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  pointController.getPoints
);

router.put(
  "/update",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  pointController.redimePoints
);

module.exports = router;
