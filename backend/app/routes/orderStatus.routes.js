module.exports = app => {
    const orderStatus = require("../controller/orderStatus.controller.js");

    var router = require("express").Router();

    router.post("/", orderStatus.create);

    router.get("/:user", orderStatus.findOrderByUser);

    router.put("/:id", orderStatus.update);

    router.get("/", orderStatus.findOrderAll);

    router.get("/get/:id", orderStatus.findSomeOrder);

    app.use('/api/orderStatus', router);
}