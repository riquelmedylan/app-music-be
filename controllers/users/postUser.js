const { response, request } = require("express");
const { User } = require("../../model/user");
const bcryptjs = require("bcryptjs");

const postUser = async (req, res = response) => {
     const { nickname, password, email, token } = req.body;

     const user = new User({ nickname, password, email, token });
     const salt = bcryptjs.genSaltSync();

     user.password = bcryptjs.hashSync(password, salt);

     await user.save();

     res.json({
          user,
     });
};

module.exports = { postUser };
