var bp = require('body-parser');
var urlcp = bp.urlencoded({ extended: false });
const User = require('../models/user.model');
const md5 = require('md5');

module.exports.index = (req, res, next) => {
    res.render('index');
}

module.exports.registerUser = (req, res, next) => {
    let user = req.body;
    console.log(user);
    user.password = md5("EJSTODO" + user.password);

    User(user).save((err, user) => {
        if (err) {
            console.error(err);
            res.json({ status: false });
        }
        user.password = "garbage";
        res.json({ status: true, User: user });

    });
}

module.exports.loginUser = (req, res, next) => {
    let user = req.body;
    console.log(req.body);
    console.log(user.password);
    user.password = md5("EJSTODO" + req.body.password);

    User.findOne({ 'email': user.email }, (err, foundUser) => {
        if (err) {
            console.error(err);
            return res.json({ status: false, message: "DB Error" });
        }

        console.log(`User: ${foundUser}`);
        if (foundUser == null) {
            return res.json({ status: false, message: "You entered an incorrect email and pasword combination" });
        }

        if (foundUser != null || foundUser != 'undefined' || foundUser != "") {
            if (foundUser.password != user.password) {
                return res.json({ status: false, message: "You entered an incorrect email and pasword combination" });

            }
            foundUser.password = "garbage";
            return res.json({ status: true, message: 'User Found', User: foundUser });

        } else {

            return res.json({ status: false, message: "You entered an incorrect email and pasword combination" });
        }
    });
}