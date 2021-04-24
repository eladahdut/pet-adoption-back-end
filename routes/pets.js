const express = require("express");
const router = express.Router();
const Pets = require("../models/Pets");


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
router.post("/", async (req, res) => {
    const post = new Pets({
        type: req.body.type,
        name: req.body.name,
        adoptionStatus: req.body.adoptionStatus,
        picture: req.body.picture,
        height: req.body.height,
        weight: req.body.weight,
        color: req.body.color,
        bio: req.body.bio,
        hypoalerganic: req.body.hypoalerganic,
        dietaryRestrictions: req.body.dietaryRestrictions,
        breed: req.body.breed
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
router.delete("/:petId", async (req, res) => {
    try {
        const removedPet = await Pets.remove({ _id: req.params.petId });
        res.json(removedPet);
    } catch (err) {
        res.json({ message: err });
    }
});

//EDIT pet by ID ***need to check how to update more than one field***
// router.patch("/:petId", async (req, res) => {
//     try {
//         const updatedPet = await Pets.updateOne(
//             { _id: req.params.petId },
//             { $set: { title: req.body.title } }
//         );
//         res.json(updatedPet);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

module.exports = router;
