const db = require("../models");
const Cart = db.cart;

exports.create = (req, res) => {
    if (!req.body.nameCargo) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const cart = new Cart({
        usernameco: req.body.usernameco,
        nameCargo: req.body.nameCargo,
        img: req.body.img,
        price: req.body.price,
        quantity: req.body.quantity,
        file: req.body.file,
        productId: req.body.productId

    });

    cart
        .save(cart)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
        });
}

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Cart.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Product."
            });
        });
};
exports.findCartUser = (req, res) => {
    var user = req.params.user;
    Cart.find({ usernameco: user })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "No item in your cart"
            });
        });
};

//ลบสินค้าในตระกร้า
exports.delete = (req, res) => {
    const id = req.params.id;
    //console.log(id);
    Cart.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            } else {
                res.send({
                    message: "Product was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
};