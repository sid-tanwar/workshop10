const express = require("express");
const router = require("./auth");
const verify = require("./validateToken");

router.get("/", verify.verifyToken, (req, res) => {

    res.json({

        posts: {

            title: "Private Post!",
            description: "This is a private post which can only be accessed with a valid token!"
        }
    });

});

module.exports = router;