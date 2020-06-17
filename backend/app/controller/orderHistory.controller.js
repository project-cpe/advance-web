const db = require("../models");
const OrderHistory = db.orderHistory;

exports.create = (req, res) => {
    if (!req.body.nameCargo) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const orderHistory = new OrderHistory({
        usernameco: req.body.usernameco,
        nameCargo: req.body.nameCargo,
        img: req.body.img,
        price: req.body.price,
        quantity: req.body.quantity,
        file: req.body.file,
        productId: req.body.productId,
        status: req.body.status,
        address: req.body.address,
    });

    orderHistory
        .save(orderHistory)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product.",
            });
        });
};

exports.findOrderByUser = (req, res) => {
    //console.log(req.params.user)
    var user = req.params.user;
    OrderHistory.find({ usernameco: user })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "No item in your order",
            });
        });
};