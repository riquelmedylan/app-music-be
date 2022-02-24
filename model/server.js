const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");

class Server {
     constructor() {
          this.app = express();
          this.port = process.env.PORT || 3000;
          this.productsPath = "/products";
          this.userPath = "/user";
          this.authPath = "/auth";
          this.database();
          this.middlewares();
          this.routes();
     }

     async database() {
          console.log(this.port);
          await dbConnection();
     }

     routes() {
          this.app.use(this.authPath, require("../routes/auth.routes"));
          this.app.use(this.userPath, require("../routes/user.routes"));
          this.app.use(this.productsPath, require("../routes/products.routes"));
     }

     middlewares() {
          this.app.use(express.static("public"));
          this.app.use(express.json());
          this.app.use(cors());
     }

     listen() {
          this.app.listen(this.port);
     }
}

module.exports = Server;
