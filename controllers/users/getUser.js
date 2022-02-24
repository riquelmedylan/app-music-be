const { response, request } = require("express");
const { User } = require("../../model/user");
const bcryptjs = require("bcryptjs");

const getUser = async (req = request, res = response) => {
     try {
          const { first = 0, limit = 5 } = req.query;
          const query = { status: true };

          const [total, users] = await Promise.all([
               User.countDocuments(query),
               User.find(query).skip(Number(first)).limit(Number(limit)),
          ]);

          res.json({ users, total });
     } catch (error) {
          res.status(400).send({ error });
     }
};

const getUserId = async (req, res) => {
     const { uid } = req.params;
     const user = await User.findById(uid).populate("shoppingCart");
     res.json(user);
};

const getUserByEmailAndPassword = async (req = request, res = response) => {
     const { email, pass } = req.params;
     let booleanUser = {
          password: true,
          email: true,
     };
     const user = await User.findOne({
          email: email,
     });

     if (!user) {
          res.status(207).send({
               msg: "The Email is invalid",
               password: (booleanUser.password = false),
               email: (booleanUser.email = false),
          });
     }

     const validPassword = bcryptjs.compareSync(pass, user.password);

     if (!validPassword) {
          res.status(207).send({
               msg: "The password user is invalid",
               password: (booleanUser.password = false),
          });
     }

     res.status(200).json({
          token: user.token,
          user: booleanUser,
          uid: user._id,
     });
};

module.exports = {
     getUserId,
     getUser,
     getUserByEmailAndPassword,
};
