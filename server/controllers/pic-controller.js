const Pic = require("../models/pic-model");
const User = require("../models/user-model");

exports.uploadPic = async (req, res) => {
  try {
    // Adding the image in pic model/collection
    const image = new Pic({
      picName: req.file.originalname,
      contentType: req.file.mimetype,
      pic: req.file.buffer,
    });
    const uploadedImage = await image.save();

    // add the picture/pic id in user model/collection
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, // id of the logged in user
      {
        $set: { picture: uploadedImage._id },
      },
      { new: true }
    );

    // sending the response
    res.status(200).json({ msg: "image saved successfully !", updatedUser });
  } catch (error) {
    res.status(500).json({ msg: "Error in uploadPic !", err: error.message });
  }
};

exports.getPic = async (req, res) => {
  try {
    const pic = await Pic.findById(req.user.picture);

    if (!pic) {
      return res.status(400).json({ msg: "No Pic is there !" });
    }

    const url = `data:${pic.contentType};base64,${pic.pic.toString("base64")}`;

    res.status(200).json({
      msg: "Data fetched !",
      picUrl: url,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error in getPic !", err: error.message });
  }
};

exports.deletePic = async (req, res) => {
  try {
    const image = await Pic.findByIdAndDelete(req.user.picture);

    if (!image) {
      return res.status(400).json({ msg: "No such image !" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { picture: null },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({ msg: "User picture not updated !" });
    }

    res.status(200).json({ msg: "Pic Deleted !" });
  } catch (error) {
    res.status(500).json({ msg: "Error in deletePic !", err: error.message });
  }
};

exports.updatePic = async (req, res) => {
  try {
    const updatedPic = await Pic.findByIdAndUpdate(
      req.user.picture,
      {
        $set: {
          picName: req.file.originalname,
          contentType: req.file.mimetype,
          pic: req.file.buffer,
        },
      },
      { new: true }
    );

    if (!updatedPic) {
      return res.status(400).json({ msg: "No such pic !" });
    }

    res.status(200).json({ msg: "Profile Pic Updated successfully !" });
  } catch (error) {
    res.status(500).json({ msg: "Error in updatePic !", err: error.message });
  }
};
