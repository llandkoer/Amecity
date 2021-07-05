const { check } = require("express-validator");

exports.givePointsValidations = () => [
  check("points").notEmpty().withMessage("Points are required").isInt().withMessage("Points must be an integer number"),
];

exports.updateUsernameValidations = () => [
  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 4, max: 50 })
    .withMessage("Username must be between 4 and 50 characters long"),
];

exports.updateNameValidations = () => [
  check("name").notEmpty().withMessage("Name is required").isLength({ min: 3, max: 50 }).withMessage("Name must be between 4 and 50 characters long"),
];

exports.updateEmailValidations = () => [
  check("email").notEmpty().withMessage("Email is required").isEmail().withMessage("This field must be an email"),
];

exports.updatePasswordValidations = () => [
  check("new_password")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 10, max: 100 })
    .withMessage("New password must be between 10 and 100 characters long"),
  check("old_password").notEmpty().withMessage("Old password is required"),
];
