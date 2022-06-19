const express = require("express");
const router = express.Router();
const UserModel = require("./user.model");
const jwt = require("jsonwebtoken");


// google sign in
router.post("/google-signin",(req, res) => {
    const email = req.body.email

    UserModel.findOne({ email: email }).then(
        (data) => {
            // if username is present
            if (data === null) {
                const user = new UserModel({
                    username: req.body.email.split("@")[0],
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    googleId: req.body.googleId,
                    // profilePic: profile.picture,
                });
                user.save().then(() => {
                    console.log(user)
                    const token = jwt.sign({ userID: user._id }, "anysecretkey");
                res.json({ "message": "Login Success", 'token': token, status: true});

                }).catch((err) => {
                    res.json({"message":"Error occured", status:false})
                })
            }
                const token = jwt.sign({ userID: data._id }, "anysecretkey");
                res.json({ "message": "Login Success", 'token': token, status: true});
    
        }
    )

});


module.exports = router;