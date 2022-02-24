const { Schema, model, ObjectId } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const UserSchema = Schema({
     nickname: {
          type: String,
     },
     password: {
          type: String,
     },
     email: {
          type: String,
          unique: true,
     },
     rol: {
          type: String,
          required: true,
          default: "USER_ROLE",
          emun: ["ADMIN_ROLE", "USER_ROLE"],
     },
     img: {
          type: String,
     },
     status: {
          type: Boolean,
          default: true,
     },
     shoppingCart: {
          type: [ObjectId],
          ref: "product",
     },
     amount: [
          {
               price: {
                    type: Number,
                    default: 0,
               },
               _id: {
                    type: Array,
               },
          },
     ],
     finalPrice: {
          type: Number,
          default: 0,
     },
     google: { type: Boolean, default: false },
     token: { type: String },
});

UserSchema.methods.toJSON = function () {
     const { __v, _id, ...user } = this.toObject();
     user.uid = _id;
     return user;
};

UserSchema.plugin(mongoosePaginate);

const User = new model("User", UserSchema);

module.exports = {
     User,
};
