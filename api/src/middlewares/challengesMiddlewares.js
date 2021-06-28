const { check } = require("express-validator");

exports.createChallengeValidation = () => [
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .isLength({ min: 4, max: 30})
    .withMessage("Title must be between 4 and 30 characters long"),

  check("img")
    .notEmpty()
    .withMessage("Img is required")
    .isURL({ protocols: ['http','https','ftp']})
    .withMessage("Img url is required"),
    
  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .isLength({ max: 300})
    .withMessage("The description cannot be more than 300 characters"),
    
  check("points")
    .notEmpty()
    .withMessage("Points are required")
    .isInt({ gt: 0, lt:1000 })
    .withMessage("You cannot have more than 1000 points")
    .withMessage("The points must be between 1 to 3 characters"),
    
  check("focus")
    .notEmpty()
    .withMessage("Focus is required")
    .isIn(["Ambiental", "Marino", "Forestal"])
    .withMessage("The focus must be between 5 to 20 characters"),

  check("requirements")
    .notEmpty()
    .withMessage("Requirements is required")
    .isString()
    .isLength({ min: 5, max:50})
    .withMessage("The requirements must be between 5 to 50 characters")

];