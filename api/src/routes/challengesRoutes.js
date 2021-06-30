const { Router } = require("express");
const { config } = require("../config/config");

const Challenges = require("../controllers/challengesControllers");
const verifyToken = require("../middlewares/verifyToken");

const router = Router();

router.get(
  "/getAll",
  verifyToken.verifyToken(config.jwt.player.label),
  Challenges.getAllChallenges
);

router.post(
  "/takeChallenge",
  verifyToken.verifyToken(config.jwt.player.label),
  Challenges.takeChallenge
);

router.put(
  "/achieveChallenge",
  verifyToken.verifyToken(config.jwt.player.label),
  Challenges.achieveChallenge
);

router.get(
  "/getAchieved",
  verifyToken.verifyToken(config.jwt.player.label),
  Challenges.getAchieved
);

router.get(
  "/getCurrent",
  verifyToken.verifyToken(config.jwt.player.label),
  Challenges.getCurrent
);

module.exports = router;
