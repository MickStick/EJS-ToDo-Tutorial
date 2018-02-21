var bp = require('body-parser');
var urlcp = bp.urlencoded({ extended: false });
const User = require('../models/user.model');

module.exports.index = (req, res, next) => {
    res.render('index');
}

module.exports.registerUser = (req, res, next) => {
    const user = req.body.user;

    User(user).save((err, user) => {
        if (err) {
            console.error(err);
            res.json({ status: false });
        }

        res.json({ status: true, User: user });

    });
}

module.exports.loginUser = (req, res, next) => {
    const user = req.body.user;

    User.findOne({ 'email': user.email }, (err, user) => {
        if (err) {
            console.error(err);
            res.json({ status: false, message: "DB Error" });
        }

        if (user != null || user != 'undefined' || user != "") {
            res.json({ status: true, message: 'User Found', User: user });
        } else {
            res.json({ status: false, message: "You entered an incorrect email and pasword combination" });
        }
    });
}