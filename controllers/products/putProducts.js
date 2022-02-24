const { response, request } = require("express");
const { Product } = require("../../model/products");

const productPutById = async (req, res = response) => {
     try {
          const { id } = req.params;

          const data = req.body;

          const product = await Product.findByIdAndUpdate(id, data, {
               new: true,
          });

          res.json(product);
     } catch (err) {
          res.status(400).send(err);
     }
};

module.exports = { productPutById };
