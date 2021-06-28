const { Router } = require("express");

const router = Router();

const challengeController = require("../controllers/challengesControllers");
const challengeMiddlewares = require("../middlewares/challengesMiddlewares");
const verifyToken = require("../middlewares/verifyToken");

const { config } = require("../config/config");

router.post("/create", verifyToken.verifyToken(config.jwt.admin.admin, config.jwt.admin.label), challengeMiddlewares.createChallengeValidation());

module.exports = router;