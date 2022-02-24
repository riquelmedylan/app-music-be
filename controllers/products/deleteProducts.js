const { request, response } = require("express");
const { Product } = require("../../model/products");

const productDelete = async (req = request, res = response) => {
     try {
          const { id } = req.params;
          await Product.findByIdAndDelete(id)
               .then(res.json(`${id} is removed`))
               .catch((error) => console.log(error));
     } catch (err) {
          res.status(400).send(err);
     }
};

module.exports = { productDelete };
