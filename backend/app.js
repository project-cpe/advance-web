const expressFunction = require('express');
const expressApp = expressFunction();
const bodyParser = require("body-parser");
const cors = require("cors");
const employee = require("./app/controller/employee.controller.js");

var corsOptions = {
    origin: "http://localhost:4200"
};


expressApp.use(cors(corsOptions));

expressApp.use(bodyParser.json());

expressApp.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        getTheResult();
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

const getTheResult = async() => {
    const auth = await employee.deleteAll();
    console.log(auth)
    if (auth.status == true) {
        const data = await employee.create();
        console.log(data);
    }
}

require("./app/routes/register.routes")(expressApp);
require("./app/routes/addlist.routes")(expressApp);
require("./app/routes/employee.routes")(expressApp);
require("./app/routes/cart.routes")(expressApp);
require("./app/routes/orderStatus.routes")(expressApp);
require("./app/routes/orderHistory.routes")(expressApp);
expressApp.listen(3000, function() {
    console.log('Listening on port 3000');
});