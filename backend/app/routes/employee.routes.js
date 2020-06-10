module.exports = app => {
    const employee = require("../controller/employee.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", employee.create);

    // Create a new Tutorial
    router.delete("/", employee.deleteAll);

    router.get("/:username/:password", employee.findEmployee);

    app.use('/api/employee', router);
};