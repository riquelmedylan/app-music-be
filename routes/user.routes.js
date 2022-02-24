const { Router } = require("express");
const {
     getUser,
     getUserByEmailAndPassword,
     getUserId,
} = require("../controllers/users/getUser");

const {
     putUser,
     userProductPut,
     deleteUserProductCart,
} = require("../controllers/users/putUser");

const { deleteUser } = require("../controllers/users/deleteUser");
const { postUser } = require("../controllers/users/postUser");
const { check } = require("express-validator");
const {
     emailExist,
     errorRole,
     userIdNotExist,
} = require("../helpers/db-validator");

const fieldValidation = require("../middlewares/field-validation");
const { jwtValidator } = require("../middlewares/jwt-validator");
const { rolValidator } = require("../middlewares/rol-validator");

const router = Router();

router.get("/", getUser);
router.get("/id/:uid", getUserId);
router.get("/:email/:pass", getUserByEmailAndPassword);

router.put(
     "/:id",
     [
          check("id").custom(userIdNotExist),
          check("rol").custom(errorRole),
          fieldValidation,
     ],
     putUser
);
router.put(
     "/shopping/:uid",
     [check("id").custom(userIdNotExist), fieldValidation],
     deleteUserProductCart
);

router.put(
     "/uid/:uid",
     [check("id").custom(userIdNotExist), fieldValidation],
     userProductPut
);

router.put(
     "/product/:uid",
     [
          rolValidator,
          jwtValidator,
          check("id").custom(userIdNotExist),
          fieldValidation,
     ],
     deleteUserProductCart
);

router.delete(
     "/:id",
     [
          rolValidator,
          jwtValidator,
          check("id").custom(userIdNotExist),
          fieldValidation,
     ],
     deleteUser
);

router.post(
     "/",
     [
          check("nickname", "The name is required").not().isEmpty(),
          check(
               "password",
               "The password must be more than 6 letters"
          ).isLength({ min: 6 }),
          check("email", "The email is required").not().isEmpty(),
          check("email").custom(emailExist),

          fieldValidation,
     ],
     postUser
);

module.exports = router;
