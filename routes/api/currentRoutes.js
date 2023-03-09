const express = require("express");
const router = express.Router();
const { auth, upload } = require("../../middlewares/index");
const { avatar, current } = require("../../controllers/index");

router.get("/current", auth, current.getCurrent);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  avatar.uploadAvatarCtrl
);

module.exports = router;
