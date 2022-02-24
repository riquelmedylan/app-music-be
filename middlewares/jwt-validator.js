const { response, request } = require("express");
const { User } = require("../model/user");
const jwt = require("jsonwebtoken");

const jwtValidator = async (req = request, res = response, next) => {
     const token = req.header("x-token");

     if (!token) {
          res.status(201).json({ msg: "It was not enter the token" });
     }
     try {
          const { uid } = jwt.verify(token, process.env.SECRET0PRIVATEKEY);

          if (!user) {
               return res.status(401).json({ msg: "The user no exist" });
          }

          if (!user.status) {
               res.status(401).json(
                    `The token does not valid / status in false `
               );
          }
          const user = await User.findById(uid);

          req.user = user;

          next();
     } catch (error) {
          res.status(401).json({
               msg: "The token does not exist",
          });
     }
};

module.exports = { jwtValidator };
