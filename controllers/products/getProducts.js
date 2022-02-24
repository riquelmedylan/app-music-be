const { response, request } = require("express");
const { Product } = require("../../model/products");

const productsGet = (req = request, res = response) => {
     return Product.find()
          .then((products) => res.json({ products }))
          .catch((err) => res.status(400).send(err));
};

const productsGetById = async (req = request, res = response) => {
     try {
          const { id } = req.params;
          const product = await Product.findById(id);
          res.json({ product });
     } catch (err) {
          res.status(400).send(err);
     }
};

const productsGetByCategory = async (req = request, res = response) => {
     try {
          const { category } = req.params;
          const product = await Product.find({ category: category });
          res.json({ product });
     } catch (err) {
          res.status(400).send(err);
     }
};

const productsGetByName = async (req = request, res = response) => {
     try {
          const { name } = req.params;
          const product = await Product.find({ nameProductBrand: name });
          res.json({ product });
     } catch (err) {
          res.status(400).send(err);
     }
};

module.exports = {
     productsGet,
     productsGetById,
     productsGetByCategory,
     productsGetByName,
};
