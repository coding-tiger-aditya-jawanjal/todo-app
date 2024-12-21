const Pic = require("../models/pic-model");

exports.uploadPic = async (req, res) => {
  try {
    const image = new Pic({
      picName: req.file.originalname,
      contentType: req.file.mimetype,
      pic: req.file.buffer,
    });
    const data = await image.save();
    res.status(200).json({ msg: "image saved successfully !", data });
  } catch (error) {
    res.status(500).json({ msg: "Error in uploadPic !", err: error.message });
  }
};

exports.getPic = async (req, res) => {
  try {
    const pic = await Pic.findById("67665b4762c2b407e2e0793d");

    const url = `data:${pic.contentType};base64,${pic.pic.toString("base64")}`;

    res.status(200).json({
      msg: "Data fetched !",
      picUrl: url,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error in getPic !", err: error.message });
  }
};
