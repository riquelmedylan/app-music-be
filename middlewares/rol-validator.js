const { request, response } = require("express");

const rolValidator = (req = request, res = response, next) => {
     if (!req.user) {
          res.status(500).json({
               msg: "You want to verify the role without validating the token first",
          });
     }

     const { rol, nickname } = req.user;

     if (rol !== "ADMIN_ROLE") {
          return res.json(401).json({ msg: `${nickname} is not admin` });
     }

     next();
};

module.exports = { rolValidator };
