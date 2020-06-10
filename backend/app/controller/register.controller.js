const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require("../models");
const Register = db.register;

const key = 'MY_KEY';

const compareHash = async(plainText, hashText) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hashText, (err, data) => {
            if (err) {
                console.log(err)
                reject(new Error('Error bcryptjs compare'))
            } else {
                resolve({ status: data });
            }
        })
    });
}

const makeHash = async(plainText) => {
    const result = await bcrypt.hash(plainText, 10);
    return result;
}

// Create and Save a new Register
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    makeHash(req.body.password)
        .then(hashText => {
            const register = new Register({
                usernameco: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                sex: req.body.sex,
                password: hashText,
                check: req.body.check,
                email: req.body.email,
                tel: req.body.tel,
                Hnum: req.body.Hnum,
                province: req.body.province,
                district: req.body.district,
                parish: req.body.parish,
                zip: req.body.zip,
                date: req.body.date
            });
            //console.log(register);
            register
                .save(register)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Register."
                    });
                });
        })
        .catch(err => {
            res
                .status(401)
                .send(err);
        })
};

// Retrieve all Register from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Register.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Register."
            });
        });
};

const findUser = (username) => {
        return new Promise((resolve, reject) => {
            Register.findOne({ usernameco: username }, (err, data) => {
                if (err) {
                    reject(new Error('Cannot find username!'));
                } else {
                    if (data) {
                        resolve({ id: data._id, username: data.usernameco, password: data.password })
                    } else {
                        reject(new Error('Cannot fond username!'));
                    }
                }
            })
        })
    }
    // Find a single Register with an id
exports.findUsername = async(req, res) => {
    const dataObj = {
            username: req.params.username.split(':'),
            password: req.params.password.split(':')
        }
        //console.log("Here " + dataObj.username + ", " + dataObj.password);
    try {
        const result = await findUser(dataObj.username);
        //console.log(result);
        const loginStatus = await compareHash(dataObj.password.toString(), result.password);
        //console.log(loginStatus);
        const status = loginStatus.status;
        //console.log(status);

        if (status) {
            const token = jwt.sign(result, key, { expiresIn: 60 * 50 });
            res.status(200).json({ result, token, status });
        } else {
            res.status(200).json({ status });
        }
    } catch (error) {
        res.status(404).send(error);
    }
};

// Update a Register by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Register.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Register with id=${id}. Maybe Register was not found!`
                });
            } else res.send({ message: "Register was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Register with id=" + id
            });
        });
};

// Delete a Register with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Register.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Register with id=${id}. Maybe Register was not found!`
                });
            } else {
                res.send({
                    message: "Register was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Register with id=" + id
            });
        });
};