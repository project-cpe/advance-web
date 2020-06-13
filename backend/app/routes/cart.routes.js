module.exports = app => {
    const cart = require("../controller/cart.controller.js");

    var router = require("express").Router();

    router.post("/", cart.create);

    router.get("/", cart.findAll);

    router.get("/:user", cart.findCartUser)

    router.delete("/:id", cart.delete);

    app.use('/api/cart', router);

}