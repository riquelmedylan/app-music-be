const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
     rol: {
          type: String,
          require: [true, "The Rol is required"],
     },
});

module.exports = model("Role", RoleSchema);
