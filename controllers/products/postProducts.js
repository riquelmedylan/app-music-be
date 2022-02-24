const { response, request } = require("express");
const { Product } = require("../../model/products");

const productsPost = async (req = request, res = response) => {
     try {
          const newProduct = req.body;
          const product = new Product(newProduct);
          await product.save();
          res.status(201).json({ product, success: true });
     } catch (err) {
          res.status(400).send(err);
     }
};

module.exports = { productsPost };
