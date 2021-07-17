const {Router} = require("express");

const router = Router();

const partnersControllers = require("../controllers/partnersControllers");
const partnersMiddlewares = require("../middlewares/partnersMiddlewares");
const verifyToken = require("../middlewares/verifyToken");

const {config} = require("../config/config");

router.post(
    "/create",
    verifyToken.verifyToken(config.jwt.admin.admin, config.jwt.admin.label),
    partnersMiddlewares.createPartnerValidations(),
    partnersControllers.createPartner,
);
router.put(
    "/updateRewards/:partner_id",
    verifyToken.verifyToken(config.jwt.admin.admin, config.jwt.admin.label),
    partnersControllers.updateRewards);

router.get(
    "/getAll",
    verifyToken.verifyToken(config.jwt.player.admin, config.jwt.player.label),
    partnersControllers.getAll);

module.exports = router;
