module.exports = app => {
    const register = require("../controller/register.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", register.create);

    // Retrieve all Tutorials
    router.get("/", register.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:username/:password", register.findUsername);

    // Update a Tutorial with id
    router.put("/:id", register.update);

    // Delete a Tutorial with id
    router.delete("/:id", register.delete);

    app.use('/api/register', router);
};