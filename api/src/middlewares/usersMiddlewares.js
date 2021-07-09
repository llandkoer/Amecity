const { check } = require("express-validator");

exports.givePointsValidations = () => [
  check("points")
    .notEmpty()
    .withMessage("Points are required")
    .isInt()
    .withMessage("Points must be an integer number")
    .isNegative(),
];
