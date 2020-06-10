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
        quantity: req.body.quantity
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
    Cart.find({usernameco : user})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "No item in your cart"
            });
        });
    
}
