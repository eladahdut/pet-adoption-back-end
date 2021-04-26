const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const hashRepeatPassword = await bcrypt.hash(req.body.repeatPassword, salt);

  //Create a new user
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    password: hashPassword,
    repeatPassword: hashRepeatPassword,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//Login
router.post("/login", async (req, res) => {
  //Validate date before user login
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Checking if the user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");
  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
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
