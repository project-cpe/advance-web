module.exports = app => {
    const employee = require("../controller/employee.controller.js");

    var router = require("express").Router();

    router.post("/", employee.create);

    router.delete("/", employee.deleteAll);

    router.get("/:username/:password", employee.findEmployee);

    app.use('/api/employee', router);
};