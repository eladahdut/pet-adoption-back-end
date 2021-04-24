const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { registerValidation, loginValidation } = require('../validation')
//GET all users.
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

//POST new user sign up.
router.post("/signup", async (req, res) => {
    //validate data before creating user
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[ 0 ].message)

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        repeatPassword: req.body.repeatPassword
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

// router.get("/:postId", async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.postId);
//         res.json(post);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

// router.delete("/:postId", async (req, res) => {
//     try {
//         const removedPost = await Post.remove({ _id: req.params.postId });
//         res.json(removedPost);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

// router.patch("/:postId", async (req, res) => {
//     try {
//         const updatedPost = await Post.updateOne(
//             { _id: req.params.postId },
//             { $set: { title: req.body.title } }
//         );
//         res.json(updatedPost);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

module.exports = router;
