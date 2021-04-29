const express = require("express");
const router = express.Router();
const Pets = require("../models/Pets");
const verifyToken = require("./verifyToken");
// const { number } = require("joi");

//GET all pets
router.get("/", async (req, res) => {
  try {
    const posts = await Pets.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// POST new pet (only admin)
router.post("/pet", async (req, res) => {
  const {
    type,
    name,
    adoptionStatus,
    picture,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietaryRestrictions,
    breed,
  } = req.body;
  const post = new Pets({
    type,
    name,
    adoptionStatus,
    picture,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietaryRestrictions,
    breed,
    likedBy: [],
    fosterdBy: [],
    adoptedBy: [],
  });
  try {
    const savedPet = await post.save();
    res.json(savedPet);
  } catch (err) {
    res.json({ message: err });
  }
});

//GET pet by ID
router.get("/:petID", async (req, res) => {
  try {
    const post = await Pets.findById(req.params.petID);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE pet by ID
router.delete("/pet/:petId/save", async (req, res) => {
  try {
    const removedPet = await Pets.remove({ _id: req.params.petId });
    res.json(removedPet);
  } catch (err) {
    res.json({ message: err });
  }
});

//EDIT pet by ID
router.patch("/pet/:petId", async (req, res) => {
  try {
    const {
      type,
      name,
      adoptionStatus,
      picture,
      height,
      weight,
      color,
      bio,
      hypoallergenic,
      dietaryRestrictions,
      breed,
    } = req.body;
    const updatedPet = await Pets.updateOne(
      { _id: req.params.petId },
      {
        $set: {
          type,
          name,
          adoptionStatus,
          picture,
          height,
          weight,
          color,
          bio,
          hypoallergenic,
          dietaryRestrictions,
          breed,
        },
      }
    );
    res.json(updatedPet);
  } catch (err) {
    res.json({ message: err });
  }
});

//GET pet by criteria
router.get("/search/:criteria", (req, res) => {
  const mySearch = req.params.criteria;
  console.log(typeof mySearch);
  Pets.find({
    $or: [
      { adoptionStatus: mySearch },
      { type: mySearch },
      { name: mySearch },
      { height: mySearch },
      { weight: mySearch },
    ],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// POST update adopt/foster pet (protected to logged in users)
router.post("/pet/:id/adopt", verifyToken, (req, res) => {
  const { userId } = req.user._id;
});

module.exports = router;
