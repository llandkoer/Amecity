const { check } = require("express-validator");

exports.createChallengeValidation = () => [
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 4, max: 30 })
    .withMessage("Title must be between 4 and 30 characters long"),

  check("photo_url").notEmpty().withMessage("Photo URL is required").isURL().withMessage("Photo URL must be a valid URL"),

  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 300 })
    .withMessage("Description cannot be longer than 300 characters"),

  check("points").notEmpty().withMessage("Points are required").isInt().withMessage("Points must be an integer number"),

  check("focus").notEmpty().withMessage("Focus is required").isLength({ min: 2, max: 20 }).withMessage("Focus must be between 5 and 20 characters"),

  check("requirements").notEmpty().withMessage("Requirements is required"),
];
