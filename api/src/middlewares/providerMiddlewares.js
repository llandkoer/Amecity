const { check } = require("express-validator");

exports.createProviderValidations = () => [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters long"),
  check("location")
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Location must be between 5 and 100 characters long"),
  check("phone_number").notEmpty().withMessage("Phone number is required").isMobilePhone(["es-CO"]).withMessage("Phone number is not valid"),
  check("provides").notEmpty().withMessage("Provides is required"),
];
