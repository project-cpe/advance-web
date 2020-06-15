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
        address: req.body.address

    });

    orderStatus
        .save(orderStatus)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
        });
}

exports.findOrderByUser = (req, res) => {
    var user = req.params.user;
    OrderStatus.find({usernameco : user})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "No item in your order"
            });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    OrderStatus.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found!`
                });
            } else res.send({ message: "Product was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
};