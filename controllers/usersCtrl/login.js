const { User } = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordCompare = bcrypt.compareSync(password, user.password);
    if (!user || !passwordCompare) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        data: {
          message: "Email or password is wrong",
        },
      });
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      status: "seccess",
      code: 200,
      data: {
        token: `${token}`,
        user: {
          email: `${email}`,
          subscription: "starter",
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
