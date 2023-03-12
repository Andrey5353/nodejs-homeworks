const { User } = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { uid } = require("uid");
const { sendEmail } = require("../../helpers/sendgridEmail");

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

    const verificationToken = uid();
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({
      name,
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "Email submission",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Submit email</a>`,
    };

    await sendEmail(mail);

    res.status(201).json({
      status: "created",
      code: 201,
      message: "Registration successful and verification email sent",
      data: {
        user: {
          email: `${email}`,
          subscription: "starter",
          avatarURL,
          verificationToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
