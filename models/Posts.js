const mongoose = require("mongoose");

const PostsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Posts", PostsSchema);
