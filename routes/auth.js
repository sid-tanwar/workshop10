const express = require("express");
const User = require("../models/User");
const router = express.Router();
const validator = require("../validator/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/createuser", async (req, res) => {

    const { error } = validator.creationValiadtion(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail) return res.status(400).send("Email already exists!");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({

        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,

    });

    try {
        const createdUser = await user.save();
        res.send(createdUser);
    }
    catch (err) {
        res.status(400).send(err);
    }

});

router.post("/loginuser", async (req, res) => {

    const { error } = validator.loginValiadtion(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send("No Account was found with this email!");

    const passValid = await bcrypt.compare(req.body.password, user.password);
    if (!passValid)
        return res.status(400).send("Password Incorrect!");

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    res.header("authtoken", token)

    res.send(`${user.name} is successfully logged in!`);
});

module.exports = router;
