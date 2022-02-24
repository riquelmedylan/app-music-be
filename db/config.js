const mongoose = require("mongoose");

const dbConnection = async () => {
     try {
          await mongoose.connect(process.env.MONGODB_CNN, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
          });
          console.log("Server connected");
     } catch (error) {
          console.log(error);
          throw new Error("Error a la hora de iniciar en la base de datos");
     }
};

module.exports = { dbConnection };
