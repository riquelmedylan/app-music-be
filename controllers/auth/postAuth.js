const { request, response } = require("express");
const { User } = require("../../model/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../../helpers/generate-jwt");
const { googleVerify } = require("../../helpers/google-verify");

const userLogin = async (req = request, res = response) => {
     try {
          const { email, password } = req.body;
          const user = await User.findOne({ email });

          if (!user) {
               res.status(400).json({ msg: "User / Password is invalid" });
          }
          if (!user.status) {
               res.status(400).json({ msg: "User status is inactive" });
          }
          console.log(password);
          const validPassword = bcryptjs.compareSync(password, user.password);
          if (!validPassword) {
               res.status(400).json("The Password is incorrect -");
          }

          const token = await generateJWT(user.id);
          res.json({
               user,
               token,
          });
     } catch (error) {
          res.status(500).json({ msg: `${error}` });
     }
};

const googleSignIn = async (req = request, res = response) => {
     const { tokenId } = req.body;

     try {
          const { nickname, img, email } = await googleVerify(tokenId);

          let user = await User.findOne({ email: email });

          if (!user) {
               const data = {
                    nickname,
                    email,
                    img,
                    token: tokenId,
                    password: "ñ",
                    google: true,
               };

               user = new User(data);
               await user.save();
          }

          if (!user.status) {
               res.status(401).json({ msg: "Talk to the admin: Blocked user" });
          }

          const token = await generateJWT(user.id);

          res.json({
               user,
               token,
          });
     } catch (error) {
          res.json({
               msg: "The token is invalid",
          });
     }
};
module.exports = { userLogin, googleSignIn };
