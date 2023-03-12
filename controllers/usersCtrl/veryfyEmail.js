const { User } = require("../../models/userModel");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    return res.status(404).json({
      code: 404,
      message: "User not found",
    });
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    status: "Verification success",
    code: 200,
  });
};

module.exports = verifyEmail;
