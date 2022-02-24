const { Router } = require("express");
const {
     productsGet,
     productsGetByCategory,
     productsGetById,
     productsGetByName,
} = require("../controllers/products/getProducts");
const { productsPost } = require("../controllers/products/postProducts");
const { productDelete } = require("../controllers/products/deleteProducts");
const { productPutById } = require("../controllers/products/putProducts");

const { check } = require("express-validator");
const fieldValidation = require("../middlewares/field-validation");
const router = Router();

router.get("/", productsGet);
router.get("/:category/:id", productsGetById);
router.get("/:category", productsGetByCategory);
router.get("/name/:name", productsGetByName);

router.put(
     "/:id",
     [check("id", "The entered id is invalid"), fieldValidation],
     productPutById
);

router.post(
     "/",
     [
          check("category", "The category is required").not().isEmpty(),
          check("nameProductBrand", "name product brand is required")
               .not()
               .isEmpty(),
          check("descriptionProduct", "The description product is required")
               .not()
               .isEmpty(),
          check("image", "The image is required").not().isEmpty(),
          check("productColors", "The product colors is required")
               .not()
               .isEmpty(),
          check("quantity", "The quantity is required").not().isEmpty(),
          check("quantity", "The quantity must be numerical").isNumeric(),
          check("price", "The price is required").not().isEmpty(),
          check("price", "The price must be numerical").isNumeric(),

          fieldValidation,
     ],
     productsPost
);

router.delete(
     "/:id",
     [check("id", "The entered id is invalid").isMongoId(), fieldValidation],
     productDelete
);

module.exports = router;
