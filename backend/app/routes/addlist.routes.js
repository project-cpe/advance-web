module.exports = app => {
    const addlist = require("../controller/addlist.controller.js");

    var router = require("express").Router();

    router.post("/", addlist.create);

    router.get("/", addlist.findAll);

    router.put("/:id", addlist.update);

    router.delete("/:id", addlist.delete);

    router.get("/:id", addlist.findId);

    app.use('/api/addlist', router);
};