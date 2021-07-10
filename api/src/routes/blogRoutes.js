const { Router } = require("express");

const router = Router();

const blogController = require("../controllers/blogControllers");
const blogMiddleware = require("../middlewares/blogMiddlewares");
const verifyToken = require("../middlewares/verifyToken");

const { config } = require("../config/config");

router.post(
  "/createPost",
  verifyToken.verifyToken(config.jwt.admin.admin, config.jwt.admin.label),
  blogMiddleware.createPostValidations(),
  blogController.createPost,
);

router.get("/getAll", verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label), blogController.getAll);

module.exports = router;
