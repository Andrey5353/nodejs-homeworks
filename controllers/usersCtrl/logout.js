const { User } = require("../../models/userModel");

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: null });
  if (!user) {
    res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Not authorized",
    });
  }
  res.status(204).json({
    status: "No Content",
    code: 204,
  });
};

module.exports = logout;
