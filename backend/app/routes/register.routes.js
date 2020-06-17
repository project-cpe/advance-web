module.exports = app => {
    const register = require("../controller/register.controller.js");

    var router = require("express").Router();

    router.post("/", register.create);

    router.get("/:username", register.getUser);

    router.get("/:username/:password", register.findUsername);

    router.get("/:id", register.findIdCustomer);

    app.use('/api/register', router);
};