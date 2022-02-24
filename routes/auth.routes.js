const { Router } = require("express");
const { check } = require("express-validator");
const { userLogin, googleSignIn } = require("../controllers/auth/postAuth");
const fieldValidation = require("../middlewares/field-validation");

const router = Router();

router.post(
     "/login",
     [
          check("email", "The email is required").isEmail(),
          check(
               "password",
               "The password must be more than 6 letters"
          ).isLength({ min: 6 }),
          check("password", "The Password is required").not().isEmpty(),
          fieldValidation,
     ],
     userLogin
);

router.post(
     "/google",
     [
          check("id_token", "The id token is required").not().isEmail(),
          fieldValidation,
     ],
     googleSignIn
);

module.exports = router;
