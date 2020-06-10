const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require("../models");
const Employee = db.employee;


const student = [{
        idem: 1,
        emusername: 'CPE',
        password: '12345678',
        firstName: 'Puwanat',
        lastName: 'Torcheewee'
    },
    {
        idem: 2,
        emusername: 'BOY',
        password: '11111111',
        firstName: 'Kang',
        lastName: 'Krub'
    }
];

const key = 'MY_KEY';

const compareHash = async(plainText, hashText) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hashText, (err, data) => {
            if (err) {
                //console.log(err)
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

exports.create = (status) => {
    for (let i = 0; i < student.length; i++) {
        makeHash(student[i].password)
            .then(hashText => {
                const employee = new Employee({
                    idem: student[i].idem,
                    emusername: student[i].emusername,
                    password: hashText,
                    firstName: student[i].firstName,
                    lastName: student[i].lastName
                });
                //console.log(employee);
                employee.save(employee)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return ({ status: "ready" });

};

exports.deleteAll = () => {
    Employee.deleteMany({})
        .then(data => {})
        .catch(err => {});
    return true;
};

const findEmploy = (emusername) => {
    return new Promise((resolve, reject) => {
        Employee.findOne({ emusername: emusername }, (err, data) => {
            if (err) {
                reject(new Error('Cannot find username!'));
            } else {
                if (data) {
                    resolve({ id: data._id, username: data.emusername, password: data.password })
                } else {
                    reject(new Error('Cannot fond username!'));
                }
            }
        })
    })
}

exports.findEmployee = async(req, res) => {
    const dataObj = {
            username: req.params.username.split(":"),
            password: req.params.password.split(":")
        }
        //console.log("Here " + dataObj.username + ", " + dataObj.password);
    try {
        const result = await findEmploy(dataObj.username);
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