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
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({ minLength: 10, minLowercase: 1, minUppercase: 1, minNumbers: 1 })
    .withMessage("Password must be at least 10 characters long and must contain at least 1 uppercase character, 1 lowercase character and 1 number")
    .isLength({ max: 100 })
    .withMessage("Password cannot be longer than 100 characters"),
];

exports.loginValidations = () => {};
