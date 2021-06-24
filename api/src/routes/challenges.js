const { Router } = require("express");
const { config } = require("../config/config");

const Challenges = require("../controllers/challenges");
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

// US4
router.put(
  "/achieveChallenge",
  verifyToken.verifyToken(config.jwt.player.label),
  Challenges.achieveChallenge
);

router.get(
  "/getAchieved",
  // verifyToken.verifyToken(config.jwt.player.label),
  Challenges.getAchieved
  // Verificar que el usuario esté loggeado
  // Traer id usuario
  // Traer retos where id = 1
);

module.exports = router;
