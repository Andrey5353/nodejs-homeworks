const { User } = require("../../models/userModel");
const fs = require("fs/promises");
const path = require("path");
const resizeAvatar = require("../../helpers/resizeAvatar");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const uploadAvatarCtrl = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);

    await fs.rename(tempUpload, resultUpload);
    await resizeAvatar(resultUpload);

    const avatarURL = path.join("public", "avatars", imageName);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({
      status: "avatar updated",
      code: 200,
      avatar: avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = uploadAvatarCtrl;
