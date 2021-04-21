const express = require("express");
const router = express.Router();
const Pets = require("../models/Pets");

router.get("/", async (req, res) => {
  try {
    const pets = await Pets.find();
    res.json(pets);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", (req, res) => {
  const pet = new Pets({
    type: req.body.type,
    name: req.body.name,
    adoptionStatus: req.body.adoptionStatus,
    picture: req.body.picture,
    height: req.body.height,
    weight: req.body.weight,
    color: req.body.color,
    bio: req.body.bio,
    hypoalerganic: req.body.hypoalerganic,
    breed: req.body.breed,
  });

  pet
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
