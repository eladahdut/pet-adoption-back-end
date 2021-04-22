const express = require("express");
const router = express.Router();
const Pets = require("../models/Pets");

router.get("/", async (req, res) => {
    try {
        const posts = await Pets.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

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
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get("/:postId", async (req, res) => {
    try {
        const post = await Pets.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete("/:postId", async (req, res) => {
    try {
        const removedPost = await Pets.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

router.patch("/:postId", async (req, res) => {
    try {
        const updatedPost = await Pets.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
