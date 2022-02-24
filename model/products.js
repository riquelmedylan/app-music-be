const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const ProductSchema = Schema({
     category: {
          type: String,
          emun: [
               "guitarras",
               "bajos",
               "teclados",
               "ukeleles",
               "electronica y audio",
               "baterias",
          ],
     },
     nameProductBrand: {
          type: String,
     },
     descriptionProduct: {
          type: String,
     },
     image: {
          type: [String],
     },
     productColors: {
          type: [String],
     },
     quantity: {
          type: Number,
          default: 0,
     },
     price: {
          type: Number,
          default: 0,
     },
     discount: {
          type: Number,
          default: 0,
     },
     available: {
          type: Boolean,
     },
     visited: {
          type: Number,
          default: 0,
     },
});

ProductSchema.methods.toJSON = function () {
     const { __v, ...data } = this.toObject();
     return data;
};

ProductSchema.plugin(mongoosePaginate);

const Product = new model("product", ProductSchema);

module.exports = { Product };
