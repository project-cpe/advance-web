const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.register = require("./register.model.js")(mongoose);
db.addlist = require("./addlist.model.js")(mongoose);
db.employee = require("./employee.model.js")(mongoose);
db.cart = require("./cart.model.js")(mongoose);

module.exports = db;