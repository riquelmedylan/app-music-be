const bycrypts = require("bcryptjs");
const { User } = require("../../model/user");
const { request } = require("express");

const putUser = async (req, res) => {
     try {
          const { id } = req.params;

          const { uid, password, google, ...info } = req.body;

          if (password) {
               const salt = bycrypts.genSaltSync();
               user.password = bycrypts.hashSync(password, salt);
          }

          const user = await User.findByIdAndUpdate(id, info, {
               new: true,
          });

          res.status(201).json({ user });
     } catch (error) {
          res.status(400).send({ error });
     }
};

const userProductPut = async (req = request, res) => {
     const { uid } = req.params;
     const { _id, amount } = req.body;
     console.log(amount);
     User.findById(uid).then((obj) => arrayProducts(obj, _id, amount));
     res.json({ User });
};

const arrayProducts = (obj, idProduct, priceProduct) => {
     const { amount, shoppingCart } = obj;
     shoppingCart.push(idProduct);
     console.log(amount);
     amount.push({ price: priceProduct, _id: idProduct });

     const reducePrice = [];

     amount.forEach((e, i) => {
          reducePrice.push(amount[i].price);
     });

     const finalPrice = reducePrice.reduce((a, b) => a + b);

     User.updateOne(
          { _id: obj.id },
          {
               shoppingCart: shoppingCart,
               amount: amount,
               finalPrice: finalPrice,
          }
     ).catch((err) => console.error(err));
};

const deleteUserProductCart = async (req = request, res) => {
     const { uid } = req.params;
     const { _id, price, finalPrice } = req.body;

     const item = await User.findOneAndUpdate(
          { _id: uid },
          {
               $pull: { shoppingCart: _id, amount: { price } },
               finalPrice: finalPrice - price,
          }
     );

     res.json({ item });
};

module.exports = { putUser, userProductPut, deleteUserProductCart };
