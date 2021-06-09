const { check } = require("express-validator");

exports.signupValidations = () => [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 4, max: 100 })
    .withMessage("Name must be between 4 and 100 characters long"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid")
    .isLength({ max: 255 })
    .withMessage("Email cannot be longer than 255 characters"),
  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 4, max: 50 })
    .withMessage("Username must be between 4 and 50 characters long"),
  check("is_admin")
    .notEmpty()
    .withMessage("Value is required")
    .isBoolean()
    .withMessage("Value must be boolean"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 10, max: 100 })
    .withMessage("Password must be between 10 and 100 characters long"),
];

exports.loginValidations = () => {};
