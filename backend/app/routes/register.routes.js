module.exports = app => {
    const register = require("../controller/register.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", register.create);

    // Retrieve a single Tutorial with id
    router.get("/:username/:password", register.findUsername);

    // router.get("/:id", register.findCustomer);

    app.use('/api/register', router);
};