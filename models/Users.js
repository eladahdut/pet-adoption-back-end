const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  repeatPassword: {
    type: String,
    required: true,
  },
  likedPets: [ String ],
  fosterdPets: [ String ],
  adoptedPets: [ String ],
});
module.exports = mongoose.model("Users", usersSchema);
