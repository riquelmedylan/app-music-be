const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
     return new Promise((resolve, reject) => {
          const payload = { uid };

          jwt.sign(
               payload,
               process.env.SECRET0PRIVATEKEY,
               {
                    expiresIn: "365d",
               },
               (err, token) => {
                    if (err) {
                         console.log(err);
                         reject("the token could not be loaded correctly");
                    } else {
                         resolve(token);
                    }
               }
          );
     });
};

module.exports = { generateJWT };
