const { response, request } = require("express");
const { User } = require("../../model/user");

const deleteUser = async (req = request, res = response) => {
     try {
          const { id } = req.params;

          const user = await User.findByIdAndUpdate(id, { status: false });

          const authenticatedUser = req.user;

          res.json({ user, authenticatedUser });
     } catch (error) {
          res.status(400).json({ error });
     }
};

module.exports = {
     deleteUser,
};
