const {check} = require("express-validator");

exports.createPostValidations =
    () => [check("title")
               .notEmpty()
               .withMessage("Title is required")
               .isLength({min : 4, max : 100})
               .withMessage("Title must be between 4 and 100 characters long"),
           check("photo_url")
               .notEmpty()
               .withMessage("Photo URL is required")
               .isURL()
               .withMessage("Photo URL is not valid"),
           check("information")
               .notEmpty()
               .withMessage("Information is required")
               .isLength({min : 100})
               .withMessage("Information must be at least 100 characters long"),
];
