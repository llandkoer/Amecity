const {check} = require("express-validator");

exports.createPartnerValidations =
    () => [check("name")
               .notEmpty()
               .withMessage("Name is required")
               .isLength({min : 2, max : 100})
               .withMessage("Name must be between 2 and 100 characters long"),
           check("photo_url")
               .notEmpty()
               .withMessage("Photo URL is required")
               .isURL()
               .withMessage("Photo URL is not valid"),
];
