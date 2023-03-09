const { User } = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        code: 409,
        message: `Email ${email} in use`,
      });
    }

    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({ name, email, password: hashPassword, avatarURL });
    res.status(201).json({
      status: "created",
      code: 201,
      data: {
        user: {
          email: `${email}`,
          subscription: "starter",
          avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
