const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//GET all users (***admin only***)
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
    likedPets: [],
    fosterdPets: [],
    adoptedPets: [],
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//POST Login
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

//GET user by id
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { firstName, lastName, phone, email } = user;
    res.json({ firstName, lastName, phone, email });
  } catch (err) {
    res.json({ message: err });
  }
});

// router.delete("/:postId", async (req, res) => {
//     try {
//         const removedPost = await Post.remove({ _id: req.params.postId });
//         res.json(removedPost);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

//PUT update user info
router.put("/user/:id", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          email: req.body.email,
          password: hashPassword,
        },
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
