const { Router } = require("express");

const router = Router();

const challengeMiddlewares = require("../middlewares/challengesMiddlewares");
const challengesController = require("../controllers/challengesControllers");
const verifyToken = require("../middlewares/verifyToken");

const { config } = require("../config/config");

router.post(
  "/create",
  verifyToken.verifyToken(config.jwt.admin.admin, config.jwt.admin.label),
  challengeMiddlewares.createChallengeValidation(),
  challengesController.createChallenge
);

router.get(
  "/getAll",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  challengesController.getAllChallenges
);

router.post(
  "/takeChallenge/:challenge_id",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  challengesController.takeChallenge
);

router.put(
  "/achieveChallenge/:challenge_id",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  challengesController.achieveChallenge
);

router.get(
  "/getAchieved",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  challengesController.getAchieved
);

router.get(
  "/getCurrent",
  verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
  challengesController.getCurrent
);

module.exports = router;
