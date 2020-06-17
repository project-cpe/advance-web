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
                        message: err.message || "Some error occurred while creating the Register.",
                        status: true
                    });
                });
        })
        .catch(err => {
            res
                .status(401)
                .send(err);
        })
};

const findUser = (username) => {
    return new Promise((resolve, reject) => {
        Register.findOne({ usernameco: username }, (err, data) => {
            if (err) {
                reject(new Error('Cannot find username!'));
            } else {
                if (data) {
                    resolve({
                        id: data._id,
                        username: data.usernameco,
                        password: data.password,
                        email: data.email,
                        tel: data.tel,
                        Hnum: data.Hnum,
                        province: data.province,
                        district: data.district,
                        parish: data.parish,
                        zip: data.zip
                    })
                } else {
                    reject(new Error('Cannot fond username!'));
                }
            }
        })
    })
}

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

exports.findIdCustomer = async(req, res) => {
    Register.findById(req.params.id)
        .exec(function(err, data) {
            if (err) {
                console.log(err)
            } else {
                res.json(data)
            }
        })
}

exports.getUser = async(req, res) => {
    const dataObj = {
        username: req.params.username.split(':')
    }
    Register.findOne({ usernameco: dataObj.username }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data == null) {
                res.json({ status: false })
            } else {
                res.json({ status: true })
            }
        }
    });
};