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

module.exports = router;
