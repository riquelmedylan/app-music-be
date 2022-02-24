const { User } = require("../model/user");
const Role = require("../model/rol");

const errorRole = async (rol = "") => {
     const errorRole = await Role.findOne({ rol });
     if (!errorRole) throw new Error(`The Role doesn't exist`);
};

const emailExist = async (email = "") => {
     const emailExist = await User.findOne({ email });
     console.log(email);
     if (emailExist) throw new Error("The email already exists");
};

const userIdNotExist = async (id = "") => {
     const userIdNotExist = await User.findById({ id });

     if (!userIdNotExist) throw new Error(`The user's id does not exist`);
};

module.exports = {
     errorRole,
     emailExist,
     userIdNotExist,
};
