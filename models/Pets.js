const mongoose = require("mongoose");

const PetsSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  adoptionStatus: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  bio: {
    type: Number,
    required: true,
  },
  hypoalerganic: {
    type: Boolean,
    required: true,
  },
  dietaryRestrictions: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Pets", PetsSchema);