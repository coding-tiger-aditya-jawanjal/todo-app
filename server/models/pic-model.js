const mongoose = require("mongoose");

const picSchema = mongoose.Schema(
  {
    pic: {
      type: Buffer,
    },
    picName: {
      type: String,
    },
    contentType: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("pic", picSchema);
