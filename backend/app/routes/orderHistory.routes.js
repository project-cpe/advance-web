module.exports = app => {
    const orderHistory = require("../controller/orderHistory.controller.js");

    var router = require("express").Router();

    router.post("/", orderHistory.create);

    router.get("/:user", orderHistory.findOrderByUser);

    app.use('/api/orderHistory', router);
}