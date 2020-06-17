const db = require("../models");
const OrderStatus = db.orderStatus;

exports.create = (req, res) => {
    if (!req.body.nameCargo) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const orderStatus = new OrderStatus({
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

    orderStatus
        .save(orderStatus)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Order.",
            });
        });
};

exports.findOrderByUser = (req, res) => {
    //console.log(req.params.user)
    var user = req.params.user;
    OrderStatus.find({ usernameco: user })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "No item in your order",
            });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!",
        });
    }

    const id = req.params.id;

    OrderStatus.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Order with id=${id}. Maybe Order was not found!`,
                });
            } else {
                const dataOrder = data;
                OrderStatus.findById(dataOrder._id).then((dataOr) => {
                    res.status(200).send(dataOr)
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Order with id=" + id,
            });
        });
};

exports.findOrderAll = (req, res) => {
    OrderStatus.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Order with id=" + id,
            });
        });
};

exports.findSomeOrder = (req, res) => {
    //console.log(req.params.id)
    OrderStatus.findById(req.params.id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update order with id=${id}. Maybe order was not found!`,
                });
            } else res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Order with id=" + id,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    //console.log(id);
    OrderStatus.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
                });
            } else {
                res.send({
                    message: "Order was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Order with id=" + id
            });
        });
};