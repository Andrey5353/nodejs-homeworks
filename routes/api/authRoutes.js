const express = require("express");
const router = express.Router();
const { auth, validation } = require("../../middlewares/index");
const { users: ctrl } = require("../../controllers/index");
const {
  joiSignupSchema,
  joiLoginSchema,
} = require("../../models/userModel.js");

router.post("/signup", validation(joiSignupSchema), ctrl.signup);

router.post("/login", validation(joiLoginSchema), ctrl.login);

router.get("/logout", auth, ctrl.logout);

module.exports = router;
