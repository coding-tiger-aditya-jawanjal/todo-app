const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    picture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pic",
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "task",
      },
    ],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("user", userSchema);
